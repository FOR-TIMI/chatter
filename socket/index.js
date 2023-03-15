const PORT = process.env.PORT || 3002

const io = require('socket.io')(PORT,{
    cors:{
        origin: process.env.NODE_ENV === "production" ? "https://nameless-basin-36851.herokuapp.com" : "http://localhost:3000"
    }
})

let users = [];

//To add a user's id to list of logged in users
const addUser = (userId,socketId) => {
    !users.some(user => user.userId === userId) && users.push({ userId, socketId})
}

const removeUser = (socketId) => {
    users = users.filter(u => u.socketId !== socketId)
}

const findUser = (userId) => {
    return users.find(user => user.userId === userId);
}

io.on("connection", (socket) => {
    console.log("A user connected"); 

    socket.on("addUser", userId => {
        addUser(userId,  socket.id);
      
        //To send all the current online users
        io.emit("getUsers", users);
    })

    //send and get message
    socket.on("sendMessage", ({ sender, recieverId, content }) => {
         const user = findUser(recieverId);

         io.to(user.socketId).emit("getMessage", {
             sender,
             content
         })
    })

    socket.on("disconnect",() => {
        console.log("A user disconnected");
        removeUser(socket.id)

        //To send new list of all current users
        io.emit("getUsers", users);
    })
})


