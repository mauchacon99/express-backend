const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.generateToken = (user) => {
    // Gets expiration time
    const expiration = Math.floor(Date.now() / 1000) + 60 * process.env.JWT_EXPIRATION_IN_MINUTES

    // returns signed and encrypted token
    return this.encrypt(
        jwt.sign(
            {
                data: {
                    id: user
                },
                exp: expiration
            },
            process.env.JWT_SECRET
        )
    )
}

/**
 * Creates an object with user info
 * @param {Object} user - request object
 */
exports.setUserInfo = (user) => {
    return {
        // id: user.id,
        name: user.name,
        email: user.email
    }
}

/**
 * Creates an object with user info
 * @param {Object} user - request object
 */
exports.returnRegisterToken = (user) => {
    const {id, ...item} = user
    return {
        token: this.generateToken(id),
        item
    }
}

/**
 * Checks is password matches
 * @param {string} password - password
 * @param {string} user - user object
 * @returns {boolean}
 */
exports.checkPassword = async (password, user) => {
    return new Promise((resolve) => {
        bcrypt.compare(password, user, (err, result) => resolve(result))
    })

}

/**
 * Encrypts text
 * @param {string} text - text to encrypt
 */
exports.encrypt = (text)  => bcrypt.hashSync(text, 10)
