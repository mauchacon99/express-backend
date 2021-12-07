const express = require('express')
const trimRequest = require('trim-request')
const controller = require('../controllers/media')
const validate = require('../controllers/media.validate')
const router = express.Router()

/*
 * media routes
 */

/**
 * @swagger
 * /media/{id}:
 *    get:
 *      tags:
 *        - media
 *      summary: "search file for name file"
 *      description: "search file for name file"
 *      responses:
 *        '200':
 *          description: "return file"
 *        '404':
 *          description: "not found"
 *        '422':
 *          description: "Validation error in any of the fields entered or a field is missing."
 *        '500':
 *          description: "Internal server error."
 *      parameters:
 *        - name: id
 *          in: query
 *          description: "name of file"
 *          required: true
 *          schema:
 *            type: string
 *            format: string
 */
router.get(
    '/:id',
    trimRequest.all,
    validate.getItem,
    controller.getItem
)

module.exports = router
