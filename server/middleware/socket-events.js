// socket-events.js
const { User } =  require('../model')

// socket-events.js

module.exports = (io) => {
    io.on('connection', (socket) => {
      console.log('A user has connected');
  
      socket.on('ADD_REMOVE_FOLLOWER', async ({followerId, followingId}, callback) => {
        try {
          // Find the user
          const follower = await User.findById(followerId);
  
          // Check if the user exists
          if (!follower) {
            return callback({ status: 404, message: 'User not found' });
          }
  
          // Find the following user
          const user = await User.findById(followingId);
  
          // Check if the following user exists
          if (!user) {
            return callback({ status: 404, message: 'The User you are trying to follow does not exist' });
          }
  
          // Check if the user is currently following this person
          if (user.followers.includes(followerId)) {
            // Remove following from user's following list
            await User.updateOne(
              { _id: user.id},
              { $pull: { followers: followingId } }
            );
  
          } else {
            // Add following to user's following list
            await User.updateOne(
              { _id: user.id },
              { $push: { followers: followingId } }
            );
  
          }
  
          // Emit the 'followersUpdated' event to all connected clients
          io.emit('followersUpdated', { message: 'Followers list updated' });
  
          callback({ status: 200, message: 'Success' });
        } catch (err) {
          callback({ status: 500, message: 'Server error' });
        }
      });
  
      socket.on('disconnect', () => {
        console.log('A user has disconnected');
      });
    });
  };
  
  