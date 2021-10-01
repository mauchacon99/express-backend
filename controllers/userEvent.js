const db = require('../middleware/db')
const { UserEvent } = require('../models')
const { matchedData } = require('express-validator')
const utils = require('../middleware/utils')
const { id } = require('date-fns/locale')


/**
 * Create new event in table userEvent
 * @param {int} userId - Id from models User
 * @param {string} event - type event
 */

exports.CreateUserEvent = async (userId, event) => {
    try {
        req = {
            userId,
            event,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        const { dataValues } = await db.createItem(req, UserEvent)
        return dataValues
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
        const data = await UserEvent.findAll({
           where:{userId:id}
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
        res.status(200).json(await db.getItems(req.query,UserEvent))
    } catch (error) {
        utils.handleError(res, error)
    }
}