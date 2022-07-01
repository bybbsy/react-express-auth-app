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
        paths: {
            '/sign-in' : {
                post: {
                    description: 'Accepts user credentials to authenticate and returns access and refresh tokens',
                    summary: 'Authenticates existing user',
                    tags: [
                        'Auth API'
                    ],
                    requestBody: {
                        description: 'Accepts user credentials to sign-in user and returns access and refresh tokens, registers accessToken in db',
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
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
                                }
                            }
                        },
                    },
                    responses: {
                        200: {
                            description: 'Successful sign-in',
                            headers: {
                                'Set-Cookie': {
                                    description: 'Contains JWT refresh token (refreshToken=JWT)',
                                    type: 'string'
                                }
                            },
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            accessToken: {
                                                type: 'string'
                                            },
                                            refreshToken: {
                                                type: 'string'
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        422: {
                            description: "Invalid email or password or user doesn't exist",
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            msg: {
                                                type: 'string'
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        500: {
                            description: "Some internal server error",
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            msg: {
                                                type: 'string'
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            '/sign-up' : {
                post: {
                    description: 'Accepts user credentials to register user and returns access and refresh tokens, registers user in db',
                    summary: 'Registers a new user account',
                    tags: [
                        'Auth API'
                    ],
                    requestBody: {
                        description: 'Accepts user credentials to sign-up user and returns access and refresh tokens, registers user and accessToken in db',
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
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
                                }
                            }
                        },
                    },
                    responses: {
                        200: {
                            description: 'Successful sign-up',
                            headers: {
                                'Set-Cookie': {
                                    description: 'Contains JWT refresh token (refreshToken=JWT)',
                                    type: 'string'
                                }
                            },
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            user: {
                                                type: 'object',
                                                properties: {
                                                    email: {
                                                        type: 'string',
                                                    },
                                                    password: {
                                                        type: 'string'
                                                    }
                                                }
                                            },
                                            tokens: {
                                                type: 'object',
                                                properties: {
                                                    accessToken: {
                                                        type: 'string'
                                                    },
                                                    refreshToken: {
                                                        type: 'string'
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        422: {
                            description: "Invalid email or password or user doesn't exist",
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            msg: {
                                                type: 'string'
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        500: {
                            description: "Some internal server error",
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            msg: {
                                                type: 'string'
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            '/sign-out': {
                post: {
                    description: 'Signs out user',
                    summary: 'Signs out user',
                    tags: [
                        'Auth API'
                    ],
                    responses: {
                        200: {
                            description: 'Successful log out'
                        },
                        500: {
                            description: "Some internal server error",
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            msg: {
                                                type: 'string'
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            '/refresh' : {
                post: {
                    description: 'Refreshes user tokens',
                    summary: 'Refreshes user tokens',
                    tags: [
                        'Auth API'
                    ],
                    responses: {
                        200: {
                            description: 'Successful refresh',
                            headers: {
                                'Set-Cookie': {
                                    description: 'Contains JWT refresh token (refreshToken=JWT)',
                                    type: 'string'
                                }
                            },
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            user: {
                                                type: 'object',
                                                properties: {
                                                    email: {
                                                        type: 'string',
                                                    },
                                                    password: {
                                                        type: 'string'
                                                    }
                                                }
                                            },
                                            tokens: {
                                                type: 'object',
                                                properties: {
                                                    accessToken: {
                                                        type: 'string'
                                                    },
                                                    refreshToken: {
                                                        type: 'string'
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        422: {
                            description: "Invalid token or provided token wasn't stored in database (it was expired or doesn't belong to this user)",
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            msg: {
                                                type: 'string'
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        500: {
                            description: "Some internal server error",
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            msg: {
                                                type: 'string'
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            '/cards': {
                get: {
                    description: 'Returns list of cards for authenticated users',
                    summary: 'Returns list of cards for authenticated users ',
                    tags: [
                        'Cards API'
                    ],
                    responses: {
                        200: {
                            description: "Successful operation",
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'array',
                                        items: {
                                            $ref: '#/components/schemas/Card'
                                        }
                                    }
                                }
                            }
                        },
                        422: { 
                            description: 'If access or refresh tokens are invalid',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            msg: {
                                                type: 'string'
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        500: {
                            description: 'Some internal server error',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            msg: {
                                                type: 'string'
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    security: [
                        {
                            bearerAuth: []
                        }
                    ]
                }
            }
        }
    },
    apis: [
        './routes/*.js'
    ]
}

const config = swaggerJsDoc(options) 
module.exports = config