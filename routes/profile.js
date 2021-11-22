const express = require('express')
const passport = require('passport')
const trimRequest = require('trim-request')
const controller = require('../controllers/profile')
const validate = require('../controllers/profile.validate')
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
 * /profile:
 *    post:
 *      tags:
 *        - profile
 *      summary: "update data for user"
 *      description: "update data for user"
 *      responses:
 *        '201':
 *          description: "Return user updated"
 *        '400':
 *          description: "Updated failed."
 *        '401':
 *          description: "Unauthorized."
 *        '422':
 *          description: "Validation error in any of the fields entered or a field is missing."
 *        '500':
 *          description: "Internal server error."
 *      parameters:
 *        -  in: "body"
 *           name: "body"
 *           description: "parameters required to insert phone"
 *           required: true
 *           schema:
 *                $ref: "#/definitions/profile"
 */
router.post(
    '/',
    requireAuth,
    permissions.roleAuthorization(),
    trimRequest.all,
    validate.updateItem,
    controller.updateItem
)

/**
 * @swagger
 * /profile:
 *    get:
 *      tags:
 *        - profile
 *      summary: "get user"
 *      description: "get user"
 *      responses:
 *        '200':
 *          description: "return user"
 *        '401':
 *          description: "Unauthorized."
 *        '404':
 *          description: "not found"
 *        '500':
 *          description: "Internal server error."
 */
router.get(
    '/',
    requireAuth,
    permissions.roleAuthorization(),
    trimRequest.all,
    controller.getItem
)

/**
 * @swagger
 * /profile/password:
 *    post:
 *      tags:
 *        - profile
 *      summary: "update password for user"
 *      description: "update password for user"
 *      responses:
 *        '201':
 *          description: "Return success password changed"
 *        '400':
 *          description: "Updated failed."
 *        '401':
 *          description: "Unauthorized."
 *        '403':
 *          description: "Wrong password."
 *        '422':
 *          description: "Validation error in any of the fields entered or a field is missing."
 *        '500':
 *          description: "Internal server error."
 *      parameters:
 *        -  in: "body"
 *           name: "body"
 *           description: "parameters required to insert phone"
 *           required: true
 *           schema:
 *                $ref: "#/definitions/profilePassword"
 */
router.post(
    '/password',
    requireAuth,
    permissions.roleAuthorization(),
    trimRequest.all,
    validate.changePassword,
    controller.changePassword
)

module.exports = router
