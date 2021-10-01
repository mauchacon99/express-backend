const express = require('express')
const passport = require('passport')
const trimRequest = require('trim-request')
const controller = require('../controllers/users')
const validate = require('../controllers/users.validate')

const router = express.Router()
require('../config/passport')

const requireAuth = passport.authenticate('jwt', {
    session: false
})

/*
 * Users routes
 */

/**
 * @swagger
 * /users:
 *    post:
 *      tags:
 *        - users
 *      summary: "Add new user"
 *      description: "Add new user"
 *      responses:
 *        '201':
 *          description: "return user created"
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
 *           description: "parameters required to insert user"
 *           required: true
 *           schema:
 *                $ref: "#/definitions/users"
 *    responses:
 *      '200':
 *        description: "return user created"
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
 * /users/{id}:
 *    get:
 *      tags:
 *        - users
 *      summary: "search user for id"
 *      description: "search user for id"
 *      responses:
 *        '200':
 *          description: "return user"
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
 *          description: "id of user"
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
 * /users:
 *    get:
 *      tags:
 *        - users
 *      summary: "get all users"
 *      description: "get all users"
 *      responses:
 *        '200':
 *          description: "return users"
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
 * /users/{id}:
 *    patch:
 *      tags:
 *        - users
 *      summary: "update user for id"
 *      description: "search user and update"
 *      responses:
 *        '201':
 *          description: "return user updated"
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
 *          description: "id of user"
 *          required: true
 *          schema:
 *            type: number
 *            format: number
 *        -  in: "body"
 *           name: "body"
 *           description: "parameters required to insert user."
 *           required: true
 *           schema:
 *                $ref: "#/definitions/users"
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
 * /users/{id}:
 *    delete:
 *      tags:
 *        - users
 *      summary: "delete user for id"
 *      description: "delete user for id"
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
 *          description: "id of user"
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
