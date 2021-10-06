const db = require('../middleware/db')
const { userevents, user } = require('../models')
const { matchedData } = require('express-validator')
const utils = require('../middleware/utils')

/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.getItem = async (req, res) => {
    try {
        const { id } = matchedData(req)
        const data = await userevents.findAll({
            where:{ userId: id },
            include: [
                {
                    model: user,
                    as: 'userE'
                }
            ]
        })
            .then((data) => {
                if(!data) utils.handleError(res, utils.buildErrObject(404, 'NOT_FOUND'))
                else res.status(200).json(data)
            })
            .catch(() => utils.handleError(res, utils.buildErrObject(404, 'NOT_FOUND')))
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
                    as: 'userE'
                }
            ]
        })
        res.status(200).json(db.respOptions(data, query))
    } catch (error) {
        utils.handleError(res, error)
    }
}
