const { matchedData } = require('express-validator')
const axios = require('axios');
const utils = require("../middleware/utils");
const apiKey = process.env.API_KEY_GOOGLE

/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.getPlace = async (req, res) => {
    try {
        const { input } = matchedData(req)
        const config = {
            method: 'get',
            url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&types=establishment&key=${apiKey}`,
            headers: { 'Content-Type': 'application/json' }
        };

        axios(config)
            .then(({ data }) => res.status(200).json(data))
            .catch(() => utils.handleError(res, utils.buildErrObject(404, 'NOT_FOUND_PLACE')))
    } catch (error) {
        utils.handleError(res, utils.buildErrObject(404, 'NOT_FOUND_PLACE'))
    }
}
