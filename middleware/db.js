const utils = require("./utils");

/**
 * Gets items from database
 * @param {Object} req - request object
 * @param {Object} model - model of db
 */
exports.getItems = (req, model) => {
    return new Promise((resolve, reject) => {
        model.findAll({})
            .then(item => {
                !item
                    ? reject(utils.itemNotFound({message: 'error not found'}, item, 'NOT_FOU)ND'))
                    : resolve(item)
            })
            .catch(() => reject(utils.itemNotFound({message: 'error not found'}, null, 'NOT_FOUND')))
    })
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
                ? reject(utils.itemNotFound({message: 'error not found'}, item, 'NOT_FOUND'))
                : resolve(item)
        })
        .catch(() => reject(utils.itemNotFound({message: 'error not found'}, null, 'NOT_FOUND')))
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
                    ? reject(utils.itemNotFound({message: 'error create'}, item, 'NOT_CREATED'))
                    : resolve(item)
            })
            .catch(() => reject(utils.itemNotFound({message: 'error create'}, null, 'NOT_CREATED')))
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
                if(!item) reject(utils.itemNotFound({message: 'error update'}, item, 'NOT_UPDATED'))
                else {
                    model.findOne({ where: { id } }).then(res => resolve(res))
                }
            })
            .catch(() => reject(utils.itemNotFound({message: 'error update'}, null, 'NOT_UPDATED')))
    })
}

/**
 * Deletes an item from database by id
 * @param {string} id - id of item
 * @param {Object} model - model of db
 */
exports.deleteItem =(id, model) => {
    return new Promise((resolve, reject) => {
        model.destroy({ where: { id } })
            .then(() => {
                resolve({message: 'deleted'})
            })
            .catch(() => reject(utils.itemNotFound({message: 'error  not exist'}, null, 'DOES_NOT_EXIST')))
    })
}
