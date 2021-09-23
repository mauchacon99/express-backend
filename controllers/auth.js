const { User } = require("../models");
const utils = require("../middleware/utils");
const auth = require('../middleware/auth')
const {matchedData} = require("express-validator");

/*
*  Private functions
*/

/**
 * Finds user by email
 * @param {string} email - user´s email
 */
const findUserByEmail = async (email) => {
    return new Promise((resolve, reject) => {
        User.findOne({
            where: { email }
        })
            .then((item) => {
                if(!item)  utils.itemNotFound('not found', reject, item, 'USER_DOES_NOT_EXIST')
                else resolve(item)
            })
            .catch((err) => utils.itemNotFound(err, null, reject, 'USER_DOES_NOT_EXIST'))
    })
}

/**
 * Register function called by route
 * @param {Object} req - request object
 */
const registerUser = async (req) => {
    return new Promise((resolve, reject) => {
        const user = {
            name: req.name,
            email: req.email,
            password: req.password
        }

        User.create(user)
            .then(user => resolve(user))
            .catch(err => reject(utils.buildErrObject(422, err.message)))
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
        req = matchedData(req)
        const user = await registerUser(req)
        const userInfo = auth.setUserInfo(user)
        const response = auth.returnRegisterToken(userInfo)
        res.status(200).json(response)
    } catch (error) {
        utils.handleError(res, error)
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
        const user = await findUserByEmail(data.email)
        const isPasswordMatch = await auth.checkPassword(data.password, user.password)
        if (!isPasswordMatch) {
            utils.handleError(res, utils.buildErrObject(409, 'WRONG_PASSWORD'))
        } else {
            // all ok return user and token
            res.status(200).json({
                token: auth.generateToken(user.id),
                user: auth.setUserInfo(user)
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
        const user = await auth.findUserById(id)

        res.status(200).json({
            token: auth.generateToken(user.id),
            user: auth.setUserInfo(user)
        })
    } catch (error) {
        utils.handleError(res, error)
    }
}

