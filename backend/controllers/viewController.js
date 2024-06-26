const User = require('../models/userModel')
const Message = require('./../models/messageModel')

exports.chat = async (req, res) => {
    try {
        const conversations = await Message.find({
            $or: [{ from: req.user.id }, { to: req.user.id }],
        }).sort('-sentAt')

        const arrFromIdUsers = []
        const arrToIdUsers = []

        // Giả sử `conversations` là mảng các cuộc trò chuyện
        conversations.map((el) => {
            arrFromIdUsers.push(el.from._id.toString()) // Chuyển đổi ObjectId thành chuỗi
            arrToIdUsers.push(el.to._id.toString()) // Chuyển đổi ObjectId thành chuỗi
        })

        const userIdsSet = new Set([...arrFromIdUsers, ...arrToIdUsers])

        // Chuyển đổi set thành một mảng để hiển thị các ID
        const userIdsArray = Array.from(userIdsSet)

        console.log('ID Users: ', userIdsArray)

        res.status(200).render('chat', {
            title: 'Chat Together',
            conversations,
        })
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: err.message,
        })
    }
}

exports.message = async (req, res) => {
    try {
        const conversations = await Message.find({
            $or: [{ from: req.user.id }, { to: req.user.id }],
        }).sort('-sentAt')

        const id1 = req.query.currUserId
        const id2 = req.query.toUserId

        const toUser = await User.findById(id2)
        const currUser = await User.findById(id1)

        const inbox = await Message.find({
            $or: [
                { $and: [{ from: id1 }, { to: id2 }] },
                { $and: [{ from: id2 }, { to: id1 }] },
            ],
        }).sort({ sentAt: 1 })

        res.status(200).render('chat', {
            title: 'Inbox',
            inbox,
            conversations,
            toUser,
            currUser,
        })
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: err.message,
        })
    }
}

exports.loadFormLogin = (req, res) => {
    res.status(200).render('login', {
        title: 'Log in',
    })
}

exports.loadFormSignup = (req, res) => {
    res.status(200).render('signup', {
        title: 'Sign up an account',
    })
}
