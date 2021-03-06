const { validationResult } = require('express-validator')
const slugify = require('slugify')

/**
 * Removes extension from file
 * @param {string} file - filename
 */
exports.removeExtensionFromFile = (file) => {
    return file.split('.').slice(0, -1).join('.').toString()
}

/**
 * Handles error by printing to console in development env and builds and sends an error response
 * @param {Object} res - response object
 * @param {Object} err - error object
 */
exports.handleError = (res, err) => {
    // Prints error in console
    if (process.env.NODE_ENV === 'development') {
        console.log(err)
    }
    // Sends error to user
    res.status(err.code).json({
        errors: {
            msg: err.message
        }
    })
}

/**
 * Builds error object
 * @param {number} code - error code
 * @param {string} message - error text
 */
exports.buildErrObject = (code, message) => {
    return {
        code,
        message
    }
}

/**
 * Builds error for validation files
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {Object} next - next object
 */
exports.validationResult = (req, res, next) => {
    try {
        validationResult(req).throw()
        if (req.body.email) {
            req.body.email = req.body.email.toLowerCase()
        }
        return next()
    } catch (err) {
        return this.handleError(res, this.buildErrObject(422, err.array()))
    }
}

/**
 * Replaces special chars with (-)
 * @function
 * @param {String} hash
 * @returns {String} sanitized hash
 */
exports.sanitizeHash = (hash) => {
    const _regex = /[*+~.()'"!:@/_]/g;

    return slugify(hash, {remove: _regex});
}

const _imgExts = ['.jpg', '.jpeg', '.png', '.gif', '.tiff', '.psd', '.bmp']

/**
 * Image extensions
 * @constant
 */
exports.imgExts = _imgExts

/**
 * Checks if fileType is image
 * @function
 * @param {String} fileType
 * @returns {boolean}
 */
exports.isImage = (fileType) => {
    if (!fileType) return false;
    return _imgExts.includes(fileType.trim().toLowerCase())
}
