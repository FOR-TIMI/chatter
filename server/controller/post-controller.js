const { User, Post } = require('../model');

const postController = {
    //Add Like to a post
     /**
     * method: PUT
     * /posts/:postId/likes
     */
    async addLike({body}, res){
        try{
            const user = await User.findOneAndUpdate(
                {_id: body.userId},
                { $addToSet: { likedPosts: { _id : body.postId } }},
                { new: true }
              )
            if(!user){
                return res.status(404).json({message: "Couldn't find that user"})
            }
            const updatedPost = await Post.findOneAndUpdate(
                { _id: body.postId },
                { $addToSet: { likes: { _id: body.userId } } },
                { new: true }
            )

            if(!updatedPost){
                return res
                        .status(404)
                        .json({ message: "Couldn't find the post you're trying to like"})
            }
    
            res.json(updatedPost)
        } catch(error){
            res.status(500).json({ error })
        }
    },

    //unLike a post
    /**
     * method: DELETE
     * /posts/:postId/likes
     */
    async removeLike({body}, res){
        //update user's likedPosts
        await User.findOneAndUpdate(
            {_id: body.userId},
            {$pull :{likedPosts: body.postId}},
            {new: true}
        )

        const updatedPost =  await Post.findOneAndUpdate(
            {_id: body.postId},
            {$pull :{likes: body.userId}},
            {new: true}
          )

          return res.json(updatedPost)
    }
}