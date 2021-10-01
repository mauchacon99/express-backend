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
 *        '201':
 *          description: "return rol created"
 *        '400':
 *          description: "Created failed."
 *        '401':
 *          description: "Unauthorized."
 *        '422':
 *          description: "Validation error in any of the fields entered or a field is missing."
 *        '500':
 *          description: "Internal server error."
 *      parameters:
 *        -  in: "body"
 *           name: "body"
 *           description: "parameters required to insert rol"
 *           required: true
 *           schema:
 *                $ref: "#/definitions/roles"
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
 *        '401':
 *          description: "Unauthorized."
 *        '404':
 *          description: "not found"
 *        '422':
 *          description: "Validation error in any of the fields entered or a field is missing."
 *        '500':
 *          description: "Internal server error."
 *      parameters:
 *        - name: id
 *          in: query
 *          description: "id of rol"
 *          required: true
 *          schema:
 *            type: number
 *            format: number
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
 *        '401':
 *          description: "Unauthorized."
 *        '404':
 *          description: "not founds"
 *        '500':
 *          description: "Internal server error."
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
 *        '201':
 *          description: "return rol updated"
 *        '400':
 *          description: "Updated failed."
 *        '401':
 *          description: "Unauthorized."
 *        '422':
 *          description: "Validation error in any of the fields entered or a field is missing."
 *        '500':
 *          description: "Internal server error."
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
 *        '401':
 *          description: "Unauthorized."
 *        '404':
 *          description: "not found"
 *        '422':
 *          description: "Validation error in any of the fields entered or a field is missing."
 *        '500':
 *          description: "Internal server error."
 *      parameters:
 *        - name: id
 *          in: query
 *          description: "id of rol"
 *          required: true
 *          schema:
 *            type: number
 *            format: number
 */
router.delete(
    '/:id',
    requireAuth,
    trimRequest.all,
    validate.deleteItem,
    controller.deleteItem
)

module.exports = router
