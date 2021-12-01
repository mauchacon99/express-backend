const { matchedData } = require('express-validator')
const {Sequelize} = require("sequelize")
const {
    plan,
    program,
    user,
    storage,
    subscriber,
    roles,
    document,
} = require('../models')
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
        const query = await db.checkQueryWhereUserIdExceptIfAdmin(req.query, req.user)
        const data = await plan.findAndCountAll({
            ...query,
            attributes:  {
                include: [
                    [Sequelize.literal("(SELECT COUNT(subscribers.id) FROM subscribers WHERE (subscribers.planId = `plan`.`id`))"), "subscribers"],
                ]
            },
            include: [
                {
                    model: user,
                    as: 'userPL',
                    attributes: {
                        exclude: ['password', 'verification', 'verified', 'forgotPassword']
                    },
                    include: [
                        {
                            model: storage,
                            as: 'avatar'
                        }
                    ]
                },
                {
                    model: program,
                    as: 'programPL',
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
		})

        db.saveEvent({userId: req.user.id, event: 'get_all_plans'})
        res.status(200).json(db.respOptions(data, query))
    } catch (error) {
        utils.handleError(res, utils.buildErrObject(404, 'NOT_FOUND'))
    }
}

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.getAllItems = async (req, res) => {
    try {
        const query = await db.checkQuery(req.query)
        const data = await plan.findAndCountAll({
            ...query,
            attributes:  {
                include: [
                    [Sequelize.literal("(SELECT COUNT(subscribers.id) FROM subscribers WHERE (subscribers.planId = `plan`.`id`))"), "subscribers"],
                ]
            },
            include: [
                {
                    model: user,
                    as: 'userPL',
                    attributes: {
                        exclude: ['password', 'verification', 'verified', 'forgotPassword']
                    },
                    include: [
                        {
                            model: storage,
                            as: 'avatar'
                        }
                    ]
                },
                {
                    model: program,
                    as: 'programPL',
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
		})

        db.saveEvent({userId: req.user.id, event: 'get_all_plans'})
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

        plan.findOne({
            where:{id},
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
                    as: 'programPL'
				},
                {
                    model: roles,
                    as: 'rolePL',
                },
				{
                    model: storage,
                    as: 'storagePL'
                },
                {
                    model: document,
                    as: 'planD'
                },
                {
                    model: subscriber,
                    as: 'planS',
                    include: [
                        {
                            model: user,
                            as: 'userS',
                            attributes: {
                                exclude: ['password', 'verification', 'verified', 'forgotPassword']
                            },
                            include: [
                                {
                                    model: storage,
                                    as: 'avatar'
                                }
                            ]
                        },
                    ]
                },
            ]
        })
            .then((data) => {
                if(!data) utils.handleError(res, utils.buildErrObject(404, 'NOT_FOUND'))
                else {
                    db.saveEvent({userId: req.user.id, event: `get_plan_${id}`})
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
            event: `update_plan_${id}`
        }
        req = matchedData(req)
        res.status(201).json(await db.updateItem(req.id, plan, req, event))
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
            event: `new_plan`
        }
        if(req.user.vendor) utils.handleError(res, utils.buildErrObject(401, 'UNAUTHORIZED'))
        req = matchedData(req)
        res.status(201).json(await db.createItem(req, plan, event))
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
            event: `delete_plan`
        }
        const { id } = matchedData(req)
        res.status(200).json(await db.deleteItem(id, plan, event))
    } catch (error) {
        utils.handleError(res, error)
    }
}
