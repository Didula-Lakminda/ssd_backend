const { Schema, model } = require('mongoose');

const MessageSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "admin",
        enum: ["admin", "manager", "worker"]
    }
}, { timestamps: true });

module.exports = model("messages", MessageSchema);