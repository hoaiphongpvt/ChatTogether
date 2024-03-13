const Message = require('./../models/messageModel')

exports.chat = async (req, res) => {
    try {
        const conversations = await Message.find({
            $or: [{ from: req.user.id }, { to: req.user.id }],
        })
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

exports.login = (req, res) => {
    res.status(200).render('login', {
        title: 'Log in',
    })
}
