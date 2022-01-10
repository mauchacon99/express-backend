const express = require('express')
const passport = require('passport')
const trimRequest = require('trim-request')
const controller = require('../controllers/payments')
const validate = require('../controllers/payments.validate')
const router = express.Router()
require('../config/passport')
const permissions = require("../middleware/permissions");

const requireAuth = passport.authenticate('jwt', {
    session: false
})

/*
 * payment routes
 */

/**
 * @swagger
 * /payments:
 *    post:
 *      tags:
 *        - payments
 *      summary: "create new payment"
 *      description: "create new payment"
 *      responses:
 *        '201':
 *          description: "return payment created"
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
 *           description: "parameters required to insert payment"
 *           required: true
 *           schema:
 *                $ref: "#/definitions/payments"
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
 * /payments/{id}:
 *    get:
 *      tags:
 *        - payments
 *      summary: "search payment for id"
 *      description: "search payment for id"
 *      responses:
 *        '200':
 *          description: "return payment"
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
 *          description: "id of payment"
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
 * /payments:
 *    get:
 *      tags:
 *        - payments
 *      summary: "get all payments"
 *      description: get all payments. relations alias
 *
 *
 *        `userPA` = relation of table users.
 *
 *
 *      responses:
 *        '200':
 *          description: "return payments"
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
 * /payments/{id}:
 *    patch:
 *      tags:
 *        - payments
 *      summary: "update payment for id"
 *      description: "search payment and update"
 *      responses:
 *        '201':
 *          description: "return payment updated"
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
 *          description: "id of payment"
 *          required: true
 *          schema:
 *            type: number
 *            format: number
 *        -  in: "body"
 *           name: "body"
 *           description: "parameters required to insert module."
 *           required: true
 *           schema:
 *                $ref: "#/definitions/payments"
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
 * /payments/confirm/{id}:
 *    patch:
 *      tags:
 *        - payments
 *      summary: "Confirm payment and subscribe to plan"
 *      description: "Confirm payment and subscribe to plan"
 *      responses:
 *        '201':
 *          description: "return payment updated"
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
 *          description: "id of payment"
 *          required: true
 *          schema:
 *            type: number
 *            format: number
 *        -  in: "body"
 *           name: "body"
 *           description: "parameters required to insert module."
 *           required: true
 *           schema:
 *                $ref: "#/definitions/confirmPayments"
 */
router.patch(
    '/confirm/:id',
    requireAuth,
    permissions.roleAuthorization(),
    trimRequest.all,
    validate.confirmAndSubscribe,
    controller.confirmAndSubscribe
)

/**
 * @swagger
 * /payments/{id}:
 *    delete:
 *      tags:
 *        - payments
 *      summary: "delete payment for id"
 *      description: "delete payment for id"
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
 *          description: "id of payment"
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
