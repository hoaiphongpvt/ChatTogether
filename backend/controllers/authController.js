const User = require('./../models/userModel')

exports.signup = async (req, res, next) => {
    try {
        const newUser = await User.create(req.body)
        res.status(201).json({
            status: 'success',
            data: {
                newUser,
            },
        })
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message,
        })
    }
}

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        //Check if email and password exist
        if (!email || !password) {
            res.status(400).json({
                status: 'fail',
                message: 'Please provide email and password',
            })
        }
        //Check if user exists and password is correct
        const user = await User.findOne({ email }).select('+password')
        if (!user || !(await user.correctPassword(password, user.password))) {
            res.status(401).json({
                status: 'fail',
                message: 'Incorrect email or password!',
            })
        }

        //If everything ok, send token to client
        res.status(200).json({
            status: 'success',
            data: {
                user,
            },
        })
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message,
        })
    }
}
