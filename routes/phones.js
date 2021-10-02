const express = require('express')
const passport = require('passport')
const trimRequest = require('trim-request')
const controller = require('../controllers/phone')
const validate = require('../controllers/phone.validate')
const db = require('../middleware/db')
const router = express.Router()
require('../config/passport')
const permissions = require("../middleware/permissions");

const requireAuth = passport.authenticate('jwt', {
    session: false
})

/*
 * phone routes
 */

/**
 * @swagger
 * /phone:
 *    post:
 *      tags:
 *        - phone
 *      summary: "create new phone for user"
 *      description: "create new phone for user"
 *      responses:
 *        '200':
 *          description: "return phone created"
 *        '404':
 *          description: "not found"
 *        '422':
 *          description: "error validate"
 *      parameters:
 *
 *        - body: id
 *        - name: id
 *        - name: id
 *
 *          in: query
 *          description: ""
 *          required: true
 *          schema:
 *            type: number
 *            format: number
 *    responses:
 *      '200':
 *        description: "return phone"
 */

router.post(
    '/',
    requireAuth,
    permissions.roleAuthorization(),
    trimRequest.all,
    validate.createItem,
    controller.createItem
)

/**
 * @swagger
 * /phone/{id}:
 *    get:
 *      tags:
 *        - phone
 *      summary: "search phone for id"
 *      description: "search user for id"
 *      responses:
 *        '200':
 *          description: "return user"
 *        '404':
 *          description: "not found"
 *        '422':
 *          description: "error validate"
 *      parameters:
 *        - name: id
 *          in: query
 *          description: "id of user"
 *          required: true
 *          schema:
 *            type: number
 *            format: number
 *    responses:
 *      '200':
 *        description: "return user"
 */
router.get(
    '/:id',
    requireAuth,
    permissions.roleAuthorization(),
    trimRequest.all,
    validate.getItem,
    controller.getItem
)

/**
 * @swagger
 * /phone:
 *    get:
 *      tags:
 *        - phone
 *      summary: "get all phones with any filter "
 *      description: "example /even?fields=userId&filter=1"
 *      responses:
 *        '200':
 *          description: "return phones"
 *        '404':
 *          description: "not founds"
 *    responses:
 *      '200':
 *        description: "return phones"
 */
router.get(
    '/',
    requireAuth,
    permissions.roleAuthorization(),
    trimRequest.all,
    controller.getItems
)

/**
 * @swagger
 * /phone/{id}:
 *    patch:
 *      tags:
 *        - phone
 *      summary: "update phone for id"
 *      description: "search phone and update"
 *      responses:
 *        '200':
 *          description: "return phone updated."
 *        '404':
 *          description: "Not found"
 *        '422':
 *          description: "Validation error in any of the fields entered."
 *      parameters:
 *        - name: id
 *          in: query
 *          description: "id of phone"
 *          required: true
 *          schema:
 *            type: number
 *            format: number
 *        -  in: "body"
 *           name: "body"
 *           description: "parameters required to insert phone."
 *           required: true
 *           schema:
 *
 *    responses:
 *      '200':
 *        description: "return phone updated."
 */
router.patch(
    '/:id',
    requireAuth,
    permissions.roleAuthorization(),
    trimRequest.all,
    validate.updateItem,
    controller.updateItem
)

/**
 * @swagger
 * /phone/{id}:
 *    delete:
 *      tags:
 *        - phone
 *      summary: "delete phone for id"
 *      description: "delete phone for id"
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
 *          description: "id of phone"
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
    permissions.roleAuthorization(),
    trimRequest.all,
    validate.deleteItem,
    controller.deleteItem
)

module.exports = router
