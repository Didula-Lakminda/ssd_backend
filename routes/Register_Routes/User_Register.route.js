const router = require('express').Router();
const { userAuth, checkRole } = require('../../controllers/Auth.controller');

const { userRegister } = require('../../controllers/Auth.controller');

//editor registration route
router.post('/register-user', userAuth, checkRole(['admin']), async(req, res) => {
    await userRegister(req.body, res);
});

module.exports = router;