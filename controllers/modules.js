const { matchedData } = require('express-validator')
const { modules } = require('../models')
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
        const event = {
            userId: req.user.id,
            event: `get_all_modules`
        }
        const query = await db.checkQueryString(req.query)
        res.status(200).json(await db.getItems(req, modules, query, event))
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
        const event = {
            userId: req.user.id,
            event: `get_module_${req.id}`
        }
        const { id } = matchedData(req)
        res.status(200).json(await db.getItem(id, modules, event))
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
        const event = {
            userId: req.user.id,
            event: `update_module_${req.id}`
        }
        req = matchedData(req)
        res.status(201).json(await db.updateItem(req.id, modules, req, event))
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
            event: `new_module`
        }
        req = matchedData(req)
        res.status(201).json(await db.createItem(req, modules, event))
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
        res.status(200).json(await db.deleteItem(id, modules, event))
    } catch (error) {
        utils.handleError(res, error)
    }
}
