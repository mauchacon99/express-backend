const express = require('express')
const passport = require('passport')
const trimRequest = require('trim-request')
const controller = require('../controllers/storage')
const validate = require('../controllers/storage.validate')
const permissions = require("../middleware/permissions");

const router = express.Router()
require('../config/passport')

const requireAuth = passport.authenticate('jwt', {
    session: false
})

/**
 * @swagger
 * /storage:
 *    get:
 *      tags:
 *        - storage
 *      summary: "get all storages"
 *      description: "get all storages"
 *      responses:
 *        '200':
 *          description: "return storages"
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
 * /storage:
 *    post:
 *      tags:
 *        - storage
 *      summary: "new file multimedia"
 *      consumes:
 *        - multipart/form-data
 *      description: "new file multimedia"
 *      responses:
 *        '201':
 *          description: "return storage created"
 *        '400':
 *          description: "Created failed."
 *        '401':
 *          description: "Unauthorized."
 *        '422':
 *          description: "Validation error in any of the fields entered or a field is missing."
 *        '500':
 *          description: "Internal server error."
 *      parameters:
 *        - in: formData
 *          name: files[]
 *          type: file
 *          required: true
 *          description: "files to be stored, keep in mind that it must be a multimedia format"
 */
router.post(
    '/',
    // requireAuth,
    trimRequest.all,
    controller.upload.array('files[]'),
    // validate.createItem,
    controller.createItem
)


/**
 * @swagger
 * /storage/{id}:
 *    get:
 *      tags:
 *        - storage
 *      summary: "search file for id"
 *      description: "search file for id"
 *      responses:
 *        '200':
 *          description: "return file"
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
 *          description: "id of file"
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
 * /storage/{id}:
 *    delete:
 *      tags:
 *        - storage
 *      summary: "delete file for id"
 *      description: "delete file for id"
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
 *          description: "id of module"
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
