const express = require('express')
const router = express.Router()

const userController = require('./../controllers/userController')
const authController = require('./../controllers/authController')
const messageController = require('./../controllers/messageController')

router.route('/login').post(authController.login)
router.route('/signup').post(authController.signup)
router.get('/logout', authController.logout)

router.route('/').get(userController.getAllUsers)
router.get(
    '/message',
    authController.protect,
    messageController.getAllMessagesOfUser,
)

module.exports = router
