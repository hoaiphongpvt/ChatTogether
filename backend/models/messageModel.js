const mongoose = require('mongoose')
const validator = require('validator')

const messageSchema = new mongoose.Schema({
    from: mongoose.Schema.ObjectId,
    to: mongoose.Schema.ObjectId,
    content: {
        type: String,
        required: [true, 'A message must have a content!'],
    },
    sendAt: Date,
    updatedAt: Date,
})

module.exports = mongoose.model('messageSchema', messageSchema)
