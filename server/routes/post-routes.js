const router = require('express').Router();


/**================Post controller=================== */
const { 
    createPost
    ,getFeedPosts
    ,getPostLikes
    ,addRemoveLike
} = require('../controllers/post-controller');


/**================Image Storage Middleware=================== */
const multer = require('multer');
const { storage } = require('../config/cloudinary');
const upload = multer({ storage });


/**================Authentication Middleware=================== */
const { authMiddleware } = require('../middleware/jwt-config');



router
    .route('/')
    .get(authMiddleware, getFeedPosts)
    .post(authMiddleware, upload.array('images'), createPost)

router
    .route('/:id/likes')
    .get(authMiddleware, getPostLikes)
    .patch(authMiddleware, addRemoveLike)


module.exports = router