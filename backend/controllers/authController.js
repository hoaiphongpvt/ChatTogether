const User = require('./../models/userModel')

exports.signup = (req, res, next) => {
    const newUser = req.body
}

exports.login = (req, res, next) => {
    const email = req.body.email
    const password = req.body.password

    res.status(200).json({
        status: 'success',
        data: {
            email,
            password,
        },
    })
}
