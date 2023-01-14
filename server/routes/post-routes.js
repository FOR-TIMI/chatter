const router = require('express').Router();


/**================Post controller=================== */
const { 
    createPost
    ,getFeedPosts
    ,getPostLikes
    ,addRemoveLike
} = require('../controllers/post-controller');


/**================Comment controller=================== */
const {
    addComment
    ,getComments
    ,removeComment
    ,updateComment
} = require('../controllers/comment-controller')



/**================Image Storage Middleware=================== */
const multer = require('multer');
const { storage } = require('../config/cloudinary');
const upload = multer({ storage });


/**================Authentication Middleware=================== */
const { authMiddleware } = require('../middleware/jwt-config');



/**================isAuthor Middleware=================== */
const { isCommentAuthor } = require('../middleware/middleware');


/**=========Posts================== */
router
    .route('/')
    .get(authMiddleware, getFeedPosts)
    .post(authMiddleware, upload.array('postImageUrls', 5), createPost)

/**============Likes=============== */
router
    .route('/:id/likes')
    .get(authMiddleware, getPostLikes)
    .patch(authMiddleware, addRemoveLike)


/**=========Comment============ */

router
    .route('/:postId/comments')
    .get(authMiddleware, getComments)
    .post(authMiddleware, addComment)

router
    .route('/:postId/comments/commentId')
    .put(authMiddleware, isCommentAuthor, updateComment)
    .delete(authMiddleware, isCommentAuthor, removeComment)


module.exports = router