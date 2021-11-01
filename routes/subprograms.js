const express = require('express')
const passport = require('passport')
const trimRequest = require('trim-request')
const controller = require('../controllers/subprograms')
const validate = require('../controllers/subprograms.validate')
const router = express.Router()
require('../config/passport')
const permissions = require("../middleware/permissions");

const requireAuth = passport.authenticate('jwt', {
    session: false
})

/*
 * subprogram routes
 */

/**
 * @swagger
 * /subprograms:
 *    post:
 *      tags:
 *        - subprograms
 *      summary: "create new subprogram"
 *      description: "create new subprogram"
 *      responses:
 *        '201':
 *          description: "return subprogram created"
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
 *           description: "parameters required to insert subprogram"
 *           required: true
 *           schema:
 *                $ref: "#/definitions/subprograms"
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
 * /subprograms/{id}:
 *    get:
 *      tags:
 *        - subprograms
 *      summary: "search subprogram for id"
 *      description: "search subprogram for id"
 *      responses:
 *        '200':
 *          description: "return subprogram"
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
 *          description: "id of subprogram"
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
 * /subprograms:
 *    get:
 *      tags:
 *        - subprograms
 *      summary: "get all subprogram"
 *      description: "get all subprogram. relations alias `programSP`"
 *      responses:
 *        '200':
 *          description: "return subprograms"
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
 * /subprograms/{id}:
 *    patch:
 *      tags:
 *        - subprograms
 *      summary: "update subprogram for id"
 *      description: "search subprogram and update"
 *      responses:
 *        '201':
 *          description: "return subprogram updated"
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
 *          description: "id of subprogram"
 *          required: true
 *          schema:
 *            type: number
 *            format: number
 *        -  in: "body"
 *           name: "body"
 *           description: "parameters required to insert module."
 *           required: true
 *           schema:
 *                $ref: "#/definitions/subprograms"
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
 * /subprograms/{id}:
 *    delete:
 *      tags:
 *        - subprograms
 *      summary: "delete subprogram for id"
 *      description: "delete subprogram for id"
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
 *          description: "id of subprogram"
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
