const express = require('express')
const passport = require('passport')
const trimRequest = require('trim-request')
const controller = require('../controllers/invitations')
const validate = require('../controllers/invitations.validate')
const router = express.Router()
require('../config/passport')
const permissions = require("../middleware/permissions");

const requireAuth = passport.authenticate('jwt', {
    session: false
})

/*
 * invitation routes
 */

/**
 * @swagger
 * /invitations:
 *    post:
 *      tags:
 *        - invitations
 *      summary: "create new invitation"
 *      description: "create new invitation"
 *      responses:
 *        '201':
 *          description: "return invitation created"
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
 *           description: "parameters required to insert invitation"
 *           required: true
 *           schema:
 *                $ref: "#/definitions/invitations"
 */

router.post(
    '/',
    requireAuth,
    permissions.roleAuthorization(),
    permissions.invitationAuthorization(),
    trimRequest.all,
    validate.createItem,
    controller.createItem
)

/**
 * @swagger
 * /invitations/{hash}:
 *    get:
 *      tags:
 *        - invitations
 *      summary: "accept invitation"
 *      description: "accept invitation"
 *      responses:
 *        '200':
 *          description: "return invitation"
 *        '401':
 *          description: "Unauthorized."
 *        '404':
 *          description: "not found"
 *        '422':
 *          description: "Validation error in any of the fields entered or a field is missing."
 *        '500':
 *          description: "Internal server error."
 *      parameters:
 *        - name: hash
 *          in: query
 *          description: "hash of sender (verification)"
 *          required: true
 *          schema:
 *            type: string
 *            format: string
 */
router.get(
    '/:hash',
    requireAuth,
    permissions.roleAuthorization(),
    trimRequest.all,
    validate.getItem,
    permissions.invitationAcceptingAuthorization(),
    controller.getItem
)

/**
 * @swagger
 * /invitations:
 *    get:
 *      tags:
 *        - invitations
 *      summary: "get all invitations"
 *      description: "get all invitations"
 *      responses:
 *        '200':
 *          description: "return invitations"
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
 * /invitations/{id}:
 *    delete:
 *      tags:
 *        - invitations
 *      summary: "delete invitation for id"
 *      description: "delete invitation for id"
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
 *          description: "id of invitation"
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
