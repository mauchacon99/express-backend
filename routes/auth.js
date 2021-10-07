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


/**
 * @swagger
 * /verify:
 *    post:
 *      tags:
 *        - auth
 *      summary: "Verificar email"
 *      description: verificar codigo atravez de email
 *      responses:
 *        '200':
 *          description: Retorna el email y la verificacion verdadera.
 *        '422':
 *          description: Campos no cumplen validacion.
 *        '404':
 *          description: Mensaje de errors de no verificado o no encontrado.
 *        '500':
 *          description: "Internal server error"
 *    parameters:
 *      -  in: "body"
 *         name: "body"
 *         description: "parametros requeridos para verificar email"
 *         required: true
 *         schema:
 *            $ref: "#/definitions/authVerify"
 */
router.post(
    '/verify',
    trimRequest.all,
    validate.verify,
    controller.verify
)

/**
 * @swagger
 * /forgot:
 *    post:
 *      tags:
 *        - auth
 *      summary: "restablecer password"
 *      description: restablecer password solicitando solo email
 *      responses:
 *        '200':
 *          description: Retorna un nuevo codigo de verificacion.
 *        '422':
 *          description:  Campos no cumplen validacion.
 *        '404':
 *          description: Mensaje de errors de no encontrado.
 *        '400':
 *          description: "Not verified".
 *        '500':
 *          description: "Internal server error"
 *    parameters:
 *      -  in: "body"
 *         name: "body"
 *         description: "parametros requeridos para restablecer password"
 *         required: true
 *         schema:
 *            $ref: "#/definitions/authForgot"
 */
router.post(
    '/forgot',
    trimRequest.all,
    validate.forgotPassword,
    controller.forgotPassword
)

/**
 * @swagger
 * /reset:
 *    post:
 *      tags:
 *        - auth
 *      summary: "reassign password"
 *      description: restablecer password solicitando verificacion y password
 *      responses:
 *        '200':
 *          description: Retorna un nuevo codigo de verificacion.
 *        '422':
 *          description:  Campos no cumplen validacion.
 *        '404':
 *          description:  No se a encontrado o ya existe usuario
 *        '500':
 *          description: "Internal server error"
 *    parameters:
 *      -  in: "body"
 *         name: "body"
 *         description: "parametros requeridos para reasignar password a usuario"
 *         required: true
 *         schema:
 *            $ref: "#/definitions/authReset"
 */
router.post(
    '/reset',
    trimRequest.all,
    validate.resetPassword,
    controller.resetPassword
)
module.exports = router
