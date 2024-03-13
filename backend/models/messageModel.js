const mongoose = require('mongoose')
const validator = require('validator')

const messageSchema = new mongoose.Schema(
    {
        from: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: [true, 'A message must have a sender!'],
        },
        to: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: [true, 'A tour must have a recipient!'],
        },
        content: {
            type: String,
            required: [true, 'A message must have a content!'],
        },
        sentAt: {
            type: Date,
            default: Date.now(),
            required: [true, 'A message must have a sending time!'],
        },
        updatedAt: Date,
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    },
)

messageSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'from',
        select: 'name avatar',
    }).populate({
        path: 'to',
        select: 'name avatar',
    })
    next()
})

const Message = mongoose.model('Message', messageSchema)

module.exports = Message
