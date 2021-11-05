const db = require('../middleware/db')
const { userevents, user } = require('../models')
const { matchedData } = require('express-validator')
const utils = require('../middleware/utils')
const {Op, Sequelize} = require("sequelize");
const _ = require("lodash");

/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.getItem = async (req, res) => {
    try {
        const queryParams = req.query
        const { id } = matchedData(req)
        const query = await db.checkQueryUserEvent(queryParams, id)
        const data = await userevents.findAndCountAll({
            ...query
        })
        res.status(200).json(db.respOptions(data, query))
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
        const data = await userevents.findAndCountAll({
            ...query,
            include: [
                {
                    model: user,
                    as: 'userE',
                    attributes: {
                        exclude: ['password', 'verification', 'verified', 'forgotPassword']
                    }
                }
            ]
        })
        res.status(200).json(db.respOptions(data, query))
    } catch (error) {
        utils.handleError(res, error)
    }
}
