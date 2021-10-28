const { matchedData } = require('express-validator')
const { program, user, storage } = require('../models')
const utils = require('../middleware/utils')
const db = require('../middleware/db')

/********************
 * Public functions *
 ********************/

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.getItems = async (req, res) => {
    try {
        const query = await db.checkQuery(req.query)
        const data = await program.findAndCountAll({
            ...query,
            include: [
                {
                    model: user,
                    as: 'userPR'
				},
				{
                    model: storage,
                    as: 'storagePR'
                },
            ]
		})

        db.saveEvent({userId: req.user.id, event: 'get_all_programs'})
        res.status(200).json(db.respOptions(data, query))
    } catch (error) {
        utils.handleError(res, utils.buildErrObject(404, 'NOT_FOUND'))
    }
}

/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.getItem = async (req, res) => {
    try {
        const { user } = req
        const { id } = matchedData(req)

        program.findOne({
            where:{id:id}
        })
            .then((data) => {
                if(!data) utils.handleError(res, utils.buildErrObject(404, 'NOT_FOUND'))
                else {
                    db.saveEvent({userId: user.id, event: `get_program_${id}`})
                    res.status(200).json(data)
                }
            })
            .catch(() => utils.handleError(res, utils.buildErrObject(404, 'NOT_FOUND')))
    } catch (error) {
        utils.handleError(res, error)
    }
}

/**
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.updateItem = async (req, res) => {
    try {
        const { id } = req
        const event = {
            userId: req.user.id,
            event: `update_program_${id}`
        }
        req = matchedData(req)
        res.status(201).json(await db.updateItem(req.id, program, req, event))
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
            userId: req.user.id,
            event: `new_program`
        }
        req = matchedData(req)
        res.status(201).json(await db.createItem(req, program, event))
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
        const event = {
            userId: req.user.id,
            event: `delete_program`
        }
        const { id } = matchedData(req)
        res.status(200).json(await db.deleteItem(id, program, event))
    } catch (error) {
        utils.handleError(res, error)
    }
}
