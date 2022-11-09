const router = require('express').Router();
const { userAuth, checkRole } = require('../../controllers/Auth.controller');

//editor protected route
router.get('/admin-protected', userAuth, checkRole(['admin']), async(req, res) => {
    return res.send("Hello Admin");
});

//admin protected route
router.get('/manager-protected', userAuth, checkRole(['manager']), async(req, res) => {
    return res.send("Hello Manager");
});

//reviewer protected route
router.get('/worker-protected', userAuth, checkRole(['worker']), async(req, res) => {
    return res.send("Hello Worker");
});

module.exports = router;