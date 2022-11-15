const { Schema, model } = require('mongoose');

const MessageSchema = new Schema({
    role: {
        type: String,
    },
    message: {
        type: String,
        // required: true
    },
    filename: {
        type: String,
    },
}, { timestamps: true });

module.exports = model("messages", MessageSchema);