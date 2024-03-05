const mongoose = require('mongoose')
// const validator = require('validator')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A user must have a name!'],
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'A user must have an email!'],
    },
    password: {
        type: String,
        min: [8, 'Must be at least 8 characters '],
        required: [true, 'Password is required!'],
    },
    address: {
        type: String,
    },
    conversations: [Object],
})

module.exports = mongoose.model('userSchema', userSchema)
