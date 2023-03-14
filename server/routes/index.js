const router = require('express').Router();


const authRoutes = require('./auth-route');
const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes');
const conversationRoutes = require('./conversation-routes');
const messageRoutes = require('./message-routes');

module.exports = (app) => {
    // Set up Socket.IO
    const server = require('http').createServer(app);
    const { Server } = require('socket.io');
    const io = new Server(server,{
        cors:{
            origin: process.env.NODE_ENV === "production" ? "https://nameless-basin-36851.herokuapp.com" : "http://localhost:3000",
            methods: ["GET","POST","PATCH", "DELETE"]
        }
    })

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
    router.use('/cs', conversationRoutes)
    router.use('/msg', messageRoutes)


return { server, router};
}