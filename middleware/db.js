const { Op } = require("sequelize");
const utils = require("./utils");
const _ = require("lodash");

const notFoundErr = utils.buildErrObject(404, 'NOT_FOUND')

/*
* Private functions
* */

/**
 * Builds initial options for query
 * @param {Object} query - query object
 */
const listInitOptions = (query) => {
    return new Promise((resolve) => {
        const order = [[query.sort || 'createdAt', query.order || 'DESC']]
        const page = parseInt(query.page, 10) || 1
        const paginate = parseInt(query.limit, 10) || 10
        resolve({
            order,
            page,
            paginate
        })
    })
}

/**
 * create object for search in single table
 * @param {Object} query - params of the request example req.query
 */
const checkQueryStringRelations = (query) => {
    return new Promise((resolve, reject) => {
        try {
            if (typeof query.relations !== 'undefined') {
                const array = []
                const arrayRelations = query.relations.split(',')
                arrayRelations.map((item) => {
                    array.push({
                        [`$${item}$`]: {
                            [Op.like]: `%${query.filter}%`
                        }
                    })
                })
                resolve(array)
            } else {
                resolve({})
            }
        } catch (err) {
            console.log(err.message)
            reject(utils.buildErrObject(422, 'ERROR_WITH_FILTER_RELATIONS'))
        }
    })
}

/**
 * Parse all checks without relations
 * @param {Object} req - request object
 * @param {Object} query - query
 */
const checkQueryWithoutRelations = async (req, query) => {
    let data = []
    if (!_.isEmpty(query)) _.map(query, e => data.push(e))
    if (!_.isEmpty(data)) {
        return {
            ...await listInitOptions(req),
            where: {[Op.or]: data}
        }
    }
    return { ...await listInitOptions(req) }
}

/*
* Public functions
* */

/**
 * create object for search in single table
 * @param {Object} query - params of the request example req.query
 */
exports.checkQueryString= (query) => {
    return new Promise((resolve, reject) => {
        try {
            if (
                typeof query.filter !== 'undefined'
                && typeof query.fields !== 'undefined'
            ) {
                const array = []
                // Takes fields param and builds an array by splitting with ','
                const arrayFields = query.fields.split(',')
                // Adds SQL Like %word% with regex
                arrayFields.map((item) => {
                    array.push({
                        [item]: {
                            [Op.like]: `%${query.filter}%`
                        }
                    })
                })
                // Puts array result in data
                resolve(array)
            } else {
                resolve({})
            }
        } catch (err) {
            console.log(err.message)
            reject(utils.buildErrObject(422, 'ERROR_WITH_FILTER'))
        }
    })
}

/**
 * Parse all checks
 * @param {Object} query - query
 */
exports.checkQuery = async (query) => {
    const queryRelations = await checkQueryStringRelations(query)
    const queryFields = await this.checkQueryString(query)
    let data = []
    if (!_.isEmpty(queryRelations)) _.map(queryRelations, e => data.push(e))
    if (!_.isEmpty(queryFields)) _.map(queryFields, e => data.push(e))
    if (!_.isEmpty(data)) {
        return {
            ...await listInitOptions(query),
            where: {[Op.or]: data}
        }
    }
    return { ...await listInitOptions(query) }
}

/**
 * Gets items from database
 * @param {Object} req - request object
 * @param {Object} model - model of db
 * @param {Object} query - model of db
 */
exports.getItems = async (req, model, query) => {
    const options = await checkQueryWithoutRelations(req, query)
    return new Promise((resolve, reject) => {
        model.findAll(options)
            .then(item => {
                !item
                    ? reject(notFoundErr)
                    : resolve(item)
            })
            .catch(() => reject(notFoundErr))
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
