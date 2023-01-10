const { User } = require('../model');



module.exports  = {
    // ...

    /**================ GET ONE USER ==================== */
     async  getUser({params},res){
        try{
            const { username } = params;
            const user = await User.findOne({ username });

            //hide users password from frontend
            user.password = undefined

            res.status(200).json(user)
        } catch(err){
            res.status(404).json({ message: err.message })
        }
     },
     
    /**================ GET User Followers ==================== */
     async  getUserFollowers({params}, res){
        try{
            const { username } = params;

            const user = await User.findOne({ username });
            if (!user) {
              return res
              .status(404)
              .json({ message: "user not found"});
            }
        
            const followers = await User.find({ _id: { $in: user.followers } });
        
            const formattedFollowers = followers.map(
              ({ _id, username, email, occupation, location, profilePhotoUrl }) => {
                return { _id, username, email, occupation, location, profilePhotoUrl }
              }
            );
        
            res.status(200).json(formattedFollowers);
          } catch(err){
            res.status(404).json({ message: err.message });
          }
     },
    
    /**================ GET User Followings ==================== */
    async  getUserFollowings({params}, res){
      try{
        const { username } = params;
        const user = await User.findOne({ username });
        if (!user) {
          return res
          .status(404)
          .json({ message: "user not found"});
        }

        const followings = await User.find({ _id: { $in: user.followings } });

        const formattedFollowings = followings
          .slice(-5) // limit to the latest 5 followers
          .map(({ _id, username, email, occupation, location, profilePhotoUrl }) => {
            return { _id, username, email, occupation, location, profilePhotoUrl }
          });

        res.status(200).json(formattedFollowings);
      } catch(err){
        res.status(404).json({ message: err.message });
      }
    },


   /**================ to follow and Unfollow ==================== */
   async addRemoveFollow(req, res) {
    try {
        const { params, body } = req;
        const user = await User.findOne({ username: params.username });

        
  
        // Check if the user is currently following this person
        const followingIndex = user.followings.indexOf(body.followingId);
        if (followingIndex !== -1) {
        user.followings.splice(followingIndex, 1);
        } else {
        // Add person to followings list
        user.followings.push(body.followingId);
        }

        // Save new version of the followings
        await user.save();

        // To return new updated list of followings
        const followings = await User.find({ _id: { $in: user.followings } });

        const formattedFollowings = followings.map(
        ({ _id, username, email, occupation, location, profilePhotoUrl }) => {
            return { _id, username, email, occupation, location, profilePhotoUrl };
        }
        );
 

  
      // Send real-time update to all connected clients
      req.io.emit("ADD_REMOVE_FOLLOWER", {
        followerId: user._id,
        followingId: body.followingId,
      });
  
      res.status(200).json(formattedFollowings);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  },
  
   /**================ searchUser ==================== */
   async getUsers({query}, res) {
    try { 
      const searchInput = query.searchInput
      const searchRegex = new RegExp(`^${searchInput}$|^${searchInput}|${searchInput}$|${searchInput}`, 'i');
      const users = await User.find({username: searchRegex})
                              .select('username occupation profilePhotoUrl')
                              .limit(5)
                              .exec();


      if (users.length > 0) {
        res.status(200).json(users)
      } else {
        res.status(404).json({ message: "No users found with the specified search term."})
      }
    } catch(err){
      res.status(500).json({ message: err.message})
    }
  }
}