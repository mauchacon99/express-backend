const { matchedData } = require('express-validator')
const { subscriber, user, plan, storage, program, roles} = require('../models')
const utils = require('../middleware/utils')
const db = require('../middleware/db')
const {Sequelize} = require("sequelize");

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
                    as: 'userS',
                    attributes: {
                        exclude: ['password', 'verification', 'verified', 'forgotPassword']
                    }
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
        const userE = req.user
        const { id } = matchedData(req)

        const data = await subscriber.findAndCountAll({
            where: {userId: id},
            include: [
                {
                    model: plan,
                    as: 'planS',
                    attributes:  {
                        include: [
                            [Sequelize.literal("(SELECT COUNT(subscribers.id) FROM subscribers WHERE (subscribers.planId = `subscriber`.`planId`))"), "subscribers"],
                        ]
                    },
                    include: [
                        {
                            model: user,
                            as: 'userPL',
                            attributes: {
                                exclude: ['password', 'verification', 'verified', 'forgotPassword']
                            }
                        },
                        {
                            model: program,
                            as: 'programPL',
                            include: [
                                {
                                    model: user,
                                    as: 'userPR',
                                    attributes: {
                                        exclude: ['password', 'verification', 'verified', 'forgotPassword']
                                    }
                                },
                                {
                                    model: storage,
                                    as: 'storagePR'
                                },
                            ]
                        },
                        {
                            model: roles,
                            as: 'rolePL',
                        },
                        {
                            model: storage,
                            as: 'storagePL'
                        },
                    ]
                },
            ]
        })
        db.saveEvent({userId: userE.id, event: `get_subscriber_${id}`}).then()
        res.status(200).json(data.rows)
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
            event: `update_subscriber`
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
