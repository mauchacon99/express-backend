const express = require('express')
const passport = require('passport')
const trimRequest = require('trim-request')
const controller = require('../controllers/statistics')
const router = express.Router()
require('../config/passport')
const permissions = require("../middleware/permissions");

const requireAuth = passport.authenticate('jwt', {
    session: false
})

/*
 * program routes
 */

/**
 * @swagger
 * /statistics/plans:
 *    get:
 *      tags:
 *        - statistics
 *      summary: "get plans statistics"
 *      description: get plans statistics.
 *
 *      responses:
 *        '200':
 *          description: "return statistics"
 *        '401':
 *          description: "Unauthorized."
 *        '404':
 *          description: "not founds"
 *        '500':
 *          description: "Internal server error."
 */
router.get(
    '/plans',
    requireAuth,
    permissions.roleAuthorization(),
    trimRequest.all,
    controller.getPlanStatistics
)

/**
 * @swagger
 * /statistics/payment:
 *    get:
 *      tags:
 *        - statistics
 *      summary: "get payment statistics"
 *      description: get payment statistics.
 *
 *      responses:
 *        '200':
 *          description: "return statistics"
 *        '401':
 *          description: "Unauthorized."
 *        '404':
 *          description: "not founds"
 *        '500':
 *          description: "Internal server error."
 */
 router.get(
    '/payment',
    requireAuth,
    permissions.roleAuthorization(),
    trimRequest.all,
    controller.getPaymentStatistics
)

/**
 * @swagger
 * /statistics/payment:
 *    get:
 *      tags:
 *        - statistics
 *      summary: "get payment statistics"
 *      description: get payment statistics.
 *
 *      responses:
 *        '200':
 *          description: "return statistics"
 *        '401':
 *          description: "Unauthorized."
 *        '404':
 *          description: "not founds"
 *        '500':
 *          description: "Internal server error."
 */
 router.get(
    '/programs',
    requireAuth,
    permissions.roleAuthorization(),
    trimRequest.all,
    controller.getProgramsStatistics
)

module.exports = router
