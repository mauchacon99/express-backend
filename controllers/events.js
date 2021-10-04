const db = require('../middleware/db')
const { UserEvent, User } = require('../models')
const { matchedData } = require('express-validator')
const utils = require('../middleware/utils')


/**
 * Get item function called by route
 * @param {Object} req - request object
 */

exports.createItem = async (req) => {
    try {
        await db.createItem(req, UserEvent)
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
        const data = await UserEvent.findAll({
           where:{ id: id }
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
        const data = await User.findAll({
            ...query,
            attributes: ['name', 'lastname', 'email', 'createdAt'],
            include: [
                {
                    model: User,
                    as: 'userE'
                }
            ]
        })
        res.status(200).json(data)
    } catch (error) {
        utils.handleError(res, error)
    }
}
