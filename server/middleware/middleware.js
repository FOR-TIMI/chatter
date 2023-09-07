const { Comment, Post, User } = require("../model");
const sanitize = require("mongo-sanitize");

module.exports = {
  async isCommentAuthor({ params, body }, res, next) {
    const { commentId } = params;
    const { username } = body;

    const comment = await Comment.findById(commentId);

    if (!comment.username.equals(username)) {
      res
        .status(403)
        .json({ errorMsg: "Only the author can makeChanges to this comment" });
    }
    next();
  },

  async userNameExists({ body }, res, next) {
    const field = "username";

    if (body.username) {
      let { username } = body;
      username = username.toLowerCase();

      try {
        const user = await User.findOne({ username });
        if (!user) {
          return next();
        } else {
          return res.status(409).json({
            field,
            errorMsg: "Username already taken.",
          });
        }
      } catch (err) {
        res.status(500).json({
          field,
          errorMsg: "Something went wrong while checking if user exists",
        });
      }
    } else {
      return res
        .status(500)
        .json({
          errorMsg: "Missing field 'Username' from request body",
          feild,
        });
    }
  },

  async emailExists({ body }, res, next) {
    const field = "email";

    if (body.email) {
      let { email } = body;

      email = email.toLowerCase();

      try {
        const userEmail = await User.findOne({ email });

        if (!userEmail) {
          return next();
        } else {
          return res
            .status(409)
            .json({ errorMsg: "Email already taken", field });
        }
      } catch (err) {
        res.status(500).json({
          errorMsg: "Something went wrong while checking if user exists",
          field,
        });
      }
    } else {
      return res
        .status(500)
        .json({
          errorMsg: "Missing field 'Username' from request body",
          field,
        });
    }
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
        return res.status(404).json({ errorMsg: "Post not found" });
      }

      if (post.userId !== user.data._id) {
        return res.status(403).json({
          errorMsg: "You are not authorized to make changes to this post",
        });
      }

      next();
    } catch (err) {
      return res.status(500).json({ errorMsg: err.message });
    }
  },
};
