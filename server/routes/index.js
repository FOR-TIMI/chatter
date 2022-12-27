const router = require('express').Router();
const authRoutes = require('./auth-route');


router.use('/', authRoutes)


module.exports = router