const { matchedData } = require('express-validator')
const utils = require("../middleware/utils");
const apiKey = process.env.API_KEY_GOOGLE
const GooglePlaces = require('google-places');
const places = new GooglePlaces(apiKey);

const getDetail = (a) => {
    return new Promise((resolve, reject) => {
        places.details({reference: a.reference}, (err, res) => {
            if(err) reject(err)
                else resolve(res)
        });
    })
}
/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.getPlace = async (req, res) => {
    try {
        const { input } = matchedData(req)
        let data = []
        places.autocomplete({input, types: "(cities)"}, async (err, response) => {
            if (err)
                utils.handleError(res, utils.buildErrObject(404, 'NOT_FOUND_PLACE'))
            else {
                for(const index in response.predictions) {
                    data.push(await getDetail(response.predictions[index]))
                }
                // response.predictions.map(async (a) => )
                res.status(200).json(data)
            }
        })
    } catch (error) {
        console.log(error)
        utils.handleError(res, utils.buildErrObject(404, 'NOT_FOUND_PLACE'))
    }
}
