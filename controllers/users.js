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
            attributes: { exclude: ['password'] },
            include: [
                {
                    model: roles,
                    as: 'roleU'
                }
            ]
        })
        db.saveEvent({userId: req.user.id, event: 'get_all_users'})
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
exports.getItem = (req, res) => {
    try {
        const users = req.user
        const { id } = matchedData(req)
        user.findOne({
            attributes: { exclude: ['password'] },
            where: { id },
            include: [
                {
                    model: roles,
                    as: 'roleU'
                }
            ]
        })
            .then((data) => {
                if(!data) utils.handleError(res, utils.buildErrObject(404, 'NOT_FOUND'))
                else {
                    db.saveEvent({userId: users.id, event: `get_user_${id}`})
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
            event: `update_user_${req.id}`
        }
        req = matchedData(req)
        const { dataValues } = await db.updateItem(req.id, user, req, event)
        const { password, ...data} = dataValues
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
        const event = {
            userId: req.user.id,
            event: `new_user`
        }
        req = matchedData(req)
        req.verification = req.password + req.email
        const { dataValues } = await db.createItem(req, user, event)
        const { password, ...data} = dataValues
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
        const event = {
            userId: req.user.id,
            event: `delete_user`
        }
        const { id } = matchedData(req)
        res.status(200).json(await db.deleteItem(id, user, event))
    } catch (error) {
        utils.handleError(res, error)
    }
}
