const db = require('../middleware/db')
const { user_events, user } = require('../models')
const { matchedData } = require('express-validator')
const utils = require('../middleware/utils')


/**
 * Get item function called by route
 * @param {Object} req - request object
 */

exports.createItem = async (req) => {
    try {
        await db.createItem(req, user_events)
    } catch (error) {
        console.log(error)
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
        const data = await user_events.findAll({
           where:{ userId: id }
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
exports.getItems = async (req, res) => {
    try {
        const query = await db.checkQuery(req.query)
        const data = await user_events.findAndCountAll({
            ...query,
            attributes: ['userId', 'event', 'createdAt'],
            include: [
                {
                    model: user,
                    as: 'userE'
                }
            ]
        })
        res.status(200).json(db.respOptions(data, query))
    } catch (error) {
        utils.handleError(res, error)
    }
}
