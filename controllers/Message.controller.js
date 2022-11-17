const Message = require('../models/Message.model')


const createMessage = async (req, res) => {
    if (req.body) {
        const message = new Message({
            role: req.user.role,
            message: req.body.message,
        })
        message.save()
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const getAllMessage = async (req, res) => {
    await Message.find({})
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}

const deleteMessageById = async (req, res) => {
    try {
        if (req.params.id) {
            await Message.findByIdAndDelete(req.params.id)
                .then(data => {
                    res.status(200).send({ data: data })
                })
                .catch(error => {
                    res.status(500).send({ error: error.message });
                })
        }
    } catch (error) {
        res.send({ error: error.message });
    }
}

const saveMessageAndFile = async (req, res) => {
    try {
        if (req.file) {
            const message = new Message({
                role: req.user.role,
                message: req.body.message,
                file: req.file.path
            })
            await message.save();
            res.status(200).send({ data: message });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};


module.exports = {
    createMessage,
    getAllMessage,
    deleteMessageById,
    saveMessageAndFile
}