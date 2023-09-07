const PORT = process.env.PORT || 8900;

const app = require("../server/app");
const db = require("../server/config/db");

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT} 🚀`);
});

/*================== MONGODB =================*/
db.once("open", () => {
  console.log("🚀 MongoDB database connected 🚀");
});

const io = require("socket.io")(server, {
  cors: {
    origin:
      process.env.NODE_ENV === "production"
        ? "https://nameless-basin-36851.herokuapp.com"
        : "http://localhost:" + PORT,
  },
  transports: ["websocket", "polling"],
});

let users = [];

//To add a user's id to list of logged in users
const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((u) => u.socketId !== socketId);
};

const findUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    //To send all the current online users
    io.emit("getUsers", users);
  });

  //send and get message
  socket.on("sendMessage", ({ sender, recieverId, content }) => {
    const user = findUser(recieverId);

    if (user) {
      io.to(user.socketId).emit("getMessage", {
        sender,
        content,
      });
    }
  });

  //add or remove follower
  socket.on("addRemoveFollower", ({ userId, followingId }) => {
    const user = findUser(followingId);
    if (user) {
      io.to(user.socketId).emit("updateFollowers");
    }
    return;
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
    removeUser(socket.id);

    //To send new list of all current users
    io.emit("getUsers", users);
  });
});
