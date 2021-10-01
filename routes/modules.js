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
 *        '200':
 *          description: "return module created"
 *        '422':
 *          description: "Validation error in any of the fields entered."
 *      parameters:
 *        -  in: "body"
 *           name: "body"
 *           description: "parameters required to insert module"
 *           required: true
 *           schema:
 *                $ref: "#/definitions/modules"
 *    responses:
 *      '200':
 *        description: "return module created"
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
 *        '404':
 *          description: "not found"
 *        '422':
 *          description: "error validate"
 *      parameters:
 *        - name: id
 *          in: query
 *          description: "id of module"
 *          required: true
 *          schema:
 *            type: number
 *            format: number
 *    responses:
 *      '200':
 *        description: "return module"
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
 *        '404':
 *          description: "not founds"
 *    responses:
 *      '200':
 *        description: "return modules"
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
 *        '200':
 *          description: "return module updated."
 *        '404':
 *          description: "Not found"
 *        '422':
 *          description: "Validation error in any of the fields entered."
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
 *    responses:
 *      '200':
 *        description: "return module updated."
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
 *        '404':
 *          description: "not found"
 *        '422':
 *          description: "error of validate."
 *      parameters:
 *        - name: id
 *          in: query
 *          description: "id of module"
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
