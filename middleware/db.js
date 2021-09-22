const utils = require("./utils");

/**
 * Gets items from database
 * @param {Object} req - request object
 * @param {Object} model - model of db
 * @param {Object} query - query object
 */
exports.getItems = (req, model, query) => {
    return new Promise((resolve, reject) => {
        model.findAll({})
            .then(item => {
                !item
                    ? utils.itemNotFound({message: 'error not found'}, item, reject, 'NOT_FOUND')
                    : resolve(item)
            })
            .catch(() => utils.itemNotFound({message: 'error not found'}, item, reject, 'NOT_FOUND'))
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
                ? utils.itemNotFound({message: 'error not found'}, item, reject, 'NOT_FOUND')
                : resolve(item)
        })
        .catch(() => utils.itemNotFound({message: 'error not found'}, item, reject, 'NOT_FOUND'))
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
                    ? utils.itemNotFound({message: 'error create'}, item, reject, 'NOT_CREATED')
                    : resolve(item)
            })
            .catch(() => utils.itemNotFound({message: 'error create'}, item, reject, 'NOT_CREATED'))
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
                !item
                    ? utils.itemNotFound({message: 'error update'}, item, reject, 'NOT_UPDATED')
                    : resolve(item)
            })
            .catch(() => utils.itemNotFound({message: 'error update'}, item, reject, 'NOT_UPDATED'))
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
            .then(item => {
                resolve(item)
            })
            .catch(() => utils.itemNotFound({message: 'error  not exist'}, item, reject, 'DOES_NOT_EXIST'))
    })
}
