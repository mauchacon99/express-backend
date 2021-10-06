const express = require('express')
const passport = require('passport')
const trimRequest = require('trim-request')
const controller = require('../controllers/places')
const validate = require('../controllers/places.validate')

const router = express.Router()
require('../config/passport')

const requireAuth = passport.authenticate('jwt', {
    session: false
})

/**
 * @swagger
 * /login:
 *    post:
 *      tags:
 *        - auth
 *      summary: "login"
 *      description: "access to application"
 *      responses:
 *        '202':
 *          description: "Return user, token and permissions."
 *        '403':
 *          description: "Wrong password."
 *        '404':
 *          description: "User does not exist."
 *        '422':
 *          description: "fields do not meet validation."
 *        '500':
 *          description: "Internal server error"
 *    parameters:
 *      -  in: "body"
 *         name: "body"
 *         description: "parameters required to login"
 *         required: true
 *         schema:
 *            $ref: "#/definitions/authLogin"
 */
router.post(
    '/',
    trimRequest.all,
    validate.getPlace,
    controller.getPlace
)

module.exports = router
