const router = require('express').Router();


const authRoutes = require('./auth-route');
const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes');



router.use('/', authRoutes)
router.use('/u', userRoutes)
router.use('/p', postRoutes)


module.exports = router