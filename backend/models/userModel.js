const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema(
    {
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
        avatar: {
            type: String,
            default: 'avatar-default.png',
        },
        active: {
            type: Boolean,
            default: true,
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    },
)

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

userSchema.pre(/^find/, function (next) {
    this.find({ active: { $ne: false } })
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
