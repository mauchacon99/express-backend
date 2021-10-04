const { matchedData } = require('express-validator')
const { Permissions, Modules, Roles} = require('../models')
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
        const data = await Permissions.findAll({
            ...query,
            include: [
                {
                    model: Roles,
                    as: 'roleP'
                },
                {
                    model: Modules,
                    as: 'module'
                }
            ]
        })
        res.status(200).json(data)
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
        const { id } = matchedData(req)
        const data = await Permissions.findOne({
            where: { id },
            include: [
                {
                    model: Roles,
                    as: 'roleP'
                },
                {
                    model: Modules,
                    as: 'module'
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
        res.status(201).json(await db.updateItem(req.id, Permissions, req))
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
        res.status(201).json(await db.createItem(req, Permissions))
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
        res.status(200).json(await db.deleteItem(id, Permissions))
    } catch (error) {
        utils.handleError(res, error)
    }
}
