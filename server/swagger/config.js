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
        }
    },
    apis: [
        './routes/*.js'
    ]
}

const config = swaggerJsDoc(options)
console.log(config)
module.exports = config