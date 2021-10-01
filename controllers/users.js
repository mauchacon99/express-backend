const { matchedData } = require('express-validator')
const {User, Roles} = require('../models')
const utils = require('../middleware/utils')
const db = require('../middleware/db')
const auth = require("../middleware/auth");

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
        const data = await User.findAll({
            attributes: ['name', 'lastname', 'email', 'createdAt'],
            include: [
                {
                    model: Roles,
                    as: 'roleU'
                }
            ]
        })
        res.status(200).json(data)
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
        const data = await User.findOne({
            attributes: ['name', 'email', 'createdAt'],
            where: { id },
            include: [
                {
                    model: Roles,
                    as: 'roleU'
                }
            ]
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
        const { dataValues } = await db.updateItem(req.id, User, req)
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
        const { dataValues } = await db.createItem(req, User)
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
        res.status(200).json(await db.deleteItem(id, User))
    } catch (error) {
        utils.handleError(res, error)
    }
}
