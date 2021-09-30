const express = require('express')
const passport = require('passport')
const trimRequest = require('trim-request')
const controller = require('../controllers/permissions')
const validate = require('../controllers/permissions.validate')

const router = express.Router()
require('../config/passport')

const requireAuth = passport.authenticate('jwt', {
    session: false
})

/*
 * Permissions routes
 */

/**
 * @swagger
 * /permissions:
 *    post:
 *      tags:
 *        - permissions
 *      summary: "Add new permission"
 *      description: "Add new permission"
 *      responses:
 *        '200':
 *          description: "return permission created"
 *        '422':
 *          description: "Validation error in any of the fields entered."
 *      parameters:
 *        -  in: "body"
 *           name: "body"
 *           description: "parameters required to insert permission"
 *           required: true
 *           schema:
 *                $ref: "#/definitions/permissions"
 *    responses:
 *      '200':
 *        description: "return permission created"
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
 * /permission/{id}:
 *    get:
 *      tags:
 *        - permission
 *      summary: "search permission for id"
 *      description: "search permission for id"
 *      responses:
 *        '200':
 *          description: "return permission"
 *        '404':
 *          description: "not found"
 *        '422':
 *          description: "error validate"
 *      parameters:
 *        - name: id
 *          in: query
 *          description: "id of permission"
 *          required: true
 *          schema:
 *            type: number
 *            format: number
 *    responses:
 *      '200':
 *        description: "return permission"
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
 * /permissions:
 *    get:
 *      tags:
 *        - permissions
 *      summary: "get all permissions"
 *      description: "get all permissions"
 *      responses:
 *        '200':
 *          description: "return permissions"
 *        '404':
 *          description: "not founds"
 *    responses:
 *      '200':
 *        description: "return permissions"
 */
router.get(
    '/',
    requireAuth,
    trimRequest.all,
    controller.getItems
)

/**
 * @swagger
 * /permissions/{id}:
 *    patch:
 *      tags:
 *        - permissions
 *      summary: "update permission for id"
 *      description: "search permission and update"
 *      responses:
 *        '200':
 *          description: "return permission updated."
 *        '404':
 *          description: "Not found"
 *        '422':
 *          description: "Validation error in any of the fields entered."
 *      parameters:
 *        - name: id
 *          in: query
 *          description: "id of permission"
 *          required: true
 *          schema:
 *            type: number
 *            format: number
 *        -  in: "body"
 *           name: "body"
 *           description: "parameters required to insert permission."
 *           required: true
 *           schema:
 *                $ref: "#/definitions/permissions"
 *    responses:
 *      '200':
 *        description: "return permission updated."
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
 * /permissions/{id}:
 *    delete:
 *      tags:
 *        - permissions
 *      summary: "delete permission for id"
 *      description: "delete permission for id"
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
 *          description: "id of permission"
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
