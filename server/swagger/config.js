const swaggerJsDoc = require('swagger-jsdoc')

const options = {
    definition: {
        openapi: '3.0.1',
        info: 'JWT-authentication server',
        version: '1.0.0'
    },
    apis: [
        './routes/*.js'
    ]
}

module.exports = swaggerJsDoc(options)