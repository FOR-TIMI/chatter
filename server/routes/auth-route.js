const router = require('express').Router();

const { 
    register
    ,login
} = require('../controllers/auth-controller')

const multer = require('multer');
const { storage } = require('../config/cloudinary');
const upload = multer({ storage });


router.post('/login', login)
router.post('/register', register)
    


module.exports = router

