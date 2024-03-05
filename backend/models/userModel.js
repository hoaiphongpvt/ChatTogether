const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A user must have a name!'],
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'A user must have an email!'],
        validate: [validator.isEmail, 'Please provide correct email!'],
    },
    password: {
        type: String,
        min: [8, 'Must be at least 8 characters '],
        required: [true, 'Password is required!'],
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password!'],
        validate: {
            validator: function (el) {
                return el === this.password
            },
        },
    },
    address: {
        type: String,
    },
    avartar: {
        type: String,
    },
    conversations: [Object],
})

userSchema.pre('save', function (next) {
    // Only run this function if password was actually modified
    if (!this.isModified('password')) return next()

    // Hash the password
    this.password = bcrypt.hashSync(this.password, 10)

    // Delete passwordConfirm field
    this.passwordConfirm = undefined
    next()
})

userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword,
) {
    return await bcrypt.compare(candidatePassword, userPassword)
}

module.exports = mongoose.model('user', userSchema)
