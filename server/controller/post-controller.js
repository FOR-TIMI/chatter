const { User, Post } = require("../model");

const postController = {
  //Get all posts
  /**
   * method: GET
   * /posts
   */
  async getAllPosts(req, res) {
    try {
      const posts = await Post.find()
        .populate({
          path: "author",
          select: "-__v ",
        })
        .populate({
          path: "likes",
          select: "-__v ",
        })
        .select("-__v")
        .sort("-createdAt");
      if (!posts.length) {
        return res.status(404).json({ message: "There are no posts yet" });
      }
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  //To get a Post
  /**
   * Expect :
   * {
   *  Method: GET,
   *  EndPoint: '/:id'
   *  Route: '/api/posts/:id'
   * }
   */
  async getPost({ params }, res) {
    try {
      const post = await Post.findOne({ _id: params.id })
        .populate({
          path: "author",
          select: "-__v",
        })
        .populate({
          path: "likes",
          select: "-__v",
        })
        .select("-__v");
      if (!post.length) {
        return res.status(404).json({ message: "This post does not exist" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  //create Post
  /**
   * Expect :
   * {
   *  Method: POST,
   *  EndPoint: '/'
   *  Route: '/api/posts'
   * }
   */
  async createNewPost({ body }, res) {
    try {
      const post = await Post.create(body);
      res.status(201).json(post);
    } catch (error) {
      res
        .status(500)
        .json({ message: "something went wrong with the server", error });
    }
  },

  //update post
  /**
   * Expect :
   * {
   *  Method: PUT,
   *  EndPoint: '/:id'
   *  Route: '/api/posts/:id'
   * }
   */
  async updatePost({ params, body }, res) {
    try {
      const post = await Post.findOneAndUpdate({ _id: params.id }, body, {
        new: true,
        runValidators: true,
      });

      if (!post) {
        return res.status(404).json({ message: "Couldn't find that post" });
      }

      res.json(post);
      return;
    } catch (error) {
      res.status(500).json(err);
    }
  },

  // Delete post
  /**
   * Expect :
   * {
   *  Method: DELETE,
   *  EndPoint: '/:id',
   *  Route: '/api/posts/:id'
   * }
   *
   */
  async deletePost({ params }, res) {
    try {
      const deletedPost = await Post.findByIdAndDelete({ _id: params.id });

      if (!deletedPost) {
        return res
          .status(404)
          .json({ message: "Couldn't find that post you're trying to delete" });
      }

      //Remove the deleted post from the post list of author
      const posts = await User.updateOne(
        { _id: deletedPost.author },
        { $pull: { posts: deletedPost._id } }
      );
      res.json({ deletedPost });
    } catch (error) {
      res
        .status(404)
        .json({ message: "No post was found with this id", error });
    }
  },

  //Add Like to a post
  /**
   * method: PUT
   * /posts/:postId/likes
   *
   * body={
   * "userId": "1234234653457583e46"
   * }
   */
  async addLike({ body, params }, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: body.userId },
        { $addToSet: { likedPosts: { _id: params.postId } } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: "Couldn't find that user" });
      }
      const updatedPost = await Post.findOneAndUpdate(
        { _id: params.postId },
        { $addToSet: { likes: { _id: body.userId } } },
        { new: true }
      );

      if (!updatedPost) {
        return res
          .status(404)
          .json({ message: "Couldn't find the post you're trying to like" });
      }

      res.json(updatedPost);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  //unLike a post
  /**
   * method: DELETE
   * /posts/:postId/likes
   */
  async removeLike({ body, params }, res) {
    //update user's likedPosts
    await User.findOneAndUpdate(
      { _id: body.userId },
      { $pull: { likedPosts: params.postId } },
      { new: true }
    );

    const updatedPost = await Post.findOneAndUpdate(
      { _id: params.postId },
      { $pull: { likes: body.userId } },
      { new: true }
    );

    return res.json(updatedPost);
  },
};

module.exports = postController;
