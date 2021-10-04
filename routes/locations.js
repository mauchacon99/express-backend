const express = require('express')
const passport = require('passport')
const trimRequest = require('trim-request')
const controller = require('../controllers/location')
const validate = require('../controllers/location.validate')
const router = express.Router()
require('../config/passport')
const permissions = require("../middleware/permissions");

const requireAuth = passport.authenticate('jwt', {
    session: false
})

/*
 * location routes
 */

/**
 * @swagger
 * /locations:
 *    post:
 *      tags:
 *        - locations
 *      summary: "create new location for user"
 *      description: "create new location for user"
 *      responses:
 *        '200':
 *          description: "return location created"
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
 *        description: "return location"
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
 * /locations/{id}:
 *    get:
 *      tags:
 *        - locations
 *      summary: "search location for id"
 *      description: "search location for id"
 *      responses:
 *        '200':
 *          description: "return location"
 *        '404':
 *          description: "not found"
 *        '422':
 *          description: "error validate"
 *      parameters:
 *        - name: id
 *          in: query
 *          description: "id of location"
 *          required: true
 *          schema:
 *            type: number
 *            format: number
 *    responses:
 *      '200':
 *        description: "return location"
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
 * /locations:
 *    get:
 *      tags:
 *        - locations
 *      summary: "get all location"
 *      description: "get all location. relations alias (userL)"
 *      responses:
 *        '200':
 *          description: "return location"
 *        '404':
 *          description: "not founds"
 *    responses:
 *      '200':
 *        description: "return location"
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
 * /locations/{id}:
 *    patch:
 *      tags:
 *        - locations
 *      summary: "update location for id"
 *      description: "search location and update"
 *      responses:
 *        '200':
 *          description: "return location updated."
 *        '404':
 *          description: "Not found"
 *        '422':
 *          description: "Validation error in any of the fields entered."
 *      parameters:
 *        - name: id
 *          in: query
 *          description: "id of location"
 *          required: true
 *          schema:
 *            type: number
 *            format: number
 *        -  in: "body"
 *           name: "body"
 *           description: "parameters required to insert location."
 *           required: true
 *           schema:
 *
 *    responses:
 *      '200':
 *        description: "return location updated."
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
 * /locations/{id}:
 *    delete:
 *      tags:
 *        - locations
 *      summary: "delete location for id"
 *      description: "delete location for id"
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
 *          description: "id of location"
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
