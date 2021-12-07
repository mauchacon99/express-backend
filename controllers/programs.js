const { matchedData } = require('express-validator')
const {Sequelize} = require("sequelize")
const { program, subprogram, user, storage, plan, subscriber } = require('../models')
const utils = require('../middleware/utils')
const db = require('../middleware/db')

/********************
 * Private functions *
 ********************/

/**
 * Get items of logged in user, function called by route
 * @param {Object} req - request object
 * @param {number} id - id of program
 */
const validateViewSubprogram = async (req, id) => {
    let shouldIncludeSubprograms = false
    if (req.user.roleId === 4 || req.user.roleId === 5) {
        const _res = await subscriber.findAndCountAll({
            where: Sequelize.literal(`subscriber.planId IN (SELECT p.id FROM plans as p WHERE p.programId = ${id}) AND subscriber.userId = ${req.user.id}`),
        })
        shouldIncludeSubprograms = (_res.count > 0)
    } else {
        const pro = await program.findByPk(id)
        if(pro)
         shouldIncludeSubprograms = (pro.userId === req.user.id || pro.userId === req.user.vendor || req.user.roleId === 1)
    }

    const include = [
        {
            model: user,
            as: 'userPR',
            attributes: {
                exclude: ['password', 'verification', 'verified', 'forgotPassword']
            }
        },
        {
            model: storage,
            as: 'storagePR'
        },
        {
            model: plan,
            as: 'programPL'
        },
    ]

    // When Role is Company or Personal, only if the user
    // is subscribed to any plan of this program, then it
    // includes the respective subprograms.
    if (shouldIncludeSubprograms) {
        include.push({
            model: subprogram,
            as: 'programSP'
        })
    }
    return include
}

/********************
 * Public functions *
 ********************/

/**
 * Get items of logged in user, function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.getItems = async (req, res) => {
    try {
        const query = await db.checkQueryWhereUserIdExceptIfAdmin(req.query, req.user)
        const data = await program.findAndCountAll({
            ...query,
            attributes:  {
                include: [
                    [Sequelize.literal("(SELECT COUNT(plans.id) FROM plans WHERE (plans.programId = `program`.`id`))"), "plans"],
                    [Sequelize.literal("(SELECT COUNT(subprograms.id) FROM subprograms WHERE (subprograms.programId = `program`.`id`))"), "subprograms"],
                ]
            },
            include: [
                {
                    model: user,
                    as: 'userPR',
                    attributes: {
                        exclude: ['password', 'verification', 'verified', 'forgotPassword']
                    }
				},
				{
                    model: storage,
                    as: 'storagePR'
                },
            ]
		})

        db.saveEvent({userId: req.user.id, event: 'get_all_programs'})
        res.status(200).json(db.respOptions(data, query))
    } catch (error) {
        utils.handleError(res, utils.buildErrObject(404, 'NOT_FOUND'))
    }
}

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.getAllItems = async (req, res) => {
    try {
        const query = await db.checkQuery(req.query)
        const data = await program.findAndCountAll({
            ...query,
            attributes:  {
                include: [
                    [Sequelize.literal("(SELECT COUNT(plans.id) FROM plans WHERE (plans.programId = `program`.`id`))"), "plans"],
                    [Sequelize.literal("(SELECT COUNT(subprograms.id) FROM subprograms WHERE (subprograms.programId = `program`.`id`))"), "subprograms"],
                ]
            },
            include: [
                {
                    model: user,
                    as: 'userPR',
                    attributes: {
                        exclude: ['password', 'verification', 'verified', 'forgotPassword']
                    }
				},
				{
                    model: storage,
                    as: 'storagePR'
                },
            ]
		})

        db.saveEvent({userId: req.user.id, event: 'get_all_programs'})
        res.status(200).json(db.respOptions(data, query))
    } catch (error) {
        utils.handleError(res, utils.buildErrObject(404, 'NOT_FOUND'))
    }
}

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.getItemsHome = async (req, res) => {
    try {
        const query = await db.checkQuery(req.query)
        const data = await program.findAndCountAll({
            ...query,
            attributes:  {
                include: [
                    [Sequelize.literal("(SELECT COUNT(plans.id) FROM plans WHERE (plans.programId = `program`.`id`))"), "plans"],
                    [Sequelize.literal("(SELECT COUNT(subprograms.id) FROM subprograms WHERE (subprograms.programId = `program`.`id`))"), "subprograms"],
                ]
            },
            include: [
                {
                    model: user,
                    as: 'userPR',
                    attributes: {
                        exclude: ['password', 'verification', 'verified', 'forgotPassword']
                    }
                },
                {
                    model: storage,
                    as: 'storagePR'
                },
            ]
        })

        res.status(200).json(db.respOptions(data, query))
    } catch (error) {
        utils.handleError(res, utils.buildErrObject(404, 'NOT_FOUND'))
    }
}

/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.getItem = async (req, res) => {
    try {
        const { id } = matchedData(req)
        const include = await validateViewSubprogram(req, id)

        program.findOne({
            where:{id},
            include
        })
            .then((data) => {
                if(!data) utils.handleError(res, utils.buildErrObject(404, 'NOT_FOUND'))
                else {
                    db.saveEvent({userId: req.user.id, event: `get_program_${id}`})
                    res.status(200).json(data)
                }
            })
            .catch(() => {
                utils.handleError(res, utils.buildErrObject(404, 'NOT_FOUND'))
            })
    } catch (error) {
        utils.handleError(res, error)
    }
}

/**
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.updateItem = async (req, res) => {
    try {
        const { id } = req
        const event = {
            userId: req.user.id,
            event: `update_program_${id}`
        }
        req = matchedData(req)
        res.status(201).json(await db.updateItem(req.id, program, req, event))
    } catch (error) {
        utils.handleError(res, error)
    }
}

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.createItem = async (req, res) => {
    try {
        const event = {
            userId: req.user.id,
            event: `new_program`
        }
        if(req.user.vendor) utils.handleError(res, utils.buildErrObject(401, 'UNAUTHORIZED'))
        req = matchedData(req)
        res.status(201).json(await db.createItem(req, program, event))
    } catch (error) {
        utils.handleError(res, error)
    }
}

/**
 * Delete item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.deleteItem = async (req, res) => {
    try {
        const event = {
            userId: req.user.id,
            event: `delete_program`
        }
        const { id } = matchedData(req)
        res.status(200).json(await db.deleteItem(id, program, event))
    } catch (error) {
        utils.handleError(res, error)
    }
}
