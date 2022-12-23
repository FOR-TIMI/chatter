const { User, Post } = require("../model");

const userController = {
  //To get All Users
  /**
   * Expect :
   * {
   *  Method: GET,
   *  EndPoint: '/'
   *  Route: '/api/users'
   * }
   */
  async getAllUsers(req, res) {
    try {
      const users = await User.find()
        .populate({
          path: "followers",
          select: "-__v -password",
        })
        .populate({
          path: "followings",
          select: "-__v -password",
        })
        .populate({
          path: "posts",
          select: "-__v",
        })
        .populate({
          path: "likedPosts",
          select: "-__v",
        })
        .select("-__v -password");
      if (!users.length) {
        return res.status(404).json({ message: "There are no users yet" });
      }
      res.json(users);
    } catch (error) {
      res
        .status(500)
        .json({ message: "something went wrong with the server", error });
    }
  },

  //To get a User
  /**
   * Expect :
   * {
   *  Method: GET,
   *  EndPoint: '/:id'
   *  Route: '/api/users/:id'
   * }
   */
  async getUser({ params }, res) {
    try {
      const user = await User.findOne({ _id: params.id })
        .populate([
          {
            path: "followers",
            select: "username",
          },
          {
            path: "followings",
            select: "username",
          },
          {
            path: "likedPosts",
            select: "author title images",
          },
          {
            path: "posts",
            select: "title images",
          },
        ])
        .select("-__v");

      if (!user) {
        return res.status(404).json({
          message: "User not found with that id",
        });
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  //create user
  /**
   * Expect :
   * {
   *  Method: POST,
   *  EndPoint: '/'
   *  Route: '/api/users'
   * }
   */
  async createNewUser({ body }, res) {
    const { username, email, password } = body;
    if (username && email && password) {
      try {
        const user = await User.create(body);
        res.json(user);
      } catch (error) {
        res
          .status(500)
          .json({ message: "something went wrong with the server", error });
      }
    } else {
      res.status(422).json({
        message: "Invalid fields",
        "possible Solution":
          "make sure that the username,email and password fields are not NULL",
      });
    }
  },

  //update user
  /**
   * Expect :
   * {
   *  Method: PUT,
   *  EndPoint: '/:id'
   *  Route: '/api/users/:id'
   * }
   */
  async updateUser({ params, body }, res) {
    try {
      const user = await User.findOneAndUpdate({ _id: params.id }, body, {
        new: true,
        runValidators: true,
      });

      if (!user) {
        return res.status(404).json({ message: "Couldn't find that user" });
      }

      res.json(user);
      return;
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete user
  /**
   * Expect :
   * {
   *  Method: DELETE,
   *  EndPoint: '/:id',
   *  Route: '/api/users/:id'
   * }
   *
   */
  async deleteUser({ params }, res) {
    try {
      const deletedUser = await User.findByIdAndDelete({ _id: params.id });

      //Remove the deleted user from the follower list of all the people they currentlly follow
      const followings = await User.updateMany(
        { _id: { $in: deletedUser.followings } },
        { $pull: { followers: deletedUser._id } }
      );

      //Remove the deleted user from the following list of all the people that follow them
      const followers = await User.updateMany(
        { _id: { $in: deletedUser.followers } },
        { $pull: { followings: deletedUser._id } }
      );

      //Remove likes from liked posts
      const likedPosts = await Post.updateMany(
        { _id: { $in: deletedUser.likedPosts } },
        { $pull: { likes: deletedUser._id } }
      );

      //Remove all the Posts related to that user
      const deletedPosts = await Post.remove({
        _id: {
          $in: deletedUser.posts,
        },
      });
      res.json({ deletedUser, deletedPosts });
    } catch (error) {
      res
        .status(404)
        .json({ message: "No user was found with this id", error });
    }
  },

  // To Follow another user
  /**
   * Expect :
   * {
   *  Method: PUT ,
   *  EndPoint: '/:userId/following'
   *  Route: '/api/users/:userId/following'
   *
   *  Expect body toBe
   *  {
   *      followingId: "245346357zxvbxcg"
   *  }
   * }
   *
   * TODO: WHEN A USER IS SIGNED IN USE PUT `/user/following/:followingId`. THE USER ID WILL COME FROM `req.session.user`
   *
   */
  async addFollow({ params, body }, res) {
    //To make sure users and pserson you're following's id's are included in the params and body
    if (!params.userId || !body.followingId) {
      return res.status(400).json({
        message:
          "You the userId parameter or the followingId field is missing ",
      });
    }

    //To make sure user;s cannot follow themselves
    if (params.userId === body.followingId) {
      return res
        .status(400)
        .json({ message: "User cannot unfollow themselves" });
    }

    try {
      //To update the person i'm following's follower list
      const followedUser = await User.findOneAndUpdate(
        { _id: body.followingId },
        { $addToSet: { followers: params.userId } },
        { new: true }
      );

      if (!followedUser) {
        return res
          .status(404)
          .json({ message: "Could not find the user you're trying to follow" });
      }

      //update my following list and userImFollowing's follower list
      //To update my following list
      const updatedUser = await User.findOneAndUpdate(
        { _id: params.userId },
        { $addToSet: { followings: body.followingId } },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "Couldn't find that user" });
      }

      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  //To unfollow another user
  /**
   * Expect :
   * {
   *  Method: DELETE ,
   *  EndPoint: '/'
   *  Route: '/api/users/:userId/following/:followingId'
   * }
   * TODO: WHEN A USER IS SIGNED IN USE DELETE `/user/following/:followingId`. THE USER ID WILL COME FROM `req.session.user`
   */
  async removeFollow({ params, body }, res) {
    if (!params.userId || !body.followingId) {
      return res.status(400).json({
        message:
          "You the userId parameter or the followingId field is missing ",
      });
    }

    if (params.userId === body.followingId) {
      return res
        .status(400)
        .json({ message: "User cannot unfollow themselves" });
    }

    try {
      //To update the person i'm unfollowing's follower list
      const unfollowedUser = await User.findOneAndUpdate(
        { _id: body.followingId },
        { $pull: { followers: params.userId } },
        { new: true }
      );

      if (!unfollowedUser) {
        return res.status(404).json({
          message: "Could not find the user you're trying to unfollow",
        });
      }

      //update my following list and userImFollowing's follower list
      //To update my following list
      const updatedUser = await User.findOneAndUpdate(
        { _id: params.userId },
        { $pull: { followings: body.followingId } },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "Couldn't find that user" });
      }

      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};

module.exports = userController;
