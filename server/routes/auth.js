const router = require('express').Router();
const { login, register } = require('../controller/auth-controller');

//To login a user
router.post('/login', login )

//To create a new user
router.post('/register', register)      






module.exports = router