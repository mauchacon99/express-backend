const crypto = require("crypto");
const { matchedData } = require('express-validator')
const { user, roles, storage, phone, location, experience } = require('../models')
const utils = require('../middleware/utils')
const db = require('../middleware/db')
const {Sequelize} = require("sequelize")
const auth = require("../middleware/auth");

/********************
 * Private functions *
 ********************/



/********************
 * Public functions *
 ********************/

/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.getItem = (req, res) => {
    try {
        const { id } = req.user
        user.findByPk(id, {
            attributes: { exclude: ['password'] },
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
                {
                    model: experience,
                    as: 'userEX'
                },
            ]
        })
            .then(async (data) => {
                if(!data) utils.handleError(res, utils.buildErrObject(404, 'NOT_FOUND'))
                else {
                    if (data.vendor) {
                        data.vendor = await user.findOne({
                            attributes: {
                                exclude: ['password', 'verification', 'verified', 'forgotPassword']
                            },
                            where: {id: data.vendor},
                            include: [
                                {
                                    model: storage,
                                    as: 'avatar'
                                }
                            ]
                        })
                    }

                    db.saveEvent({userId: id, event: `get_profile`}).then()
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
        const { id } = req.user
        const event = {
            userId: id,
            event: `update_profile`
        }
        req = matchedData(req)
        const { dataValues } = await db.updateItem(id, user, req, event)
        const { password, ...data} = dataValues
        res.status(201).json(data)
    } catch (error) {
        utils.handleError(res, error)
    }
}

/**
 * Change password item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.changePassword = async (req, res) => {
    try {
        const { id } = req.user
        const event = {
            userId: id,
            event: `change_password_profile`
        }
        const { oldPassword, newPassword } = matchedData(req)
        const item = await user.findByPk(id)
        const isPasswordMatch = await auth.checkPassword(oldPassword, item.password)
        if (!isPasswordMatch) {
            utils.handleError(res, utils.buildErrObject(403, 'WRONG_PASSWORD'))
        } else {
            await db.updateItem(id, user, { password: newPassword }, event)
            res.status(201).json({msg: 'success'})
        }
    } catch (error) {
        utils.handleError(res, error)
    }
}
