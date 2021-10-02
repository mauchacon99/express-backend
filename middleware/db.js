const { Op } = require("sequelize");
const utils = require("./utils");

/*
* Private functions
* */

const notFoundErr = utils.buildErrObject(404, 'NOT_FOUND')

/*
* Public functions
* */

/**
 * Gets items from database
 * @param {Object} req - request object
 * @param {Object} model - model of db
 */
exports.getItems = (req, model) => {
    return new Promise((resolve, reject) => {
        model.findAll(filter(req))
            .then(item => {
                !item
                    ? reject(notFoundErr)
                    : resolve(item)
            })
            .catch(() => reject(notFoundErr))
    })
}


/**
 * create object for search in single table
 * @param {string} params - params of the request example req.query
 */

function filter(params){
    const filter = ((params.filter).split(","))[0]
    const fields = []
    const arrayFields = (params.fields).split(",")

    arrayFields.forEach(element => {
        fields.push(
            {
                [element]:filter
            }
        )
    });

    return {
        where:{
            [Op.or]:[
                fields
            ]
        }
    }
}




/**
 * Gets item from database by id
 * @param {string} id - item id
 * @param {Object} model - model of db
 */
exports.getItem = (id, model) => {
    return new Promise((resolve, reject) => {
        model.findByPk(id)
        .then(item => {
            !item
                ? reject(notFoundErr)
                : resolve(item)
        })
        .catch(() => reject(notFoundErr))
    })
}

/**
 * Creates a new item in database
 * @param {Object} req - request object
 * @param {Object} model - model of db
 */
exports.createItem = (req, model) => {
    return new Promise((resolve, reject) => {
        model.create(req)
            .then(item => {
                !item
                    ? reject(utils.buildErrObject(400, 'NOT_CREATED'))
                    : resolve(item)
            })
            .catch(() => reject(utils.buildErrObject(400, 'NOT_CREATED')))
    })
}

/**
 * Updates an item in database by id
 * @param {string} id - item id
 * @param {Object} model - model of db
 * @param {Object} req - request object
 */
exports.updateItem = (id, model, req) => {
    return new Promise((resolve, reject) => {
        model.update(req, { where: { id } })
            .then(item => {
                if(!item) reject(utils.buildErrObject(400, 'NOT_UPDATED'))
                else {
                    model.findOne({ where: { id } }).then(res => resolve(res))
                }
            })
            .catch(() => reject(utils.buildErrObject(400, 'NOT_UPDATED')))
    })
}

/**
 * Deletes an item from database by id
 * @param {string} id - id of item
 * @param {Object} model - model of db
 */
exports.deleteItem = (id, model) => {
    return new Promise((resolve, reject) => {
        model.destroy({ where: { id } })
            .then(() => {
                resolve({message: 'deleted'})
            })
            .catch(() => reject(notFoundErr))
    })
}
