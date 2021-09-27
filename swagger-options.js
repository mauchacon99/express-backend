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
                    'password'
                ],
                properties: {
                    name: { type: 'string' },
                    email: { type: 'string' },
                    password: { type: 'string' }
                },
                example: {
                    name: 'user test',
                    email: 'user1@user.com',
                    password: '123456'
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
                    'password'
                ],
                properties: {
                    name: {
                        type: 'string'
                    },
                    email: {
                        type: 'string'
                    },
                    password: {
                        type: 'string'
                    }
                }
            },
        }
    },
    // routers
    apis: ['./routes/*.js']
}
const swaggerDocs = swaggerJsDoc(swaggerOptions)

module.exports = (app = {}) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
}
