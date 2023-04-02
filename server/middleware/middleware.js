const { Comment, Post } = require("../model");
const sanitize = require("mongo-sanitize");

module.exports = {
  async isCommentAuthor({ params, body }, res, next) {
    const { commentId } = params;
    const { username } = body;

    const comment = await Comment.findById(commentId);

    if (!comment.username.equals(username)) {
      res
        .status(403)
        .json({ message: "Only the author can makeChanges to this comment" });
    }
    next();
  },

  sanitizeMiddleware(req, res, next) {
    // Sanitize the request body, query string, and parameters
    req.body = sanitize(req.body);
    req.query = sanitize(req.query);
    req.params = sanitize(req.params);

    // Call the next middleware function
    next();
  },

  async isPostAuthor({ params, user }, res, next) {
    try {
      const post = await Post.findById(params.id);

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      if (post.userId !== user.data._id) {
        return res.status(403).json({
          message: "You are not authorized to make changes to this post",
        });
      }

      next();
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
};
