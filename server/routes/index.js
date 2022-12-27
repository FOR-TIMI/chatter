const router = require('express').Router();


const authRoutes = require('./auth-route');
const userRoutes = require('./user-routes')



router.use('/', authRoutes)
router.use('/users', userRoutes)


module.exports = router