const express = require('express')
const passport = require('passport')
const trimRequest = require('trim-request')
const controller = require('../controllers/phone')
const validate = require('../controllers/phone.validate')

const router = express.Router()
require('../config/passport')

const requireAuth = passport.authenticate('jwt', {
    session: false
})

/*
 * phone routes
 */

/**
 * @swagger
 * /phone:
 *    post:
 *      tags:
 *        - phones
 *      summary: "create new phone for user"
 *      description: "create new phone for user"
 *      responses:
 *        '200':
 *          description: "return phone created"
 *        '404':
 *          description: "not found"
 *        '422':
 *          description: "error validate"
 *      parameters:
 *       
 *        - body: id
 *        - name: id
 *        - name: id
 * 
 *          in: query
 *          description: "id of user"
 *          required: true
 *          schema:
 *            type: number
 *            format: number
 *    responses:
 *      '200':
 *        description: "return user"
 */

router.post(
    '/',
   // requireAuth,
    trimRequest.all,
    validate.createItem,
    controller.createItem
)

/**
 * @swagger
 * /phone/{id}:
 *    get:
 *      tags:
 *        - phones
 *      summary: "search phone for id"
 *      description: "search user for id"
 *      responses:
 *        '200':
 *          description: "return user"
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
 *        description: "return user"
 */
router.get(
    '/:id',
   // requireAuth,
    trimRequest.all,
    validate.getItem,
    controller.getItem
)

/**
 * @swagger
 * /phone:
 *    get:
 *      tags:
 *        - users
 *      summary: "get all users"
 *      description: "get all users"
 *      responses:
 *        '200':
 *          description: "return users"
 *        '404':
 *          description: "not founds"
 *    responses:
 *      '200':
 *        description: "return users"
 */
router.get(
    '/',
   // requireAuth,
   // trimRequest.all,
    controller.getItems
)

/**
 * @swagger
 * /phone/{id}:
 *    patch:
 *      tags:
 *        - users
 *      summary: "update user for id"
 *      description: "search user and update"
 *      responses:
 *        '200':
 *          description: "return user updated."
 *        '404':
 *          description: "Not found"
 *        '422':
 *          description: "Validation error in any of the fields entered."
 *      parameters:
 *        - name: id
 *          in: query
 *          description: "id of user"
 *          required: true
 *          schema:
 *            type: number
 *            format: number
 *        -  in: "body"
 *           name: "body"
 *           description: "parameters required to insert user."
 *           required: true
 *           schema:
 *                $ref: "#/definitions/users"
 *    responses:
 *      '200':
 *        description: "return user updated."
 */
router.patch(
    '/:id',
    requireAuth,
    trimRequest.all,
    validate.updateItem,
    controller.updateItem
)

/**
 * @swagger
 * /phone/{id}:
 *    delete:
 *      tags:
 *        - users
 *      summary: "delete user for id"
 *      description: "delete user for id"
 *      responses:
 *        '200':
 *          description: "message deleted"
 *        '404':
 *          description: "not found"
 *        '422':
 *          description: "error of validate."
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
 *        description: "message deleted"
 */
router.delete(
    '/:id',
    requireAuth,
    trimRequest.all,
    validate.deleteItem,
    controller.deleteItem
)

module.exports = router
