const express = require('express')
const router = express.Router()

const userController = require('./../controllers/userController')
const authController = require('./../controllers/authController')

router.route('/login').post(authController.login)
router.route('/signup').post(authController.signup)

router.route('/').get(userController.getAllUsers)

module.exports = router
