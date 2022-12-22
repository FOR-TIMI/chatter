const router = require('express').Router();

//Destructure all methods from posts controller
const {
  getAllPosts
 ,getPost
 ,createNewPost
 ,addLike
 ,deletePost
 ,removeLike
 ,updatePost
} = require('../../controller/post-controller')


/**
 * Expect route toBe `/api/posts`
 */
router
    .route('/')
    .get(getAllPosts)
    .post(createNewPost)

/**
 * Expect endpoint : /api/posts/:id
 */
router
    .route('/:id')
    .get(getPost)
    .put(updatePost)
    .delete(deletePost)

/**
 * Expect endpoint : /api/posts/:postId/likes
 */ 
router
    .route('/:postId/likes')
    .put(addLike)
    .delete(removeLike)

module.exports = router