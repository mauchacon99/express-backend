const crypto = require("crypto");
const { matchedData } = require('express-validator')
const { user, roles, storage, phone, location } = require('../models')
const utils = require('../middleware/utils')
const db = require('../middleware/db')
const emailer = require("../middleware/emailer");
const {Sequelize} = require("sequelize");

/********************
 * Private functions *
 ********************/

/**
 * check if role is vendor
 * @param {Object} item - response object
 */
const checkRoleVendor = async (item) => {
    const data = await roles.findByPk(item.roleId)
    return ( data.name === 'vendor' )
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
        const query = await db.checkQueryUser(req.query, req.user)
        const data = await user.findAndCountAll({
            ...query,
            attributes:  {
                exclude: ['password'],
                include: [
                    [Sequelize.literal("(SELECT phones.internationalNumber FROM phones WHERE (phones.userId = user.id) LIMIT 1 )"), "phone"],
                    [Sequelize.literal("(SELECT locations.address FROM locations WHERE (locations.userId = user.id) LIMIT 1 )"), "address"]
                ]
            },
            include: [
                {
                    model: roles,
                    as: 'roleU'
                },
                {
                    model: storage,
                    as: 'avatar'
                }
            ]
        })
        db.saveEvent({userId: req.user.id, event: 'get_all_users'}).then()
        res.status(200).json(db.respOptions(data, query))
    } catch (error) {
        console.log(error)
        utils.handleError(res, utils.buildErrObject(404, 'NOT_FOUND'))
    }
}

/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.getItem = (req, res) => {
    try {
        const users = req.user
        const { id } = matchedData(req)
        user.findOne({
            attributes: { exclude: ['password'] },
            where: { id },
            include: [
                {
                    model: roles,
                    as: 'roleU'
                },
                {
                    model: storage,
                    as: 'avatar'
                },
                {
                    model: phone,
                    as: 'userP'
                },
                {
                    model: location,
                    as: 'userL'
                },
            ]
        })
            .then((data) => {
                if(!data) utils.handleError(res, utils.buildErrObject(404, 'NOT_FOUND'))
                else {
                    db.saveEvent({userId: users.id, event: `get_user_${id}`})
                    res.status(200).json(data)
                }
            })
            .catch(() => utils.handleError(res, utils.buildErrObject(404, 'NOT_FOUND')))
    } catch (error) {
        utils.handleError(res, utils.buildErrObject(404, 'NOT_FOUND'))
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
            event: `update_user_${req.id}`
        }
        req = matchedData(req)
        const { dataValues } = await db.updateItem(req.id, user, req, event)
        const { password, ...data} = dataValues
        res.status(201).json(data)
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
        const locale = req.getLocale()
        const userReq = req.user
        const event = {
            userId: userReq.id,
            event: `new_user`
        }
        req = matchedData(req)
        if (await checkRoleVendor(userReq)) req.vendor = userReq.id
        const password = crypto.randomBytes(4).toString('hex')
        req.verification = password + req.email
        const { dataValues } = await db.createItem({ ...req, password }, user, event)
        const { ...data } = dataValues
        emailer.sendRegistrationEmailMessage(locale, dataValues)
        emailer.sendPasswordEmailMessage(locale, { ...dataValues, password })
        res.status(201).json(data)
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
            event: `delete_user`
        }
        const { id } = matchedData(req)
        res.status(200).json(await db.deleteItem(id, user, event))
    } catch (error) {
        utils.handleError(res, error)
    }
}
