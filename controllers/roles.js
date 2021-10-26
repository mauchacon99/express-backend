const { matchedData } = require('express-validator')
const { roles, permissions, modules } = require('../models')
const utils = require('../middleware/utils')
const db = require('../middleware/db')

/********************
 * Public functions *
 ********************/

/**
 * Create permissions of role
 * @param {number} roleId - roleId
 */
const createPermissions = async (roleId) => {
    const itemsModules = await modules.findAll()
    const data = []
    itemsModules.map((a) => {
        data.push({
           roleId,
           moduleId: a.id,
           status: false,
           visible: false,
           methods: []
        })
    })
    await permissions.bulkCreate(data)
}

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
        const event = {
            userId: req.user.id,
            event: `get_all_roles`
        }
        const query = await db.checkQueryString(req.query)
        res.status(200).json(await db.getItems(req, roles, query, event))
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
        const event = {
            userId: req.user.id,
            event: `get_rol_${req.id}`
        }
        const { id } = matchedData(req)
        roles.findOne({
            where: { id },
            include: [
                {
                    model: permissions,
                    as: 'roleP',
                    include: [
                        {
                            model: modules,
                            as: 'module'
                        }
                    ]
                }
            ]
        })
        .then((data) => {
            if(!data) utils.handleError(res, utils.buildErrObject(404, 'NOT_FOUND'))
            else {
                db.saveEvent(event)
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
        const event = {
            userId: req.user.id,
            event: `update_rol_${req.id}`
        }
        req = matchedData(req)
        res.status(201).json(await db.updateItem(req.id, roles, req, event))
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
            event: `new_rol`
        }
        req = matchedData(req)
        db.createItem(req, roles, event)
            .then((resp) => {
                createPermissions(resp.id).then()
                res.status(201).json(resp)
            })
            .catch((error) => utils.handleError(res, error))
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
            event: `delete_rol`
        }
        const { id } = matchedData(req)
        db.deleteItem(id, roles, event).then(() => {
            permissions.destroy({ where: { roleId: id } })
                .then(() => {
                    res.status(200).json({message: 'deleted'})
                })
                .catch(() => {
                    utils.handleError(res, utils.buildErrObject(404, 'NOT_FOUND'))
                })
        })
    } catch (error) {
        utils.handleError(res, error)
    }
}
