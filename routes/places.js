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
 * /places:
 *    post:
 *      tags:
 *        - Google places
 *      summary: "Google places"
 *      description: "get address from input"
 *      responses:
 *        '202':
 *          description: "Return get address from input"
 *        '404':
 *          description: "Not found place"
 *        '422':
 *          description: "fields do not meet validation."
 *        '500':
 *          description: "Internal server error"
 *    parameters:
 *      -  in: "body"
 *         name: "body"
 *         description: "parameters required to search places"
 *         required: true
 *         schema:
 *            $ref: "#/definitions/places"
 */
router.post(
    '/',
    trimRequest.all,
    validate.getPlace,
    controller.getPlace
)

module.exports = router
