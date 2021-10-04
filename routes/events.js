const express = require('express')
const passport = require('passport')
const trimRequest = require('trim-request')
const controller = require('../controllers/userEvent')
const validate = require('../controllers/userEvent.validate')

const router = express.Router()
require('../config/passport')
const permissions = require("../middleware/permissions");

const requireAuth = passport.authenticate('jwt', {
    session: false
})

/*
 * UsersEvents routes
 */

/**
 * @swagger
 * /events/{id}:
 *    get:
 *      tags:
 *        - events
 *      summary: "search userEvent for id of user"
 *      description: "search userEvent for id of user"
 *      responses:
 *        '200':
 *          description: "return event"
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
    permissions.roleAuthorization(),
    trimRequest.all,
    validate.getItem,
    controller.getItem
)

/**
 * @swagger
 * /events:
 *    get:
 *      tags:
 *        - events
 *      summary: "get all events"
 *      description: "get all events"
 *      responses:
 *        '200':
 *          description: "return events"
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


module.exports = router
