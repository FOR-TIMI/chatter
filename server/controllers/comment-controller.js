const { Comment, Post} = require('../model')


module.exports = {
    /**========ADD COMMENT============== */
    async addComment({params, body}, res){
        const { postId } = params;
        const { username, userProfilePhoto, userId, commentBody} = body;

        try{
            const newComment = await Comment.create({
                username,
                userId,
                userProfilePhoto,
                commentBody,
                likes: {},
                postId
            })

            const comments = await Comment.find({ postId })

            const post = await Post.findById(postId)

            res.status(200).json({ post, comments});
        } catch(err){
            res.status(500).json({ message: err.message})
        }
    },

    /**========REMOVE COMMENT===========*/
    async removeComment({params}, res){
        const { commentId, postId} = params;

        await Comment.findByIdAndDelete(commentId);

        const comments = await Comment.find({postId });

        res.status(200).json(comments)
    },

    /**========UPDATE A COMMENT============== */
    async updateComment({params, body}, res){
        const { commentId } = params;

        const comment = await Comment.findByIdAndUpdate(commentId,body,{ new: true})
        res.status(201).json(comment);
    },

    /**========GET ALL COMMENTS============== */
    async getComments({params},res){    
        const { postId } = params;
        try{
            const comments = await Comment.find({ postId });
            res.status(200).json(comments);
        } catch(err){
            res.status(500).json({ err: err.message})
        }
    },

    /**========LIKE AND UNLIKE A COMMENT============ */
    async addRemoveCommentLike({params,body},res){
        try{
           
            const { commentId:id } = params;
            const { username } = body;

            const comment = await Comment.findById(id);
            const isLiked = comment.likes.get(username);

            if(isLiked){
                comment.likes.delete(username); // remove user from the object
            } else{
                comment.likes.set(username, true) // like if the user already likes the comment
            }

            const updatedComment = await Comment.findByIdAndUpdate(
                 id,
                {likes: comment.likes},
                {new: true}
            )

            res.status(200).json(updatedComment);
        } catch(err){
            res.status(404).json({message: err.message})
        }
    },
}