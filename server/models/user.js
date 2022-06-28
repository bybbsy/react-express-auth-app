const { Schema, model } = require("mongoose");


/**
 * @swagger
 *  definitions: {
        User: {
            type: 'object',
            properties: {
                name: {
                    type: 'string'
                }
            },
            xml: {
                name: 'order'
            }
        }
    }
    User:
        type: object
        properties:
            email:
                type: string
 */
const UserSchema = new Schema({
    email: { type: String, unique: true, required: true},
    password: { type: String, required: true }
})

module.exports = model('User', UserSchema)