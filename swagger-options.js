/* eslint-disable max-len */
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'enligthneering (Documentation)',
            description: 'Api for enligthneering\n\n Example filters (only method get all) this query params are optionals.' +
                `
                
                // this is in endpoints without relations
                /users?fields=name,email&filter=user@user.com&sort=createdAt&page=1&limit=10&order=ASC
                
                // this is in endpoints with relations (relation must be call with alias)
                /users?fields=name,email&relations=roleU.name&filter=user@user.com&sort=createdAt&page=1&limit=10&order=DESC
            `,
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
            authVerify: {
                type: 'object',
                required: ['id'],
                properties: { id: { type: 'string' } }
            },
            authForgot: {
                type: 'object',
                required: ['email'],
                properties: { email: { type: 'string' } }
            },
            authReset: {
                type: 'object',
                required: ['id', 'password'],
                properties: {
                    id: { type: 'number' },
                    password: { type: 'string' }
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
                    methods: { type: 'array' },
                    route: { type: 'string' },
                    icon: { type: 'string' }
                },
                example: {
                    name: 'users',
                    status: true,
                    methods: ['get','post','delete','patch'],
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
                    methods: { type: 'array' }
                },
                example: {
                    roleId: 1,
                    moduleId: 2,
                    status: true,
                    methods: ['get','post','delete','patch']
                }
            },
            locations: {
                type: 'object',
                required: [
                    'userId',
                    'lat',
                    'lng',
                    'address'
                ],
                properties: {
                    userId: { type: 'number' },
                    lat: { type: 'string' },
                    lng: { type: 'string' },
                    address: { type: 'string' },
                    cityName: { type: 'string' },
                    countryName: { type: 'string' },
                    countryCode: { type: 'string' }
                },
                example: {
                    userId: 1,
                    lat: '4.6545875',
                    lng: '-74.1009379',
                    address: 'Br. La Esmeralda, Teusaquillo, Bogotá, Colombia',
                    cityName: 'Bogotá',
                    countryName: 'Colombia',
                    countryCode: 'co'
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
                    internationalNumber: { type: 'string' },
                    nationalNumber: { type: 'string' },
                    countryCode: { type: 'string' },
                    dialCode: { type: 'string' },
                },
                example: {
                    userId: 1,
                    number: '3112123658',
                    internationalNumber: '+57 311 2123658',
                    nationalNumber: '311 2123658',
                    countryCode: 'CO',
                    dialCode: '+57',
                    createdAt: new Date(),
                    updatedAt: new Date(),
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
