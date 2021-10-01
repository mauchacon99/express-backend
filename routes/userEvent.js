const express = require('express')
const passport = require('passport')
const trimRequest = require('trim-request')
const controller = require('../controllers/userEvent')
const validate = require('../controllers/userEvent.validate')

const router = express.Router()
require('../config/passport')

const requireAuth = passport.authenticate('jwt', {
    session: false
})

/*
 * UsersEvents routes
 */


/**
 * @swagger
 * /userEvent/{id}:
 *    get:
 *      tags:
 *        - userEvent
 *      summary: "search userEvent for id of user"
 *      description: "search userEvent for id of user"
 *      responses:
 *        '200':
 *          description: "return userEvent"
 *        '404':
 *          description: "not found"
 *        '422':
 *          description: "error validate"
 *      parameters:
 *        - name: id
 *          in: query
 *          description: "id of user"
 *          required: true
 *          schema:
 *            type: number
 *            format: number
 *    responses:
 *      '200':
 *        description: "return userEvent"
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
 * /userEvent:
 *    get:
 *      tags:
 *        - userEvent
 *      summary: "get all userEvent"
 *      description: "get all userEvent"
 *      responses:
 *        '200':
 *          description: "return all userEvent"
 *        '404':
 *          description: "not found"
 *        '422':
 *          description: "error validate"
 *
 *    responses:
 *      '200':
 *        description: "return userEvent"
 */
router.get(
    '/',
    requireAuth,
    trimRequest.all,
    controller.getItems
)


module.exports = router
