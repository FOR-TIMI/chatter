const router = require('express').Router();

const { 
    getUser
    ,getUserFollowers
    ,getUserFollowings
    ,addRemoveFollow
} = require('../controllers/user-controller');

const { authMiddleware } = require('../middleware/jwt-config');


/**=========== READ ============== */
    router.get('/:username',authMiddleware, getUser);
    router.get('/:username/following', authMiddleware, getUserFollowings)

    router
        .route('/:username/followers')
        .get(authMiddleware, getUserFollowers)
        .patch(authMiddleware, addRemoveFollow)






export default router;

