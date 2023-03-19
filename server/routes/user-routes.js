const router = require('express').Router();

const { 
    getUser
    ,getUserFollowers
    ,getUserFollowings
    ,addRemoveFollow
    ,getUsers
} = require('../controllers/user-controller');

/**=========== post controller to get a user's posts ============== */
const { getUserPosts } = require('../controllers/post-controller')

/**=========== Middleware to verify signed in users ============== */
const { authMiddleware } = require('../middleware/jwt-config');


/**=========== READ ============== */
    router.get('/', authMiddleware,getUsers)
    router.get('/:usernameorid',authMiddleware, getUser); //get a single user
    router.get('/:username/posts', authMiddleware, getUserPosts) // get a user's posts

    router
        .route('/:userId/followings')
        .get(authMiddleware,getUserFollowings) // get a user's current following list
        .patch(authMiddleware,addRemoveFollow) // to toggle follow

    router
        .route('/:userId/followers')
        .get(authMiddleware,getUserFollowers) //To get a user's follower list






module.exports= router;

