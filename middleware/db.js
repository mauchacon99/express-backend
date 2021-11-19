const { Op } = require("sequelize")
const utils = require("./utils")
const _ = require("lodash")
const { userevents } = require('../models')

const notFoundErr = utils.buildErrObject(404, 'NOT_FOUND')

/*
* Private functions
* */

/**
 * Builds initial options for query
 * @param {Object} query - query object
 */
const listInitOptions = (query) => {
    // console.log(query)
    return new Promise((resolve) => {
        const order = [[query.sort || 'createdAt', query.order || 'DESC']]
        const limit = parseInt(query.limit, 10) || 10
        const offset = (parseInt(query.page, 10) - 1) * limit || 0
        resolve({
            order,
            offset,
            limit
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
            if (
                typeof query.filter !== 'undefined' &&
                typeof query.relations !== 'undefined'
            ) {
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
            ...await listInitOptions(req.query),
            where: {[Op.or]: data}
        }
    }
    return { ...await listInitOptions(req.query) }
}

/*
* Public functions
* */

/**
 * create object for search in single table
 * @param {Object} item - response items
 * @param {Object} options - options filter
 */
exports.respOptions = (item, options) => {
    return {
        docs: item.rows,
        totalDocs: item.count,
        page: Math.ceil((options.offset + 1) / options.limit),
        totalPages: Math.ceil(item.count / options.limit)
    }
}

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
 * get users by filter: without admin and if vendor
 * @param {Object} query - params of the request example req.query
 * @param {Object} userId - id of user to search
 */
exports.checkQueryUserEvent = async (query, userId) => {
    const queryRelations = await checkQueryStringRelations(query)
    const queryFields = await this.checkQueryString(query)
    let data = []
    if (!_.isEmpty(queryRelations)) _.map(queryRelations, e => data.push(e))
    if (!_.isEmpty(queryFields)) _.map(queryFields, e => data.push(e))
    if (!_.isEmpty(data)) {
        return {
            ...await listInitOptions(query),
            where: {
                [Op.or]: data,
                [Op.and]: [{ userId }],
            }
        }
    }
    return {
        ...await listInitOptions(query),
        where: { userId }
    }
}

/**
 * Filters the items by userId except if the roleId is 1 (admin)
 * @param {Object} query - params of the request example req.query
 * @param {Object} user - user to search
 */
exports.checkQueryWhereUserIdExceptIfAdmin = async (query, user) => {
    const queryRelations = await checkQueryStringRelations(query)
    const queryFields = await this.checkQueryString(query)
    const userIdFilter = user.roleId === 1 ? {} : { userId: user.id };
    let data = []
    if (!_.isEmpty(queryRelations)) _.map(queryRelations, e => data.push(e))
    if (!_.isEmpty(queryFields)) _.map(queryFields, e => data.push(e))
    if (!_.isEmpty(data)) {
        return {
            ...await listInitOptions(query),
            where: {
                [Op.or]: data,
                [Op.and]: [userIdFilter],
            }
        }
    }
    return {
        ...await listInitOptions(query),
        where: userIdFilter
    }
}

/**
 * Filters the invitations by userId except if the roleId is 1 (admin)
 * @param {Object} query - params of the request example req.query
 * @param {Object} user - user to search
 */
exports.checkQueryInvitationExceptIfAdmin = async (query, user) => {
    const queryRelations = await checkQueryStringRelations(query)
    const queryFields = await this.checkQueryString(query)
    const userIdFilter = user.roleId === 1
        ? {}
        : {
            [Op.or]: [
                { from: user.id },
                { to: user.id }
            ]
        };
    let data = []
    if (!_.isEmpty(queryRelations)) _.map(queryRelations, e => data.push(e))
    if (!_.isEmpty(queryFields)) _.map(queryFields, e => data.push(e))
    if (!_.isEmpty(data)) {
        return {
            ...await listInitOptions(query),
            where: {
                [Op.or]: data,
                [Op.and]: [userIdFilter],
            }
        }
    }
    return {
        ...await listInitOptions(query),
        where: userIdFilter
    }
}



/**
 * get users by filter: without admin and if vendor
 * @param {Object} query - params of the request example req.query
 * @param {Object} user - user logged
 */
exports.checkQueryUser = async (query, user) => {
    let queryAnd = [
        { roleId: { [Op.ne]: 1 } }
    ]
    if(query.vendor && user.roleId === 3) {
        const {vendor, ...queryParams} = query
        queryAnd = [
            ...queryAnd,
            {vendor: user.id}
        ]
        query = queryParams
    } else if(user.roleId === 1) queryAnd =[]
    const queryRelations = await checkQueryStringRelations(query)
    const queryFields = await this.checkQueryString(query)
    let data = []
    if (!_.isEmpty(queryRelations)) _.map(queryRelations, e => data.push(e))
    if (!_.isEmpty(queryFields)) _.map(queryFields, e => data.push(e))
    if (!_.isEmpty(data)) {
        return {
            ...await listInitOptions(query),
            where: {
                [Op.or]: data,
                [Op.and]: queryAnd,
            }
        }
    }
    return { ...await listInitOptions(query) }
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
 * @param {Object} event - object { userId, event}
 */
exports.getItems = async (req, model, query, event) => {
    const options = await checkQueryWithoutRelations(req, query)
    return new Promise((resolve, reject) => {
        model.findAndCountAll(options)
            .then(item => {
                if(!item) reject(notFoundErr)
                else {
                this.saveEvent(event)
                    resolve(this.respOptions(item, options))
                }
            })
            .catch(() => reject(notFoundErr))
    })
}

/**
 * Gets item from database by id
 * @param {string} id - item id
 * @param {Object} model - model of db
 * @param {Object} event - object { userId, event}
 */
exports.getItem = (id, model, event) => {
    return new Promise((resolve, reject) => {
        model.findByPk(id)
        .then(item => {
            if(!item) reject(notFoundErr)
            else {
                this.saveEvent(event)
                resolve(item)
            }
        })
        .catch(() => reject(notFoundErr))
    })
}

/**
 * Creates a new item in database
 * @param {Object} req - request object
 * @param {Object} model - model of db
 * @param {Object} event - object { userId, event}
 */
exports.createItem = (req, model, event) => {
    return new Promise((resolve, reject) => {
        model.create(req)
            .then(item => {
                if(!item) reject(utils.buildErrObject(400, 'NOT_CREATED'))
                else {
                this.saveEvent(event)
                    resolve(item)
                }
            })
            .catch(() => reject(utils.buildErrObject(400, 'NOT_CREATED')))
    })
}

/**
 * Updates an item in database by id
 * @param {number} id - item id
 * @param {Object} model - model of db
 * @param {Object} req - request object
 * @param {Object} event - object { userId, event}
 */
exports.updateItem = (id, model, req, event) => {
    return new Promise((resolve, reject) => {
        model.update(req, { where: { id } })
            .then(item => {
                if(!item) reject(utils.buildErrObject(400, 'NOT_UPDATED'))
                else {
                    this.saveEvent(event)
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
 * @param {Object} event - object { userId, event}
 */
exports.deleteItem = (id, model, event) => {
    return new Promise((resolve, reject) => {
        model.destroy({ where: { id } })
            .then(() => {
                this.saveEvent(event)
                resolve({message: 'deleted'})
            })
            .catch(() => reject(notFoundErr))
    })
}

/**
 * Save event
 * @param {Object} event - object { userId, event}
 */
exports.saveEvent = (event) => userevents.create(event).then(() => null)
