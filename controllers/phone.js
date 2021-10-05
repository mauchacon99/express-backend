const { matchedData } = require('express-validator')
const { phone, user } = require('../models')
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
        const data = await phone.findAndCountAll({
            ...query,
            include: [
                {
                    model: user,
                    as: 'userP'
                }
            ]
        })
        res.status(200).json(db.respOptions(data, query))
    } catch (error) {
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
        const { id } = matchedData(req)
        const data = await phone.findOne({
            where:{id:id}
         })
        res.status(200).json(data)
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
        req = matchedData(req)
        res.status(200).json(await db.updateItem(req.userId, phone, req))
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
        req = matchedData(req)
        res.status(201).json(await db.createItem(req, phone))
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
        res.status(200).json(await db.deleteItem(id, phone))
    } catch (error) {
        utils.handleError(res, error)
    }
}
