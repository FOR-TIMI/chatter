const router = require('express').Router();


const authRoutes = require('./auth-route');
const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes');

module.exports = (app) => {
    // Set up Socket.IO
    const server = require('http').createServer(app);
    const io = require('socket.io')(server);

    // Import the Socket.IO events file
    const socketEvents = require('../middleware/socket-events');

    // Set up the Socket.IO listeners
    socketEvents(io);

    router.use((req,res,next) => {
        // Add the Socket.IO instance to the request object
        req.io = io;
        next();
    })

    router.use('/', authRoutes)
    router.use('/u', userRoutes)
    router.use('/p', postRoutes)


return { server, router};
}