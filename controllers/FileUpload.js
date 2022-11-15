const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const Message = require('../models/Message.model');
const FormData = require('form-data');

// create a storage engine
const storage = new GridFsStorage({
    destination (req, file, cb) {
        cb(null, 'FileStorage/Uploads');
    },
    filename (req, file, cb) {
        cb(null, file.originalname);
    },
    url: process.env.MONGODB_URI,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            const filename = file.originalname;
            const formData = new FormData();
            const fileInfo = {
                filename: filename,
                bucketName: 'uploads'
            };
            resolve(fileInfo);
            const newMessage = new Message({
                role: req.user.role,
                filename: filename,
                message: req.body.message,
            });
            newMessage.save()
                .then(() =>  console.log('Message saved successfully'))
                .catch(error =>  console.log(error.message));
        });
    }
})

const upload = multer({ storage });

module.exports = {upload};