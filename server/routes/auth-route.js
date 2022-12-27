const router = require('express').Router();

const { 
    register
    ,login
} = require('../controllers/auth-controller')

const multer = require('multer');
const { storage } = require('../config/cloudinary');
const upload = multer({ storage });


router.post('/login', login)
router.post('/register', upload.single("image"), register)
    


module.exports = router

