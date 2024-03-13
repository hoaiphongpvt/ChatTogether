const express = require('express')
const router = express.Router()

const viewController = require('./../controllers/viewController')
const authController = require('./../controllers/authController')

router
    .route('/chat')
    .get(authController.protect, authController.isLoggedIn, viewController.chat)
router
    .route('/')
    .get(authController.protect, authController.isLoggedIn, viewController.chat)
router.route('/login').get(authController.isLoggedIn, viewController.login)

module.exports = router
