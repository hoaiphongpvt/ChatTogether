const Message = require('./../models/messageModel')

exports.createMessage = async (req, res) => {
    try {
        const newMessage = await Message.create(req.body)
        res.status(201).json({
            status: 'success',
            data: {
                data: newMessage,
            },
        })
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message,
        })
    }
}

exports.updateMessage = async (req, res) => {
    try {
        const updatedMessage = await Message.findByIdAndUpdate(
            req.params.id,
            { ...req.body, updatedAt: Date.now() },
            {
                new: true,
                runValidators: true,
            },
        )

        if (!updatedMessage) {
            res.status(404).json({
                status: 'fail',
                message: 'Can not find message!',
            })
        }
        res.status(200).json({
            status: 'success',
            data: {
                data: updatedMessage,
            },
        })
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: err.message,
        })
    }
}

exports.deleteMessage = async (req, res) => {
    try {
        await Message.findByIdAndDelete(req.params.id)

        res.status(200).json({
            status: 'success',
        })
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: err.message,
        })
    }
}

exports.getAllMessage = async (req, res) => {
    try {
        const data = await Message.find()
        res.status(200).json({
            status: 'success',
            results: data.length,
            data: {
                data,
            },
        })
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message,
        })
    }
}

exports.getAllMessagesOfUser = async (req, res) => {
    try {
        const data = await Message.find({
            $or: [{ from: req.user.id }, { to: req.user.id }],
        })

        res.status(200).json({
            status: 'success',
            data: {
                data,
            },
        })
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message,
        })
    }
}
