const express = require('express')
const passport = require('passport')
const trimRequest = require('trim-request')
const controller = require('../controllers/programs')
const validate = require('../controllers/programs.validate')
const router = express.Router()
require('../config/passport')
const permissions = require("../middleware/permissions");

const requireAuth = passport.authenticate('jwt', {
    session: false
})

/*
 * program routes
 */

/**
 * @swagger
 * /programs/all:
 *    get:
 *      tags:
 *        - programs
 *      summary: "get all program"
 *      description: get all program. relations alias
 *
 *
 *          `userPR` = relation of table users.
 *
 *
 *          `storagePR` = relation of table storage.
 *
 *
 *      responses:
 *        '200':
 *          description: "return programs"
 *        '401':
 *          description: "Unauthorized."
 *        '404':
 *          description: "not founds"
 *        '500':
 *          description: "Internal server error."
 */
router.get(
    '/all',
    requireAuth,
    permissions.roleAuthorization(),
    trimRequest.all,
    controller.getAllItems
)

/**
 * @swagger
 * /programs/home:
 *    get:
 *      tags:
 *        - programs
 *      summary: "get all programs"
 *      description: get all programs. (endpoint without authentication) relations alias
 *
 *
 *          `userPR` = relation of table users.
 *
 *
 *          `storagePR` = relation of table storage.
 *
 *
 *      responses:
 *        '200':
 *          description: "return programs"
 *        '404':
 *          description: "not founds"
 *        '500':
 *          description: "Internal server error."
 */
router.get(
    '/home',
    trimRequest.all,
    controller.getItemsHome
)

/**
 * @swagger
 * /programs:
 *    post:
 *      tags:
 *        - programs
 *      summary: "create new program for user"
 *      description: "create new program for user"
 *      responses:
 *        '201':
 *          description: "return program created"
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
 *           description: "parameters required to insert program"
 *           required: true
 *           schema:
 *                $ref: "#/definitions/programs"
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
 * /programs/{id}:
 *    get:
 *      tags:
 *        - programs
 *      summary: "search program for id"
 *      description: "search program for id"
 *      responses:
 *        '200':
 *          description: "return program"
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
 *          description: "id of program"
 *          required: true
 *          schema:
 *            type: number
 *            format: number
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
 * /programs:
 *    get:
 *      tags:
 *        - programs
 *      summary: "get all programs of logged in user"
 *      description: get all programs of logged in user. relations alias
 *
 *
 *          `userPR` = relation of table users.
 *
 *
 *          `storagePR` = relation of table storage.
 *
 *
 *      responses:
 *        '200':
 *          description: "return programs"
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
    permissions.roleAuthorization(),
    trimRequest.all,
    controller.getItems
)

/**
 * @swagger
 * /programs/{id}:
 *    patch:
 *      tags:
 *        - programs
 *      summary: "update program for id"
 *      description: "search program and update"
 *      responses:
 *        '201':
 *          description: "return program updated"
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
 *          description: "id of program"
 *          required: true
 *          schema:
 *            type: number
 *            format: number
 *        -  in: "body"
 *           name: "body"
 *           description: "parameters required to insert module."
 *           required: true
 *           schema:
 *                $ref: "#/definitions/programs"
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
 * /programs/{id}:
 *    delete:
 *      tags:
 *        - programs
 *      summary: "delete program for id"
 *      description: "delete program for id"
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
 *          description: "id of program"
 *          required: true
 *          schema:
 *            type: number
 *            format: number
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
