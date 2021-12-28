const { matchedData } = require('express-validator')
const { payment, user, plan } = require('../models')
const utils = require('../middleware/utils')
const db = require('../middleware/db')
const stripe = require('../services/stripe')

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
        const data = await payment.findAndCountAll({
            ...query,
            include: [
                {
                    model: user,
                    as: 'userPA',
                    attributes: {
                        exclude: ['password', 'verification', 'verified', 'forgotPassword']
                    }
                },
            ]
		})

        db.saveEvent({userId: req.user.id, event: 'get_all_payments'})
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

        payment.findOne({
            where:{id},
            include: [
                {
                    model: user,
                    as: 'userPA',
                    attributes: {
                        exclude: ['password', 'verification', 'verified', 'forgotPassword']
                    }
                },
            ]
        })
            .then((data) => {
                if(!data) utils.handleError(res, utils.buildErrObject(404, 'NOT_FOUND'))
                else {
                    db.saveEvent({userId: req.user.id, event: `get_payment_${id}`})
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
        const user = req.user
        const { id } = matchedData(req)
        const event = {
            userId: user.id,
            event: `update_payment`
        }

        const detail = await db.getItem(id, payment, event)
        const checkPayment = stripe.checkPayment(detail.transactionId)

        // if(detail.type === 'plan' && checkPayment.status === 'success') // Subscribir el usuario al plan

        const body = {
            status: checkPayment.status,
            transaction: checkpayment.detailPayment
        }

        await db.updateItem(id, payment, body, event)
        res.status(201).json()
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
        const user = req.user
        req = matchedData(req)
        const event = {
            userId: user.id,
            event: `new_payment`
        }
        let dataPayment = {}
        if (req.type === 'plan')
            dataPayment = await db.getItem(req.id, plan, {userId: user.id, event: 'get_plan'})
        const description = `${req.type}: ${dataPayment.name} - ${user.email}`
        const resPaymentIntent = await stripe.paymentIntent(req.token, dataPayment.price, description)

        const body = {
            userId: user.id,
            description: req.description || '',
            transactionId: resPaymentIntent.id,
            transaction: resPaymentIntent,
            amount: dataPayment.price,
            type: req.type,
            status: 'wait',
        }
        await db.createItem(body, payment, event)
        res.status(201).json(resPaymentIntent)
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
            event: `delete_payment`
        }
        const { id } = matchedData(req)
        res.status(200).json(await db.deleteItem(id, payment, event))
    } catch (error) {
        utils.handleError(res, error)
    }
}
