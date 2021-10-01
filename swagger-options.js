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
                    roleId: 2,
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
                    email: 'admin@admin.com',
                    password: '123456'
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
                    roleId: 2,
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
            },
            modules: {
                type: 'object',
                required: [
                    'name',
                    'status',
                    'methods',
                    'route'
                ],
                properties: {
                    name: { type: 'string' },
                    status: { type: 'boolean' },
                    methods: { type: 'string' },
                    route: { type: 'string' },
                    icon: { type: 'string' }
                },
                example: {
                    name: 'users',
                    status: true,
                    methods: '["get","post","delete","patch"]',
                    route: '/users',
                    icon: 'icon.svg'
                }
            },
            permissions: {
                type: 'object',
                required: [
                    'roleId',
                    'moduleId',
                    'status',
                    'methods'
                ],
                properties: {
                    roleId: { type: 'number' },
                    moduleId: { type: 'number' },
                    status: { type: 'boolean' },
                    methods: { type: 'string' }
                },
                example: {
                    roleId: 1,
                    moduleId: 2,
                    status: true,
                    methods: '["get","post","delete","patch"]',
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
