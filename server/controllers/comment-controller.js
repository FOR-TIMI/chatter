const { Comment} = require('../model')


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
                postId
            })

            const allComments = await Comment.find({ postId }).sort({ createdAt: -1});

            res.status(200).json(allComments)
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
    }

}