const { matchedData } = require('express-validator')
const utils = require("../middleware/utils");

/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.getPlace = async (req, res) => {
    try {
        req = matchedData(req)
        res.status(200).json({msg: req})
    } catch (error) {
        utils.handleError(res, error)
    }
}
