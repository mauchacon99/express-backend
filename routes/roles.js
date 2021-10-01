const express = require('express')
const passport = require('passport')
const trimRequest = require('trim-request')
const controller = require('../controllers/roles')
const validate = require('../controllers/roles.validate')

const router = express.Router()
require('../config/passport')

const requireAuth = passport.authenticate('jwt', {
    session: false
})

/*
 * Roles routes
 */

/**
 * @swagger
 * /roles:
 *    post:
 *      tags:
 *        - roles
 *      summary: "Add new rol"
 *      description: "Add new rol"
 *      responses:
 *        '200':
 *          description: "return rol created"
 *        '422':
 *          description: "Validation error in any of the fields entered."
 *      parameters:
 *        -  in: "body"
 *           name: "body"
 *           description: "parameters required to insert rol"
 *           required: true
 *           schema:
 *                $ref: "#/definitions/roles"
 *    responses:
 *      '200':
 *        description: "return rol created"
 */
router.post(
    '/',
    requireAuth,
    trimRequest.all,
    validate.createItem,
    controller.createItem
)

/**
 * @swagger
 * /roles/{id}:
 *    get:
 *      tags:
 *        - roles
 *      summary: "search rol for id"
 *      description: "search rol for id"
 *      responses:
 *        '200':
 *          description: "return rol"
 *        '404':
 *          description: "not found"
 *        '422':
 *          description: "error validate"
 *      parameters:
 *        - name: id
 *          in: query
 *          description: "id of rol"
 *          required: true
 *          schema:
 *            type: number
 *            format: number
 *    responses:
 *      '200':
 *        description: "return rol"
 */
router.get(
    '/:id',
    requireAuth,
    trimRequest.all,
    validate.getItem,
    controller.getItem
)

/**
 * @swagger
 * /roles:
 *    get:
 *      tags:
 *        - roles
 *      summary: "get all roles"
 *      description: "get all roles"
 *      responses:
 *        '200':
 *          description: "return roles"
 *        '404':
 *          description: "not founds"
 *    responses:
 *      '200':
 *        description: "return roles"
 */
router.get(
    '/',
    requireAuth,
    trimRequest.all,
    controller.getItems
)

/**
 * @swagger
 * /roles/{id}:
 *    patch:
 *      tags:
 *        - roles
 *      summary: "update rol for id"
 *      description: "search rol and update"
 *      responses:
 *        '200':
 *          description: "return rol updated."
 *        '404':
 *          description: "Not found"
 *        '422':
 *          description: "Validation error in any of the fields entered."
 *      parameters:
 *        - name: id
 *          in: query
 *          description: "id of rol"
 *          required: true
 *          schema:
 *            type: number
 *            format: number
 *        -  in: "body"
 *           name: "body"
 *           description: "parameters required to insert rol."
 *           required: true
 *           schema:
 *                $ref: "#/definitions/roles"
 *    responses:
 *      '200':
 *        description: "return rol updated."
 */
router.patch(
    '/:id',
    requireAuth,
    trimRequest.all,
    validate.updateItem,
    controller.updateItem
)

/**
 * @swagger
 * /roles/{id}:
 *    delete:
 *      tags:
 *        - roles
 *      summary: "delete rol for id"
 *      description: "delete rol for id"
 *      responses:
 *        '200':
 *          description: "message deleted"
 *        '404':
 *          description: "not found"
 *        '422':
 *          description: "error of validate."
 *      parameters:
 *        - name: id
 *          in: query
 *          description: "id of rol"
 *          required: true
 *          schema:
 *            type: number
 *            format: number
 *    responses:
 *      '200':
 *        description: "message deleted"
 */
router.delete(
    '/:id',
    requireAuth,
    trimRequest.all,
    validate.deleteItem,
    controller.deleteItem
)

module.exports = router
