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
            
            const followers = await Promise.all(
                user.followers.map((id) => User.findById(id))
            )


            const formattedFollowers = followers.map(
                ({ _id, username, email, occupation, location, profilePhotoUrl}) => {
                     return { _id, username, email, occupation, location, profilePhotoUrl}
                }
            )


            
            res.status(200).json(formattedFollowers)

        } catch(err){
            res.status(404).json({ message: err.message })
        }
     },
    
    /**================ GET User Followings ==================== */
    async  getUserFollowings({params}, res){
        try{
            const { username } = params;
            const user = await User.findOne({ username });
            

            const followings = await Promise.all(
                user.followings.map((id) => User.findById(id))
            )



            const formattedFollowings = followings.map(
                ({ _id, username, email, occupation, location, profilePhotoUrl}) => {
                     return { _id, username, email, occupation, location, profilePhotoUrl}
                }
            )
            
            res.status(200).json(formattedFollowings)

        } catch(err){
            res.status(404).json({ message: err.message })
        }
    },


   /**================ to follow and Unfollow ==================== */
   async  addRemoveFollow({ params, body }, res) {
        try {
        const user = await User.findOne({ username: params.username });
        const following = await User.findById({ _id: body.followingId });

        // Check if the user is currently following this person
        if (user.followings.includes(body.followingId)) {
            // Remove following from user's following list
            await User.updateOne(
            { _id: user.id },
            { $pull: { followings: body.followingId } }
            );

            // Remove user from following's followers list
            await User.updateOne(
            { _id: following.id },
            { $pull: { followers: user.id } }
            );
        } else {
            // Add following to user's following list
            await User.updateOne(
            { _id: user.id },
            { $push: { followings: body.followingId } }
            );

            // Add user to following's followers list
            await User.updateOne(
            { _id: following.id },
            { $push: { followers: user.id } }
            );

            // Create a new notification for the user
            // const newNotification = {
            // sender: user.id,
            // recipient: following.id,
            // type: "follow",
            // read: false,
            // };

            // const notification = new Notification(newNotification);
            // await notification.save();
        }

        // Send real-time update to all connected clients
        io.emit("ADD_FOLLOWER", {
            user: user.username,
            following: following.username,
        });

        res.status(200).json({ message: "Success" });
        } catch (err) {
        res.status(404).json({ message: err.message });
        }
   }

}