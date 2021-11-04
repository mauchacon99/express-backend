const { matchedData } = require('express-validator')
const { subscriber, user, plan } = require('../models')
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
        const query = await db.checkQueryWhereUserIdExceptIfAdmin(req.query, req.user)
        const data = await subscriber.findAndCountAll({
            ...query,
            include: [
                {
                    model: user,
                    as: 'userS'
				},
				{
                    model: plan,
                    as: 'planS'
                },
            ]
		})

        db.saveEvent({userId: req.user.id, event: 'get_all_subscribers'})
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

        subscriber.findOne({
            where:{id}
        })
            .then((data) => {
                if(!data) utils.handleError(res, utils.buildErrObject(404, 'NOT_FOUND'))
                else {
                    db.saveEvent({userId: user.id, event: `get_subscriber_${id}`})
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
            event: `update_subscriber_${id}`
        }
        req = matchedData(req)
        res.status(201).json(await db.updateItem(req.id, subscriber, req, event))
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
            event: `new_subscriber`
        }
        req = matchedData(req)
        res.status(201).json(await db.createItem(req, subscriber, event))
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
            event: `delete_subscriber`
        }
        const { id } = matchedData(req)
        res.status(200).json(await db.deleteItem(id, subscriber, event))
    } catch (error) {
        utils.handleError(res, error)
    }
}
