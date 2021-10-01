const express = require('express')
const passport = require('passport')
const trimRequest = require('trim-request')
const controller = require('../controllers/auth')
const validate = require('../controllers/auth.validate')

const router = express.Router()
require('../config/passport')

const requireAuth = passport.authenticate('jwt', {
    session: false
})

/**
 * @swagger
 * /register:
 *    post:
 *      tags:
 *        - auth
 *      summary: "register user"
 *      description: "register user in application"
 *      responses:
 *        '201':
 *          description: "Return user, token and permissions."
 *        '422':
 *          description: "Validation error in any of the fields entered or a field is missing."
 *        '400':
 *          description: "Register failed, email already exist"
 *        '500':
 *          description: "Internal server error"
 *    parameters:
 *      -  in: "body"
 *         name: "body"
 *         description: "parameters required to insert user"
 *         required: true
 *         schema:
 *            $ref: "#/definitions/authRegister"
 */
router.post(
    '/register',
    trimRequest.all,
    validate.register,
    controller.register
)

/**
 * @swagger
 * /token:
 *    get:
 *      tags:
 *        - auth
 *      summary: "assign new token"
 *      description: "reset token of user logged"
 *      responses:
 *        '202':
 *          description: "Return user, token and permissions."
 *        '401':
 *          description: "Unauthorized."
 *        '403':
 *          description: "Bad token."
 *        '500':
 *          description: "Internal server error"
 */
router.get(
    '/token',
    requireAuth,
    trimRequest.all,
    controller.getRefreshToken
)

/**
 * @swagger
 * /login:
 *    post:
 *      tags:
 *        - auth
 *      summary: "login"
 *      description: "access to application"
 *      responses:
 *        '202':
 *          description: "Return user, token and permissions."
 *        '403':
 *          description: "Wrong password."
 *        '404':
 *          description: "User does not exist."
 *        '422':
 *          description: "fields do not meet validation."
 *        '500':
 *          description: "Internal server error"
 *    parameters:
 *      -  in: "body"
 *         name: "body"
 *         description: "parameters required to login"
 *         required: true
 *         schema:
 *            $ref: "#/definitions/authLogin"
 */
router.post(
    '/login',
    trimRequest.all,
    validate.login,
    controller.login
)

module.exports = router
