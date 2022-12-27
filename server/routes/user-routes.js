const router = require('express').Router();

const { 
    getUser
    ,getUserFollowers
    ,getUserFollowings
    ,addRemoveFollow
} = require('../controllers/user-controller');

/**=========== post controller to get a user's posts ============== */
const { getUserPosts } = require('../controllers/post-controller')

/**=========== Middleware to verify signed in users ============== */
const { authMiddleware } = require('../middleware/jwt-config');


/**=========== READ ============== */
    router.get('/:username',authMiddleware, getUser); //get a single user
    router.get('/:username/posts', authMiddleware, getUserPosts) // get a user's posts

    router
        .route('/:username/following')
        .get(authMiddleware, getUserFollowings) // get a user's current following list
        .patch(authMiddleware, addRemoveFollow) // to toggle follow

    router
        .route('/:username/followers')
        .get(authMiddleware, getUserFollowers) //To get a user's follower list






export default router;

