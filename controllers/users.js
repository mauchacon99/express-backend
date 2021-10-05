const { matchedData } = require('express-validator')
const {user, roles} = require('../models')
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
        const data = await user.findAndCountAll({
            ...query,
            attributes: ['name', 'lastname', 'email', 'createdAt'],
            include: [
                {
                    model: roles,
                    as: 'roleU'
                }
            ]
        })
        res.status(200).json(db.respOptions(data, query))
    } catch (error) {
        console.log(error)
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
        const { id } = matchedData(req)
        const data = await user.findOne({
            attributes: ['name', 'email', 'createdAt'],
            where: { id },
            include: [
                {
                    model: roles,
                    as: 'roleU'
                }
            ]
        })
        res.status(200).json(data)
    } catch (error) {
        utils.handleError(res, utils.buildErrObject(404, 'NOT_FOUND'))
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
        const { dataValues } = await db.updateItem(req.id, user, req)
        const { password, ...data } = dataValues
        res.status(201).json(data)
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
        const { dataValues } = await db.createItem(req, user)
        const { password, ...data } = dataValues
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
        res.status(200).json(await db.deleteItem(id, user))
    } catch (error) {
        utils.handleError(res, error)
    }
}
