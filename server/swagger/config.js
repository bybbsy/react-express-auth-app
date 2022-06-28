const swaggerJsDoc = require('swagger-jsdoc')

const options = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'JWT Server',
            description: 'This server was created to practice jwt-authorization and authentication with express js',
            version: '1.0.0',
        },
        servers: [
            {
                url: 'http://localhost:3000/api',
                description: 'A server for testing JWT auth API'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            },
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        email: {
                            type: 'string',
                            required: true
                        },
                        password: {
                            type: 'string',
                            required: true
                        }
                    }
                },
                Token: {
                    type: 'object',
                    properties: {
                        user: {
                            $ref: '#/components/schemas/User'
                        },
                        refreshToken: {
                            type: 'string',
                            required: true
                        }
                    }
                },
                Card: {
                    type: 'object',
                    properties: {
                        title: {
                            type: 'string'
                        },
                        description: {
                            type: 'string'
                        },
                        imageUrl: {
                            type: 'string'
                        },
                        tags: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    name: {
                                        type: 'string'
                                    }
                                }
                            }
                        }
                    }
                },
                Error: {
                    type: 'object',
                    properties: {
                        status: {
                            type: 'integer'
                        },
                        message: {
                            type: 'string'
                        }
                    }
                }
            }
        },
    },
    apis: [
        './routes/*.js'
    ],

}

const config = swaggerJsDoc(options)
console.log(config)
module.exports = config