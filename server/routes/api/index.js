const router = require('express').Router();
const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes')


router.use('/users', userRoutes)
router.use('/posts', postRoutes)

module.exports = router