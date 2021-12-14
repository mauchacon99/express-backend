const {matchedData} = require("express-validator");
const { user } = require("../models");
const utils = require("../middleware/utils");
const emailer = require("../middleware/emailer")
const auth = require('../middleware/auth')
const db = require("../middleware/db");

/*
*  Private functions
*/

/**
 * Updates a user password in database
 * @param {string} password - new password
 * @param {number} id - id of user object
 */
const updatePassword = async (password, id) => {
    return new Promise((resolve, reject) => {
        db.updateItem(id, user, {
            password,
            forgotPassword: false,
        }, {
            userId: id,
            event: 'change_password'
        })
            .then(item => {
                if(!item) reject(utils.buildErrObject(404, 'NOT_UPDATED_PASSWORD'))
                else {
                    resolve(item)
                }
            })
            .catch(() => reject(utils.buildErrObject(404, 'NOT_UPDATED_PASSWORD')))
    })
}

/**
 * Checks if a forgot password verification exists
 * @param {number} id - verification id
 */
const findForgotPassword = async (id) => {
    return new Promise((resolve, reject) => {
        user.findOne({
            where: {
                verification: id,
                forgotPassword: true
            }
        })
            .then(item => {
                if(!item) reject(utils.buildErrObject(404, 'NOT_FOUND_OR_ALREADY_USED'))
                else {
                    resolve(item)
                }
            })
            .catch(() => reject(utils.buildErrObject(404, 'NOT_FOUND_OR_ALREADY_USED')))
    })
}

/**
 * Checks if verification id exists for user
 * @param {string} id - verification id
 */
const verificationExists = async (id) => {
    return new Promise((resolve, reject) => {
        user.findOne({
            where: {
                verification: id,
                verified: false
            }
        })
            .then(item => {
                if(!item) reject(utils.buildErrObject(404, 'NOT_FOUND_OR_ALREADY_VERIFIED'))
                else resolve(item)
            })
            .catch(() => reject(utils.buildErrObject(404, 'NOT_FOUND_OR_ALREADY_VERIFIED')))
    })
}

/**
 * Finds user by email
 * @param {string} email - user´s email
 */
const findUserByEmail = async (email) => {
    return new Promise((resolve, reject) => {
        user.findOne({
            where: { email }
        })
            .then((item) => {
                if(!item) reject(utils.buildErrObject(404, 'USER_DOES_NOT_EXIST'))
                else resolve(item)
            })
            .catch(() => reject(utils.buildErrObject(404, 'USER_DOES_NOT_EXIST')))
    })
}

/**
 * Register function called by route
 * @param {Object} req - request object
 */
const registerUser = async (req) => {
    return new Promise((resolve, reject) => {
        req.verification = req.password + req.email
        user.create(req)
            .then(item => {
                db.saveEvent({userId: item.id, event: 'new_user'})
                resolve(item)
            })
            .catch((e) => {
                reject(utils.buildErrObject(400, 'DONT_REGISTER'))
            })
    })
}

/*
*  Public functions
*/

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.register = async (req, res) => {
    try {
        const locale = req.getLocale()
        req = matchedData(req)
        const item = await registerUser(req)
        emailer.sendRegistrationEmailMessage(locale, item)

        if (req.verification) {
            const { hash: verification } = matchedData(req)
            const userId = item.id

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
                            db.saveEvent({userId: userId, event: `accept_invitation_${verification}`}).then()
                            res.status(200).json({ msg: 'success' })
                        }
                        else utils.buildErrObject(401, 'UNAUTHORIZED')
                    }
                })
                .catch(() => utils.handleError(res, utils.buildErrObject(404, 'NOT_FOUND')))
        }

        res.status(201).json({
            token: auth.generateToken(item.id),
            user: auth.setUserInfo(item),
            permissions: await auth.getPermissions(item.roleId)
        })
    } catch (e) {
        utils.handleError(res, utils.buildErrObject(400, 'DONT_REGISTER'))
    }
}

/**
 * Login function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.login = async (req, res) => {
    try {
        const data = matchedData(req)
        const item = await findUserByEmail(data.email)
        const isPasswordMatch = await auth.checkPassword(data.password, item.password)
        if (!isPasswordMatch) {
            utils.handleError(res, utils.buildErrObject(403, 'WRONG_PASSWORD'))
        } else {
            // all ok return user and token
            res.status(202).json({
                token: auth.generateToken(item.id),
                user: auth.setUserInfo(item),
                permissions: await auth.getPermissions(item.roleId)
            })
        }
    } catch (error) {
        utils.handleError(res, error)
    }
}

/**
 * Refresh token function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.getRefreshToken = async (req, res) => {
    try {
        const tokenEncrypted = req.headers.authorization
            .replace('Bearer ', '')
            .trim()
        const id = await auth.getUserIdFromToken(tokenEncrypted)
        const item = await auth.findUserById(id)

        res.status(202).json({
            token: auth.generateToken(item.id),
            user: auth.setUserInfo(item),
            permissions: await auth.getPermissions(item.roleId)
        })
    } catch (error) {
        utils.handleError(res, utils.buildErrObject(403, 'BAD_TOKEN'))
    }
}

/**
 * Verify function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.verify = async (req, res) => {
    try {
        const { id } = matchedData(req)
        const item = await verificationExists(id)
        const result = await db.updateItem(item.id, user, { verified: true }, {
            userId: item.id,
            event: `verified_${item.id}`
        })
        res.status(200).json(auth.setUserInfo(result))
    } catch (error) {
        utils.handleError(res, error)
    }
}

/**
 * Forgot password function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.forgotPassword = async (req, res) => {
    try {
        const locale = req.getLocale()
        const { email } = matchedData(req)
        const item = await findUserByEmail(email)
        if(!item.verified) utils.handleError(res,utils.buildErrObject(400, 'NOT_VERIFIED'))
        else {
            const result = await db.updateItem(item.id, user, {
                forgotPassword: true
            }, {
                userId: item.id,
                event: 'user_forgot_password'
            })
            await emailer.sendResetPasswordEmailMessage(locale, item)
            res.status(200).json(auth.setUserInfo(result))
        }
    } catch (error) {
        utils.handleError(res, error)
    }
}

/**
 * Reset password function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.resetPassword = async (req, res) => {
    try {
        const data = matchedData(req)
        const forgotPassword = await findForgotPassword(data.id)
        const result = await updatePassword(data.password, forgotPassword.id)
        res.status(200).json(auth.setUserInfo(result))
    } catch (error) {
        utils.handleError(res, error)
    }
}
