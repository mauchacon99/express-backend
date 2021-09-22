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
 *      summary: "registro de usuario"
 *      description: registrar usuario en la aplicacion
 *      responses:
 *        '200':
 *          description: Retorna el objeto insertado en la coleccion.
 *        '422':
 *          description: Email ya esta registrado o campos no cumplen validacion.
 *    parameters:
 *      -  in: "body"
 *         name: "body"
 *         description: "parametros requeridos para insertar usuario"
 *         required: true
 *         schema:
 *            $ref: "#/definitions/authRegister"
 *    responses:
 *      '201':
 *        description: retorna el objeto insertado en la coleccion
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
 * /social:
 *    post:
 *      tags:
 *        - auth
 *      summary: "Registrar usuario por facebook - google"
 *      description: registrar usuario por redes sociales
 *      responses:
 *        '200':
 *          description: Retorna usuario registrado
 *        '422':
 *          description:  Campos no cumplen validacion.
 *    parameters:
 *      -  in: "body"
 *         name: "body"
 *         description: "parametros requeridos para reegistro"
 *         required: true
 *         schema:
 *            $ref: "#/definitions/authSocial"
 *    responses:
 *      '201':
 *        description: retorna usuario registrado
 */
// router.post(
//     '/social',
//     trimRequest.all,
//     validate.social,
//     controller.registerSocial
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
// router.get(
//     '/token',
//     requireAuth,
//     trimRequest.all,
//     controller.getRefreshToken
// )

/**
 * @swagger
 * /login:
 *    post:
 *      tags:
 *        - auth
 *      summary: "acceso al sistema"
 *      description: permitir el acceso a la aplicacion
 *      responses:
 *        '200':
 *          description: Retorna el objeto  del usuario y el token asignado.
 *        '422':
 *          description: campos no cumplen validacion.
 *        '404':
 *          description: email o password equivocados.
 *    parameters:
 *      -  in: "body"
 *         name: "body"
 *         description: "parametros requeridos para insertar usuario"
 *         required: true
 *         schema:
 *            $ref: "#/definitions/authLogin"
 *    responses:
 *      '201':
 *        description: retorna el objeto correspondiente a los datos del usuario
 */
// router.post(
//     '/login',
//     trimRequest.all,
//     validate.login,
//     controller.login
// )

module.exports = router
