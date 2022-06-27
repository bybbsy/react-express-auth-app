const swaggerJsDoc = require('swagger-jsdoc')

const options = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'JWT Server',
            description: 'Desc',
        },
        version: '1.0.0',
        servers: [
            {
                url: 'http://localhost:3000/api',
                description: 'A server for testing JWT auth API'
            }
        ],
    },
    apis: [
        './routes/*.js'
    ]
}

const config = swaggerJsDoc(options)
console.log(config)
module.exports = config