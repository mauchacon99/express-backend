const db = require('../middleware/db')
const { UserEvent } = require('../models')

/**
 * Create new event in table userEvent
 * @param {int} userId - Id from models User
 * @param {string} event - type event
 */

module.exports = async function CreateUserEvent(userId,event){
    try {
        req = {
            userId,
            event,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        const { dataValues } = await db.createItem(req, UserEvent)
        return dataValues
    } catch (error) {
        utils.handleError(res, error)
    }
}
