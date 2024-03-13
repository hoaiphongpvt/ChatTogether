const jwt = require('jsonwebtoken')
const { promisify } = require('util')
const User = require('./../models/userModel')

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    })
}

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id)
    const cookieOptions = {
        expires: new Date(
            Date.now() +
                process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
        ),
        httpOnly: true,
        secure: true,
    }

    res.cookie('jwt', token, cookieOptions)
    //Remove password from output
    user.password = undefined
    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user,
        },
    })
}

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
            return
        }

        //If everything ok, send token to client
        createSendToken(user, 200, res)
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message,
        })
    }
}

exports.logout = (req, res) => {
    res.cookie('jwt', undefined, {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
    })

    res.status(200).json({
        status: 'success',
    })
}

exports.protect = async (req, res, next) => {
    try {
        let token
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1]
        } else if (req.cookies.jwt) {
            token = req.cookies.jwt
        }
        if (!token) {
            throw new Error('Authentication failed!')
        }
        const decoded = await promisify(jwt.verify)(
            token,
            process.env.JWT_SECRET,
        )
        //Check user still exists
        const currentUser = await User.findById(decoded.id)
        if (!currentUser) {
            res.status(401).json({
                status: 'fail',
                message:
                    'The user belonging to this token does no longer exist.',
            })
        }

        req.user = currentUser
        res.locals.user = currentUser
        next()
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: 'Invalid token !',
        })
    }
}

exports.isLoggedIn = async (req, res, next) => {
    if (req.cookies.jwt) {
        try {
            //Verification token
            const decoded = await promisify(jwt.verify)(
                req.cookies.jwt,
                process.env.JWT_SECRET,
            )

            //Check user still exists
            const currentUser = await User.findById(decoded.id)

            if (!currentUser) return next()

            // There is a logged in user
            req.user = currentUser
            res.locals.user = currentUser

            return next()
        } catch (err) {
            return next()
        }
    }
    next()
}
