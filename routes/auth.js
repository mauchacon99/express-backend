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
 *    parameters:
 *      -  in: "body"
 *         name: "body"
 *         description: "parametros requeridos para verificar email"
 *         required: true
 *         schema:
 *            $ref: "#/definitions/authVerify"
 *    responses:
 *      '201':
 *        description: retorna el objeto insertado en la coleccion
 */

// router.post(
//     '/verify',
//     trimRequest.all,
//     validate.verify,
//     controller.verify
// )

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
 *    parameters:
 *      -  in: "body"
 *         name: "body"
 *         description: "parametros requeridos para restablecer password"
 *         required: true
 *         schema:
 *            $ref: "#/definitions/authForgot"
 *    responses:
 *      '201':
 *        description: retorna el objeto insertado en la coleccion
 */
// router.post(
//     '/forgot',
//     trimRequest.all,
//     validate.forgotPassword,
//     controller.forgotPassword
// )

/**
 * @swagger
 * /reset:
 *    post:
 *      tags:
 *        - auth
 *      summary: "reasignar  password"
 *      description: restablecer password solicitando verificacion y password
 *      responses:
 *        '200':
 *          description: Retorna un nuevo codigo de verificacion.
 *        '422':
 *          description:  Campos no cumplen validacion.
 *        '404':
 *          description:  No se a encontrado o ya existe usuario
 *    parameters:
 *      -  in: "body"
 *         name: "body"
 *         description: "parametros requeridos para reasignar password a usuario"
 *         required: true
 *         schema:
 *            $ref: "#/definitions/authReset"
 *    responses:
 *      '201':
 *        description: retorna el objeto del usuario
 */
// router.post(
//     '/reset',
//     trimRequest.all,
//     validate.resetPassword,
//     controller.resetPassword
// )

/**
 * @swagger
 * /token:
 *    get:
 *      tags:
 *        - auth
 *      summary: "asigna un nuevo token "
 *      description: asigna un nuevo token al usuario logeado
 *      responses:
 *        '200':
 *          description: retorna nuevo token
 *        '401':
 *          description:  desautorizado
 *    responses:
 *      '200':
 *        description: retorna el token del usuario logeado
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
