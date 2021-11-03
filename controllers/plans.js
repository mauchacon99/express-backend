const { matchedData } = require('express-validator')
const { plan, program, user, storage, subprogram, subscriber } = require('../models')
const utils = require('../middleware/utils')
const db = require('../middleware/db')
const { subscribe } = require('../server')

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
        const query = await db.checkQueryByVendorOrCoach(req.query, req.user)
        const data = await plan.findAndCountAll({
            ...query,
            include: [
                {
                    model: user,
                    as: 'userPL'
                },
                {
                    model: program,
                    as: 'programPL',
                    include: [
                        {
                            model: subprogram,
                            as: 'programSP'
                        },
                    ]
				},
				{
                    model: storage,
                    as: 'storagePL'
                },
                {
                    model: subscriber,
                    as: 'planS'
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
        const { user } = req
        const { id } = matchedData(req)

        plan.findOne({
            where:{id}
        })
            .then((data) => {
                if(!data) utils.handleError(res, utils.buildErrObject(404, 'NOT_FOUND'))
                else {
                    db.saveEvent({userId: user.id, event: `get_plan_${id}`})
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
