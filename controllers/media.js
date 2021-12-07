const { matchedData } = require('express-validator')
const utils = require('../middleware/utils')
const path = require("path");
const publicPath = path.join(process.cwd(),'public/media')

/********************
 * Public functions *
 ********************/

/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.getItem = async (req, res) => {
    try {
        const { id } = matchedData(req)
        res.sendFile(path.join(publicPath, id), 'UTF-8')
    } catch (error) {
        utils.handleError(res, utils.buildErrObject(404, 'NOT_FOUND'))
    }
}
