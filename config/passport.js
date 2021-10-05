
const passport = require('passport')
const { user } = require('../models')
const auth = require('../middleware/auth')
const utils = require("../middleware/utils");
const JwtStrategy = require('passport-jwt').Strategy

/**
 * Extracts token from: header, body or query
 * @param {Object} req - request object
 * @returns {string} token - decrypted token
 */
const jwtExtractor = (req) => {
    let token = null
    if (req.headers.authorization) {
        token = req.headers.authorization.replace('Bearer ', '').trim()
    } else if (req.body.token) {
        token = req.body.token.trim()
    } else if (req.query.token) {
        token = req.query.token.trim()
    }
    if (token) {
        // Decrypts token
        token = auth.decryptCrypto(token)
    }
    return token
}

/**
 * Options object for jwt middlware
 */
const jwtOptions = {
    jwtFromRequest: jwtExtractor,
    secretOrKey: process.env.JWT_SECRET
}

/**
 * Login with JWT middleware
 */
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
    user.findByPk(payload.data.id)
        .then((item) => !item ? done(null, false) : done(null, item))
        .catch((err) => done(err, false))
})

passport.use(jwtLogin)
