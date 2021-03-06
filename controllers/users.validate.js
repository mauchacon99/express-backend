const { check } = require('express-validator')
const { validationResult } = require('../middleware/utils')

/**
 * Validates create new item request
 */
exports.createItem = [
    check('name')
        .exists()
        .withMessage('MISSING')
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY'),
    check('lastname')
        .optional(),
    check('description')
        .optional(),
    check('roleId')
        .exists()
        .withMessage('MISSING')
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY'),
    check('email')
        .exists()
        .withMessage('MISSING')
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY')
        .isEmail()
        .withMessage('EMAIL_IS_NOT_VALID'),
    check('skills')
        .optional(),
    check('preferences')
        .optional(),
    check('instagram')
        .optional(),
    check('facebook')
        .optional(),
    check('linkedin')
        .optional(),
    check('professions')
        .optional(),
    check('languages')
        .optional(),
    check('statusPayment')
        .optional(),
    check('cardToken')
        .optional(),
    (req, res, next) => {
        validationResult(req, res, next)
    }
]

/**
 * Validates update item request
 */
exports.updateItem = [
    check('name')
        .optional(),
    check('lastname')
        .optional(),
    check('description')
        .optional(),
    check('storageId')
        .optional(),
    check('roleId')
        .optional(),
    check('email')
        .optional(),
    check('id')
        .exists()
        .withMessage('MISSING')
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY'),
     check('skills')
        .optional(),
    check('preferences')
        .optional(),
    check('instagram')
        .optional(),
    check('facebook')
        .optional(),
    check('linkedin')
        .optional(),
    check('professions')
        .optional(),
    check('languages')
        .optional(),
    check('vendor')
        .optional(),
    check('statusPayment')
        .optional(),
    (req, res, next) => {
        validationResult(req, res, next)
    }
]

/**
 * Validates get item request
 */
exports.getItem = [
    check('id')
        .exists()
        .withMessage('MISSING')
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY'),
    (req, res, next) => {
        validationResult(req, res, next)
    }
]

/**
 * Validates delete item request
 */
exports.deleteItem = [
    check('id')
        .exists()
        .withMessage('MISSING')
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY'),
    (req, res, next) => {
        validationResult(req, res, next)
    }
]
