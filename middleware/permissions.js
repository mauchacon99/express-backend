const { Op } = require("sequelize")
const _ = require("lodash");

const utils = require("./utils");
const { permissions, modules, plan, user } = require('../models')

/**
 * Private functions
 */

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Number} roleId - id of role
 * @param {Object || Function} next - next
 */
const checkPermissions = (req, roleId, next) => {
    return new Promise((resolve, reject) => {
        permissions.findAll({
            where: { roleId },
            include: [
                {
                    model: modules,
                    as: 'module'
                }
            ]
        })
        .then(resp => {
            const route = req.baseUrl
            const method = req.method.toLowerCase()
            const authorization = _.find(resp, ({dataValues}) => {
                const a = dataValues
                return (
                    a.module.dataValues.route === route &&
                    a.methods.includes(method) &&
                    a.module.dataValues.methods.includes(method) &&
                    a.status && a.module.status
                )
            })

            if(authorization) next()
            else reject(utils.buildErrObject(401, 'UNAUTHORIZED'))
        })
        .catch(() => reject(utils.buildErrObject(401, 'UNAUTHORIZED')))
    })
}

/**
 * Check if logged in user can subscribe to the plan
 * @param {Object} req - request object
 * @param {Number} roleId - id of role
 * @param {Object || Function} next - next
 */
const checkSubscriber = (req, planId, next) => {
    return new Promise((resolve, reject) => {
        plan.findOne({ where: { id: planId } })
        .then(resp => {
            if(req.user.roleId === resp.roleId) next()
            else reject(utils.buildErrObject(401, 'UNAUTHORIZED'))
        })
        .catch((err) => {
            reject(utils.buildErrObject(401, 'UNAUTHORIZED'))
        })
    })
}

/**
 * Check if the sender or receiver has a vendor
 * @param {Object} req - request object
 * @param {Number} from - id of sender
 * @param {Number} to - id of receiver
 * @param {Object || Function} next - next
 */
const checkInvitation = (from, to, next) => {
    return new Promise((resolve, reject) => {
        user.findAll({
            where: { id: { [Op.in]: [from, to] } }
        })
            .then(resp => {

                const unauthorized = _.find(resp, ({dataValues: a}) => a.vendor !== null)

                if (unauthorized)
                    reject(utils.buildErrObject(401, 'UNAUTHORIZED'))

                else next()

            })
            .catch((err) => {
                console.log(err);

                reject(utils.buildErrObject(401, 'UNAUTHORIZED'))
            })
    })
}

/**
 * Public functions
 */

/**
 * check authorization for role
 */
exports.roleAuthorization = () => async (req, res, next) => {
    try {
        const { roleId } = req.user
        await checkPermissions(req, roleId, next)
    } catch (error) {
        utils.handleError(res, error)
    }
}

/**
 * check authorization for subscription
 */
exports.subscriberAuthorization = () => async (req, res, next) => {
    try {
        const { planId } = req.body;
        await checkSubscriber(req, planId, next)
    } catch (error) {
        utils.handleError(res, error)
    }
}

/**
 * check authorization for invitation
 */
exports.invitationAuthorization = () => async (req, res, next) => {
    try {
        const { user, body } = req;
        const { id: from } = user;
        const { to } = body;

        await checkInvitation(from, to, next)
    } catch (error) {
        utils.handleError(res, error)
    }
}
