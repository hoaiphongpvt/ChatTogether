const User = require('../models/userModel')
const Message = require('./../models/messageModel')

exports.chat = async (req, res) => {
    try {
        const conversations = await Message.find({
            $or: [{ from: req.user.id }, { to: req.user.id }],
        }).sort('-sentAt')

        console.log(conversations)

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

exports.login = (req, res) => {
    res.status(200).render('login', {
        title: 'Log in',
    })
}
