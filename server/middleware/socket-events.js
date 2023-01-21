const { User, Notification } =  require('../model')

let onlineUsers = []

const setUserOnline = (username,userId, socketId) => {
  !onlineUsers.some(user=> user.username === username)
  &&onlineUsers.push({ username,userId, socketId}) 
}

const setUserOffline = (socketId) => {
  onlineUsers = onlineUsers.filter(user => user.socketId !== socketId)
}


const findUserByUsername = (username) => {
  return onlineUsers.find((user) => user.username === username);
}

const findUserById = (userId) => {
  return onlineUsers.find((user) => user.userId === userId);
}

const handleAddRemoveFollower = async (io, followerId, followingId) => {
  try {
  // Find the user
  const follower = await User.findById(followerId); //Person that's trying to add followingId to their list of followings
  // Check if the user exists
  if (!follower) {
    return console.log({ status: 404, message: 'User not found' });
  }

  // Find the following user
  const user = await User.findById(followingId);  //person getting followed

  // Check if the following user exists
  if (!user) {
    return console.log({ status: 404, message: 'The User you are trying to follow does not exist' });
  }

  


  // Check if the user is currently following this person
  if (user.followers.includes(followerId)) {
    // Remove following from user's following list
    await User.findByIdAndUpdate(
      { _id: followingId},
      { $pull: { followers: followerId} }
    );

  } else {

    // Add following to user's following list
    await User.findByIdAndUpdate(
      { _id: followingId },
      { $push: { followers: followerId } }
    );     
  }

  io.emit("UPDATED_FOLLOWERS")


  console.log({ status: 200, message: 'Success' });
  } catch (err) {
    // Log the error
    console.error({ message: err.message})
    }
}

async function sendPostNotification(data, io) {
  const { postId, createdAt, senderId } = data;
  const user = await User.findById(senderId);
  const followers = user.followers;

  for (let i = 0; i < followers.length; i++) {
      const follower = await User.findById(followers[i]);
      const followerId = follower._id;

      // check if the follower is online
      const onlineUser = findUserById(followerId)

      // create a new notification in the database
     await Notification.create({
        userId: followerId,
        event: {
            type: "NEW_POST",
            postId: `${postId}`,
            profilePhotoUrl: user.profilePhotoUrl,
            createdAt: createdAt,
            senderUsername: user.username,
        },
    });

      if (onlineUser) {
          // emit a message to the follower's socket to get the notification instantly
          io.to(onlineUser.socketId).emit("NEW_NOTIFICATION");
      }else{
        await User.updateOne({ _id: followerId }, { newNotification: true });
      }
  }
}

async function sendLikeNotification(data,io){

  const { postId,postImageUrl, createdAt, senderId, postAuthorId, postAuthorUsername } = data;

  const sender = await User.findById(senderId);

    // create a new notification in the database
      await Notification.create({
        userId: postAuthorId,
        event: {
            type: "NEW_POST_LIKE",
            postId: `${postId}`,
            postImageUrl,
            profilePhotoUrl: sender.profilePhotoUrl,
            createdAt: createdAt,
            senderUsername: sender.username,
        },
      });

  //check if the post author is online
   const isOnline = findUserById(postAuthorId);


   if(isOnline){
      io.to(isOnline.socketId).emit("NEW_NOTIFICATION");
   } else{
      await User.updateOne({ _id: postAuthorId }, { newNotification: true }); //Notify user when they come online
  }

}


module.exports = (io) => {

  io.on('connection', (socket) => {

    socket.on("USER_ONLINE", async({username,userId}) => {
       setUserOnline(username, userId, socket.id)

       const { newNotification= false } = await User.findById(userId);

       // Check if the user has new notifications
        if(newNotification){
          // Emit a new notification event
          socket.emit("NEW_NOTIFICATION");
          //set newNotification to false
          await User.updateOne({ _id: userId }, { newNotification: false })

        }
    
    })

    socket.on("SEND_NOTIFICATION", ({ data }) => {
        switch(data.type){
           case "NEW_POST": sendPostNotification(data,io);
           break;
           case "NEW_POST_LIKE": sendLikeNotification(data,io);
           break;
        }  
    })

    socket.on('ADD_REMOVE_FOLLOWER',async ({ followerId, followingId }) => {
       handleAddRemoveFollower(io, followerId, followingId);
       return;
    });

    socket.on("disconnect", () => {
       setUserOffline(socket.id)
    })
    
  });
};
