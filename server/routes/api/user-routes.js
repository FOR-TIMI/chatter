const router = require('express').Router();

// Destructure all functions in the user controller
const {
  getAllUsers
 ,getUser
 ,addFollow
 ,removeFollow
 ,updateUser
 ,deleteUser
 ,createNewUser
} = require('../../controller/user-controller')

/**
 * Expect route toBe `/ai/user`
 */
router
    .route('/')
    .get(getAllUsers)
    .post(createNewUser)

/**
 * Expect endpoint : /api/user/:id
 */
router
    .route('/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser)

/**
 * Expect endpoint : /api/user/:id/friends/:friendId
 */ 
router
    .route('/:userId/following/:followingId')
    .put(addFollow)
    .delete(removeFollow)

module.exports = router;