const utils = require("./utils");
const { Permissions, Modules } = require('../models')
const _ = require("lodash");

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
        Permissions.findAll({
            where: { roleId },
            include: [
                {
                    model: Modules,
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
                    a.module.dataValues.methods.includes(method)
                )
            })
            if(authorization) next()
            else reject(utils.buildErrObject(401, 'UNAUTHORIZED'))
        })
        .catch(() => reject(utils.buildErrObject(401, 'UNAUTHORIZED')))
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
