const { Comment } = require("../model");

module.exports = {
    async isCommentAuthor({ params , body},res,next){
        const {commentId } = params;
        const { username } = body;

        const comment = await Comment.findById(commentId);

        if(!comment.username.equals(username)){
            res.status(403).json({ message: "Only the author can makeChanges to this comment"})
        }
        next();
    }
}