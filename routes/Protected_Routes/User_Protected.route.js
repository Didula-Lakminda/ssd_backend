const router = require('express').Router();
const { userAuth, checkRole } = require('../../controllers/Auth.controller');
const { createMessage, getAllMessage, deleteMessageById } = require('../../controllers/Message.controller');

//editor protected route
router.get('/admin-protected', userAuth, checkRole(['admin']), async (req, res) => {
    return res.send("Hello Admin");
});

//admin protected route
router.get('/manager-protected', userAuth, checkRole(['manager']), async (req, res) => {
    return res.send("Hello Manager");
});

//reviewer protected route
router.get('/worker-protected', userAuth, checkRole(['worker']), async (req, res) => {
    return res.send("Hello Worker");
});

//create message
router.post('/create-message', userAuth, checkRole(['manager']), async (req, res) => {
    await createMessage(req, res);
});

// get all message
router.get('/getAll-message', userAuth, checkRole(['manager']), async (req, res) => {
    await getAllMessage(req, res);
});

// delete message by id
router.delete('/del-messagee/:id', userAuth, checkRole(['manager']), async (req, res) => {
    await deleteMessageById(req, res)
});

module.exports = router;