const { User } =  require('../model')

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
   const unfollow = await User.updateOne(
      { _id: followingId},
      { $pull: { followers: followerId } }
    );


  } else {
    // Add following to user's following list
    await User.updateOne(
      { _id: followingId },
      { $push: { followers: followerId } }
    );

  }

  // Emit the 'followersUpdated' event to all connected clients
  io.emit('followersUpdated', { message: 'Followers list updated' });

  console.log({ status: 200, message: 'Success' });
  } catch (err) {
    // Log the error
    console.error({ message: err.message})
    }
}
    
module.exports = (io) => {

  io.on('connection', (socket) => {

    socket.on('ADD_REMOVE_FOLLOWER', ({ followerId, followingId }) => {
      handleAddRemoveFollower(io, followerId, followingId,);
    });
    

    socket.on('disconnect', () => {
      console.log('A user has disconnected');
    });
  });
};
