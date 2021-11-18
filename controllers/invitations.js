const { matchedData } = require('express-validator')
const { invitation } = require('../models')
const utils = require('../middleware/utils')
const db = require('../middleware/db')

/********************
 * Public functions *
 ********************/

/**
 * Get items of logged in user, function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.getItems = async (req, res) => {
    try {
        const query = await db.checkQuery(req.query)
        const data = await invitation.findAndCountAll({
            ...query,
		})

        db.saveEvent({userId: req.user.id, event: 'get_all_invitations'})
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
        const { id } = matchedData(req)

        invitation.findOne({
            where:{id},
        })
            .then((data) => {
                if(!data) utils.handleError(res, utils.buildErrObject(404, 'NOT_FOUND'))
                else {
                    db.saveEvent({userId: req.user.id, event: `get_invitation_${id}`})
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
            event: `update_invitation_${id}`
        }
        req = matchedData(req)
        res.status(201).json(await db.updateItem(req.id, invitation, req, event))
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
            event: `new_invitation`
        }
        const from = req.user.id;
        
        req = matchedData(req)

        res.status(201).json(await db.createItem({ ...req, from }, invitation, event))
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
            event: `delete_invitation`
        }
        const { id } = matchedData(req)
        res.status(200).json(await db.deleteItem(id, invitation, event))
    } catch (error) {
        utils.handleError(res, error)
    }
}
