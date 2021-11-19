const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require('crypto')
const { user, permissions, modules, phone, location, storage, roles } = require("../models");
const utils = require("../middleware/utils");

const secret = process.env.JWT_SECRET
const algorithm = 'aes-192-cbc'
// Key length is dependent on the algorithm. In this case for aes192, it is
// 24 bytes (192 bits).
const key = crypto.scryptSync(secret, 'salt', 24)
const iv = Buffer.alloc(16, 0) // Initialization crypto vector


/*
*  Private functions
*/

/**
 * Encrypts text
 * @param {string} text - text to encrypt
 */
const encryptCrypto = (text) => {
    const cipher = crypto.createCipheriv(algorithm, key, iv)

    let encrypted = cipher.update(text, 'utf8', 'hex')
    encrypted += cipher.final('hex')

    return encrypted
}

/*
*  Public functions
*/

/**
 * Generates a token
 * @param {number} id - user id
 */
exports.generateToken = (id) => {
    // Gets expiration time
    const expiration = Math.floor(Date.now() / 1000) + 60 * process.env.JWT_EXPIRATION_IN_MINUTES

    // returns signed and encrypted token
    return encryptCrypto(
        jwt.sign(
            {
                data: { id },
                exp: expiration
            },
            process.env.JWT_SECRET
        )
    )
}

/**
 * Creates an object with user info
 * @param {Object} item - request object
 */
exports.setUserInfo = (item) => {
    const {
        password,
        forgotPassword,
        ...user
    } = item.dataValues

    return user
}

/**
 * Get permissions for role
 * @param {number} roleId - role id
 */
exports.getPermissions = (roleId) => {
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
        .then((resp) => {
            resolve(resp)
        })
        .catch(() => reject(utils.buildErrObject(403, 'DONT_HAVE_PERMISSIONS')))
    })
}

/**
 * Checks is password matches
 * @param {string} password - password
 * @param {string} userPass - user object
 * @returns {boolean}
 */
exports.checkPassword = async (password, userPass) => {
    return new Promise((resolve) => {
        bcrypt.compare(password, userPass, (err, result) => resolve(result))
    })
}

/**
 * Gets user id from token
 * @param {string} token - Encrypted and encoded token
 */
exports.getUserIdFromToken = (token) => {
    return new Promise((resolve, reject) => {
        // Decrypts, verifies and decode token
        jwt.verify(this.decryptCrypto(token), process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                reject(utils.buildErrObject(403, 'BAD_TOKEN'))
            }
            resolve(decoded.data.id)
        })
    })
}

/**
 * Finds user by ID
 * @param {string} id - user´s id
 */
exports.findUserById = (id) => {
    return new Promise((resolve, reject) => {
        user.findByPk(id, {
            include: [
                {
                    model: phone,
                    as: 'userP'
                },
                {
                    model: location,
                    as: 'userL'
                },
                {
                    model: storage,
                    as: 'avatar'
                },
                {
                    model: roles,
                    as: 'roleU'
                }
            ]
        })
            .then((item) => {
                if(!item)  reject(utils.buildErrObject(404, 'NOT_FOUND'))
                else resolve(item)
            })
            .catch(() => reject(utils.buildErrObject(404, 'NOT_FOUND')))
    })
}

/**
 * Decrypts text
 * @param {string} text - text to decrypt
 */
exports.decryptCrypto = (text) => {
    const decipher = crypto.createDecipheriv(algorithm, key, iv)

    try {
        let decrypted = decipher.update(text, 'hex', 'utf8')
        decrypted += decipher.final('utf8')
        return decrypted
    } catch (err) {
        return err
    }
}
