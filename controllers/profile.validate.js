const { check } = require('express-validator')
const { validationResult } = require('../middleware/utils')

/**
 * Validates create new item request
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
    check('email')
        .optional(),
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
    (req, res, next) => {
        validationResult(req, res, next)
    }
]

/**
 * Validates get item request
 */
exports.changePassword = [
    check('oldPassword')
        .exists()
        .withMessage('MISSING')
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY'),
    check('newPassword')
        .exists()
        .withMessage('MISSING')
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY'),
    (req, res, next) => {
        validationResult(req, res, next)
    }
]
