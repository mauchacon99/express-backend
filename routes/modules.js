const express = require('express')
const passport = require('passport')
const trimRequest = require('trim-request')
const controller = require('../controllers/modules')
const validate = require('../controllers/modules.validate')

const router = express.Router()
require('../config/passport')

const requireAuth = passport.authenticate('jwt', {
    session: false
})

/*
 * Modules routes
 */

/**
 * @swagger
 * /modules:
 *    post:
 *      tags:
 *        - modules
 *      summary: "Add new module"
 *      description: "Add new module"
 *      responses:
 *        '201':
 *          description: "return module created"
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
 *           description: "parameters required to insert module"
 *           required: true
 *           schema:
 *                $ref: "#/definitions/modules"
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
 * /modules/{id}:
 *    get:
 *      tags:
 *        - modules
 *      summary: "search module for id"
 *      description: "search module for id"
 *      responses:
 *        '200':
 *          description: "return module"
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
 *          description: "id of module"
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
 * /modules:
 *    get:
 *      tags:
 *        - modules
 *      summary: "get all modules"
 *      description: "get all modules"
 *      responses:
 *        '200':
 *          description: "return modules"
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
 * /modules/{id}:
 *    patch:
 *      tags:
 *        - modules
 *      summary: "update module for id"
 *      description: "search module and update"
 *      responses:
 *        '201':
 *          description: "return module updated"
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
 *          description: "id of module"
 *          required: true
 *          schema:
 *            type: number
 *            format: number
 *        -  in: "body"
 *           name: "body"
 *           description: "parameters required to insert module."
 *           required: true
 *           schema:
 *                $ref: "#/definitions/modules"
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
 * /modules/{id}:
 *    delete:
 *      tags:
 *        - modules
 *      summary: "delete module for id"
 *      description: "delete module for id"
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
 *          description: "id of module"
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
