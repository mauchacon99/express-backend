const express = require('express')
const passport = require('passport')
const trimRequest = require('trim-request')
const controller = require('../controllers/documents')
const validate = require('../controllers/documents.validate')
const router = express.Router()
require('../config/passport')
const permissions = require("../middleware/permissions");

const requireAuth = passport.authenticate('jwt', {
    session: false
})

/*
 * document routes
 */

/**
 * @swagger
 * /documents:
 *    post:
 *      tags:
 *        - documents
 *      summary: "create new document"
 *      description: "create new document"
 *      responses:
 *        '201':
 *          description: "return document created"
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
 *           description: "parameters required to insert document"
 *           required: true
 *           schema:
 *                $ref: "#/definitions/documents"
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
 * /documents/{id}:
 *    get:
 *      tags:
 *        - documents
 *      summary: "search documents for idStorage"
 *      description: "search documents for idStorage"
 *      responses:
 *        '200':
 *          description: "return documents"
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
 *          description: "id of idStorage"
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
 * /documents:
 *    get:
 *      tags:
 *        - documents
 *      summary: "get all documents"
 *      description: get all documents. relations alias
 *
 *
 *          `planD` = relation of table plans.
 *
 *
 *          `storageD` = relation of table storages.
 *
 *
 *      responses:
 *        '200':
 *          description: "return documents"
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
 * /documents/{id}:
 *    patch:
 *      tags:
 *        - documents
 *      summary: "update document for id"
 *      description: "search document and update"
 *      responses:
 *        '201':
 *          description: "return document updated"
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
 *          description: "id of document"
 *          required: true
 *          schema:
 *            type: number
 *            format: number
 *        -  in: "body"
 *           name: "body"
 *           description: "parameters required to insert module."
 *           required: true
 *           schema:
 *                $ref: "#/definitions/documentsUpdate"
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
 * /documents/{id}:
 *    delete:
 *      tags:
 *        - documents
 *      summary: "delete document for id"
 *      description: "delete document for id"
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
 *          description: "id of document"
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
