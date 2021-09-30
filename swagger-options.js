/* eslint-disable max-len */
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'enligthneering (Documentation)',
            description: 'Api for enligthneering',
            contact: {
                name: 'Developer'
            },
            servers: [
                `http://localhost:${process.env.PORT}`
            ]
        },
        schemes: ['http'],
        securityDefinitions: {
            APIKeyHeader: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization'
            }
        },
        security: [
            { APIKeyHeader: [] }
        ],
        definitions: {
            authRegister: {
                type: 'object',
                required: [
                    'name',
                    'email',
                    'password',
                    'roleId'
                ],
                properties: {
                    name: { type: 'string' },
                    email: { type: 'string' },
                    password: { type: 'string' },
                    roleId: { type: 'number' },
                    lastname: { type: 'string' },
                },
                example: {
                    name: 'user',
                    email: 'user1@user.com',
                    password: '123456',
                    roleId: 'admin',
                    lastname: "test"
                }
            },
            authLogin: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                    email: { type: 'string' },
                    password: { type: 'string' }
                },
                example: {
                    email: 'user@user.com',
                    password: '12345'
                }
            },
            users: {
                type: 'object',
                required: [
                    'name',
                    'email',
                    'password',
                    'roleId'
                ],
                properties: {
                    name: { type: 'string' },
                    email: { type: 'string' },
                    password: { type: 'string' },
                    roleId: { type: 'number' },
                    lastname: { type: 'string' },
                },
                example: {
                    name: 'user',
                    email: 'user1@user.com',
                    password: '123456',
                    roleId: 1,
                    lastname: "test"
                }
            },
            roles: {
                type: 'object',
                required: [
                    'name'
                ],
                properties: {
                    name: { type: 'string' },
                    description: { type: 'string' }
                },
                example: {
                    name: 'admin',
                    description: 'role admin',
                }
            }
        }
    },
    // routers
    apis: ['./routes/*.js']
}
const swaggerDocs = swaggerJsDoc(swaggerOptions)

module.exports = (app = {}) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
}
