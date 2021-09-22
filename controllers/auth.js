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
const findUser = async (email) => {
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

const registerUser = async (req) => {
    return new Promise((resolve, reject) => {
        const password = auth.encrypt(req.password)
        const user = {
            name: req.name,
            email: req.email,
            password
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
        res.status(201).json(response)
    } catch (error) {
        utils.handleError(res, error)
    }
}
