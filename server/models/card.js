const { Schema, model } = require("mongoose");

const CardSchema = new Schema({
    title: { type: String, default: 'no-title' },
    description: { type: String, default: 'no-description' },
    imageUrl: { type: String },
    tags: [
        {
            name: {
                type: String
            }
        }
    ]
})

module.exports = model('card', CardSchema)