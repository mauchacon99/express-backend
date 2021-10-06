const { matchedData } = require('express-validator')
const { permissions, modules, roles } = require('../models')
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
        const data = await permissions.findAndCountAll({
            ...query,
            include: [
                {
                    model: roles,
                    as: 'roleP'
                },
                {
                    model: modules,
                    as: 'module'
                }
            ]
        })
        db.saveEvent({userId: req.user.id, event: 'get_all_permissions'})
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
        permissions.findOne({
            where: { id },
            include: [
                {
                    model: roles,
                    as: 'roleP'
                },
                {
                    model: modules,
                    as: 'module'
                }
            ]
        })
            .then((data) => {
                if(!data) utils.handleError(res, utils.buildErrObject(404, 'NOT_FOUND'))
                else {
                    db.saveEvent({userId: user.id, event: `get_permission_${id}`})
                    res.status(200).json(data)
                }
            })
            .catch(() => utils.handleError(res, utils.buildErrObject(404, 'NOT_FOUND')))
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
        const event = {
            userId: req.user.id,
            event: `update_permission_${req.id}`
        }
        req = matchedData(req)
        res.status(201).json(await db.updateItem(req.id, permissions, req, event))
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
            event: `new_permission`
        }
        req = matchedData(req)
        res.status(201).json(await db.createItem(req, permissions, event))
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
            event: `delete_module`
        }
        const { id } = matchedData(req)
        res.status(200).json(await db.deleteItem(id, permissions, event))
    } catch (error) {
        utils.handleError(res, error)
    }
}
