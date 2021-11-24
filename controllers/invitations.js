const _ = require('lodash')
const { Op } = require("sequelize")
const { matchedData } = require('express-validator')

const { invitation, user, storage } = require('../models')
const utils = require('../middleware/utils')
const db = require('../middleware/db')
const emailer = require("../middleware/emailer");

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
        const query = await db.checkQueryInvitationExceptIfAdmin(req.query, req.user)
        const data = await invitation.findAll({
            ...query,
            include: [
                {
                    model: user,
                    as: 'userI-FROM',
                    attributes: {
                        exclude: ['password', 'verified', 'forgotPassword']
                    },
                    include: [
                        {
                            model: storage,
                            as: 'avatar'
                        }
                    ]
                },
                {
                    model: user,
                    as: 'userI-TO',
                    attributes: {
                        exclude: ['password', 'verified', 'forgotPassword']
                    },
                    include: [
                        {
                            model: storage,
                            as: 'avatar'
                        }
                    ]
                },
            ]
        })

        const _data = { from: [], to: [] }

        _.each(data, (item) => {
            _data.from.push(item.dataValues['userI-FROM'])
            _data.to.push(item.dataValues['userI-TO'])
        })

        db.saveEvent({userId: req.user.id, event: 'get_all_invitations'})
        res.status(200).json(_data)
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
        const { hash: verification } = matchedData(req)
        const userId = req.user.id
        user.findOne({
            attributes: {
                exclude: ['password', 'verification', 'verified', 'forgotPassword']
            },
            where:{ verification },
        })
            .then(async (data) => {
                if(!data) utils.handleError(res, utils.buildErrObject(404, 'NOT_FOUND'))
                else {
                    const senderData = data.dataValues
                    // Coach
                    if (req.user.roleId === 2) {
                        await db.updateItem(userId, user, { vendor: senderData.id }, {
                            userId: userId,
                            event: `update_user_${userId}`
                        })
                        await invitation.destroy({
                            where: {
                                [Op.or]: [{ from: userId }, { to: userId }]
                            }
                        })
                        db.saveEvent({userId: userId, event: `accept_invitation_${verification}`}).then()
                        res.status(200).json({ msg: 'success' })
                    }

                    // Vendor
                    else if (req.user.roleId === 3) {
                        const { dataValues } = await db.updateItem(senderData.id, user, { vendor: userId }, {
                            userId: userId,
                            event: `update_user_${senderData.id}`
                        })
                        await invitation.destroy({
                            where: {
                                [Op.or]: [{ from: senderData.id }, { to: senderData.id }]
                            }
                        })

                        db.saveEvent({userId: userId, event: `accept_invitation_${verification}`})
                        res.status(200).json({ msg: 'success' })
                    }
                    else utils.buildErrObject(401, 'UNAUTHORIZED')
                }
            })
            .catch(() => utils.handleError(res, utils.buildErrObject(404, 'NOT_FOUND')))
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
        const senderData = req.user
        const event = {
            userId: senderData.id,
            event: `new_invitation`
        }
        req = matchedData(req)
        const receiverData = await user.findByPk(req.to)

        const dataToSave = {
            from: senderData.id,
            to: receiverData.id,
        }

        if (!receiverData) utils.handleError(res,utils.buildErrObject(404, 'NOT_FOUND'))

        emailer.sendInvitationEmailMessage(locale, senderData, receiverData.dataValues).then()
        res.status(201).json(await db.createItem(dataToSave, invitation, event))
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
