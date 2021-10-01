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
 *        '200':
 *          description: "Return user and token."
 *        '422':
 *          description: "Email is already registered or fields do not meet validation."
 *    parameters:
 *      -  in: "body"
 *         name: "body"
 *         description: "parameters required to insert user"
 *         required: true
 *         schema:
 *            $ref: "#/definitions/authRegister"
 *    responses:
 *      '201':
 *        description: "description: Return user and token."
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
 *        '200':
 *          description: "return user and new token"
 *        '401':
 *          description:  "unauthorized"
 *    responses:
 *      '200':
 *        description: "return user and new token"
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
 *        '200':
 *          description: "Return user and token."
 *        '422':
 *          description: "fields do not meet validation."
 *        '404':
 *          description: "wrong email or password."
 *    parameters:
 *      -  in: "body"
 *         name: "body"
 *         description: "parameters required to login"
 *         required: true
 *         schema:
 *            $ref: "#/definitions/authLogin"
 *    responses:
 *      '201':
 *        description: "Return user and token."
 */
router.post(
    '/login',
    trimRequest.all,
    validate.login,
    controller.login
)

module.exports = router
