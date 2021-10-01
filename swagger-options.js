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
            },
            userEvent: {
                type: 'object',
                required: [
                    'userId',
                    'event',
                    'createdAt',
                    'updateAt'
                ],
                properties: {
                    userId: { type: 'number' },
                    event: { type: 'string' },
                    createdAt: { type: 'datetime' },
                    updateAt: { type: 'datetime' }
                },
                example: {
                    id:1,
                    userId: 1,
                    event: 'test event',
                    createdAt: '2021-10-01 13:48:33',
                    updateAt: '2021-10-01 13:48:33'
                }
            },

        
            phones: {
                type: 'object',
                required: [
                    'userId',
                    'number',
                    'internationalNumber',
                    'nationalNumber',
                    'countryCode',
                    'dialCode'
                ],
                properties: {
                    userId: { type: 'number' },
                    number: { type: 'string' },
                    internationalNumber:{type: 'string'},
                    nationalNumber:{type: 'string'},
                    countryCode:{type: 'string'},
                    dialCode:{type: 'string'},
                    
                },
                example: {
                    userId: 1,
                    number: '3112123658',
                    internationalNumber:'+57 3112123658',
                    nationalNumber:'311 2123658',
                    countryCode:'CO',
                    dialCode:'+57',
                   
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
