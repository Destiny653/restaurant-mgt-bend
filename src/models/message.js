const { Schema, model } = require('mongoose')

const messageSchema = new Schema({
    client: {
        type: Schema.Types.ObjectId,
        path: 'user',
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        enum: ['complaint', 'inquiry', 'request', 'feedback'],
        default: 'inquiry',
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = model('Message', messageSchema)