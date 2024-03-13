const express = require('express')
const router = express.Router()

const messageController = require('./../controllers/messageController')
const authController = require('./../controllers/authController')

router
    .route('/')
    .get(messageController.getAllMessage)
    .post(authController.protect, messageController.createMessage)

router
    .route('/:id')
    .patch(authController.protect, messageController.updateMessage)
    .delete(authController.protect, messageController.deleteMessage)

module.exports = router
