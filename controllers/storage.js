const fs = require('fs')
const { matchedData } = require('express-validator')
const sharp = require('sharp')
const { v4: uuidv4 } = require('uuid')
const path = require('path')
const slugify = require('slugify')
const cryptoRandomString = require('crypto-random-string')
const multer = require('multer')
const db = require('../middleware/db')
const { storage, document } = require('../models')
const utils = require('../middleware/utils')

const router = 'public/media/'

/*********************
 * Private functions *
 *********************/

const compressImage = (pathInPut, name = '', size = null) => new Promise((resolve, reject) => {
    try {
        const relativePath = `${name}`
        const pathOutPut = `${router}${relativePath}`

        sharp(pathInPut)
            .webp({quality: 85})
            .resize(size, size)
            .toFile(pathOutPut, (err) => {
                if (!err) {
                    resolve(relativePath)
                } else {
                    reject(err)
                }
            })
     } catch (e) {
        reject(e)
    }
})

const saveImage = (file) => new Promise(async (resolve) => {
    const filesWebp = {}
    filesWebp.fileName = file.filename
    filesWebp.fileType = '.png'
    const pathOriginal = `${router}${filesWebp.fileName}`
    filesWebp.origin = await compressImage(pathOriginal, `origin_${filesWebp.fileName}`)
    filesWebp.small = await compressImage(pathOriginal, `small_${filesWebp.fileName}`, 200)
    filesWebp.medium = await compressImage(pathOriginal, `medium_${filesWebp.fileName}`, 600)
    filesWebp.large = await compressImage(pathOriginal, `large_${filesWebp.fileName}`, 1000)

    resolve(filesWebp)
})

const storageUploadMedia = (name) => new Promise(async (resolve) => {
    const fileUrl = `${process.env.API_URL}/media/${name}`
    resolve(fileUrl)
})

const loadInS3Images = (file) => new Promise(async (resolve) => {
    file.origin = await storageUploadMedia(file.origin)
    file.small = await storageUploadMedia(file.small)
    file.medium = await storageUploadMedia(file.medium)
    file.large = await storageUploadMedia(file.large)
    resolve(file)
})

const removeExtFromFileName = (fileName) => fileName.substr(0, fileName.lastIndexOf('.')) || fileName;

const otherType = (file = {}) => new Promise(async (resolve) => {
    const ext = path.extname(file.filename)
    // const fileName = `${cryptoRandomString({ length: 3 })}-${slugify(file.filename)}`
    resolve({
        fileName: removeExtFromFileName(file.originalname),
        fileType: ext,
        origin: await storageUploadMedia(file.filename)
    })
})

const storages = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, `${router}`)
    },
    filename(req, file, cb) {
        if (file.mimetype.includes('image')) {
            cb(null, `${uuidv4()}.png`)
        } else {
            cb(null, `${uuidv4()}${path.extname(file.originalname)}`)
        }
    }
})

/*********************
 * Public functions *
 *********************/

exports.upload = multer({ storage: storages })

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.getItems = async (req, res) => {
    try {
        const event = {
            userId: req.user.id,
            event: `get_all_files`
        }
        const query = await db.checkQueryString(req.query)
        res.status(200).json(await db.getItems(req, storage, query, event))
    } catch (error) {
        utils.handleError(res, error)
    }
}

/**
 * Get doc items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.getDocItems = async (req, res) => {
    try {
        const event = {
            userId: req.user.id,
            event: `get_all_document_files`
        }
        const query = await db.checkDocItems(req.query, req.user)
        res.status(200).json(await db.getItems(req, storage, query, event))
    } catch (error) {

        console.log(error);

        utils.handleError(res, error)
    }
}

/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.getItem = async (req, res) => {
    try {
        const event = {
            userId: req.user.id,
            event: `get_file_${req.id}`
        }
        const { id } = matchedData(req)
        res.status(200).json(await db.getItem(id, storage, event))
    } catch (error) {
        utils.handleError(res, error)
    }
}

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.createItem = async (req, res) => {
    try {
        const event = {
            userId: 1,
            event: `new_file`
        }
        const { files } = req

        if (!files.length) { // if files is empty
            return utils.handleError(res, { code: 400, message: 'No files were uploaded.' })
        }
        const listFiles = Array.isArray(files) ? files : [files]
        if (!listFiles.length) {
            utils.handleError(res, { code: 400, message: 'No files were uploaded.' })
        }

        const data = await Promise.all(
            listFiles.map(async (file) => {
                let objectFile
                if (file.mimetype.includes('image')) { // Check is image
                    objectFile = await saveImage(file)
                    objectFile = await loadInS3Images(objectFile)
                } else {
                    objectFile = await otherType(file)
                }

                const payload = {
                    userId: req.user.id,
                    ...objectFile,
                }

                return await db.createItem(payload, storage, event)
            })
        )
        res.status(201).json(data)
    } catch (error) {
        utils.handleError(res, error)
    }
}

/**
 * Delete item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.deleteItem = async (req, res) => {
    try {
        const { id } = matchedData(req)
        const events = { userId: req.user.id }
        events.event = 'get_file'
        const file = await db.getItem(id, storage, events)
        const { dataValues: data } = file
        const mediaDirname = 'public/media'
        let files
        if (utils.isImage(data.fileType)) {
            files = [
                data.fileName,
                `origin_${data.fileName}`,
                `small_${data.fileName}`,
                `medium_${data.fileName}`,
                `large_${data.fileName}`,
            ];
        } else {
            const fileKey = data.origin.match(/[\w-]+?(?=\.)/g)[0]
            const docUri = `${fileKey}${data.fileType}`
            files = [ docUri ]
        }
        files.map(uri => {
            fs.unlink(path.join(mediaDirname, uri), (err) => {
                if (err) console.log(err)
            })
        })

        events.event = 'delete_documents'
        db.deleteItem(null, document, events, { storageId: id }).then()
        events.event = 'delete_file'
        res.status(200).json(await db.deleteItem(id, storage, events))
    } catch (error) {
        utils.handleError(res, error)
    }
}
