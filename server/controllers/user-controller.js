const { User } = require('../model');

module.exports = {

    /**================ GET ONE USER ==================== */
     async getUser({params},res){
        try{
            const { username } = params;
            const user = await User.findOne({ username });

            //hide users password from frontend
            delete user.password

            res.status(200).json(user)
        } catch(err){
            res.status(404).json({ message: err.message })
        }
     },

    /**================ GET User Followers ==================== */
     async getUserFollowers({params}, res){
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
    async getUserFollowings({params}, res){
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



    //,addRemoveFollow
    async addRemoveFollow({ params, body},res){
        try{
            const user = await User.findOne({ username: params.username });
            const following = await User.findById({ _id : body.followingId})

            //Check if the user is currently following this person
            if(user.followings.includes(body.followingId)){
                user.followings = user.followings.filter((id) => id !== body.followingId)

                //update the person you're followings follower list
                following.followers = following.followers.filter((id) => id !== user.id)
            } else{
                //Add friend to friend list
                user.followings.push(body.followingId)

                //Update the person you're following's follower list
                following.followers.push(user.id)
             }
            
             //Save new version of the followings and followers
             await user.save();
             await following.save();

             //To return new updated list of friends
             const followings = await Promise.all(
                user.followings.map((id) => User.findById(id))
            )

            const formattedFollowings = followings.map(
                ({ _id, username, email, occupation, location, profilePhotoUrl}) => {
                     return { _id, username, email, occupation, location, profilePhotoUrl}
                }
            )
            
            res.status(200).json({ formattedFollowings })

        } catch(err){
            res.status(404).json({ message: err.message })
        }
    }


}