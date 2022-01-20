const { matchedData } = require('express-validator')
const {Sequelize} = require("sequelize")
const { plan, program, payment } = require('../models')
const utils = require('../middleware/utils')
const db = require('../middleware/db')

/**
 * Get plan statistics function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
 exports.getPlanStatistics = async (req, res) => {
    try {
        const query = await db.checkQuery(req.query)
        const data = await plan.findAndCountAll({
            ...query,
            attributes: {
                include: [
                    
                ]
            },
            include: [
                
            ]
		})

        db.saveEvent({userId: req.user.id, event: 'get_plan_statistics'})
        res.status(200).json(db.respOptions(data, query))
    } catch (error) {
        utils.handleError(res, utils.buildErrObject(404, 'NOT_FOUND'))
    }
}


/**
 * Get payment statistics function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
 exports.getPaymentStatistics = async (req, res) => {
    try {
        const query = await db.checkQuery(req.query)
        const data = await payment.findAndCountAll({
            ...query,
            attributes: {
                include: [
                    
                ]
            },
            include: [
                
            ]
		})

        db.saveEvent({userId: req.user.id, event: 'get_payment_statistics'})
        res.status(200).json(db.respOptions(data, query))
    } catch (error) {
        utils.handleError(res, utils.buildErrObject(404, 'NOT_FOUND'))
    }
}

/**
 * Get program statistics function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
 exports.getProgramsStatistics = async (req, res) => {
    try {
        const query = await db.checkQuery(req.query)
        const data = await program.findAndCountAll({
            ...query,
            attributes: {
                include: [
                    
                ]
            },
            include: [
                
            ]
		})

        db.saveEvent({userId: req.user.id, event: 'get_program_statistics'})
        res.status(200).json(db.respOptions(data, query))
    } catch (error) {
        utils.handleError(res, utils.buildErrObject(404, 'NOT_FOUND'))
    }
}
