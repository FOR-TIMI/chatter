const{ Post, User } = require('../model');

 
module.exports = {

    /*===============Make a new post====================*/
    async createPost({body, files},res){
        try{
            const { username , caption } = body;
            const { location, profilePhotoUrl: userProfilePhoto, _id } = await User.findOne({ username })

            
            if(!_id){
                return res.status(404).json({ message: "User not found"})
            }
            
            const fileArr = files.map(obj => ({ url : obj['path'], filename : obj['filename']})) || undefined
            
            await Post.create({
                userId: _id,
                username, 
                location,
                caption,
                userProfilePhoto,
                likes: {},
                comments: [],
                postImageUrls: fileArr
            })


            const posts = await Post.find().sort({ createdAt: -1});
            return res.status(201).json(posts)
        } catch(err){
            res.status(409).json({message: err.message})
        }
    },

    /*===============Get ALL posts====================*/
    async getFeedPosts({query},res){
        try{
            const { page = 1, limit = 2 } = query;
            const skip = (page - 1) * limit;
      
            const posts = await Post.find()
              .sort({ createdAt: -1 })
              .skip(skip)
              .limit(limit);

            const updatedPosts = [...posts]
      
              for (const post of updatedPosts) {
                  if(post.likes.keys()){
                      const likes = [...post.likes.keys()].slice(0, 4);
                      const users = await User.find({
                        username: { $in: likes },
                      }).select("username profilePhotoUrl");
                      post.likedUsers = users;
                  }
              }

                const totalPosts = await Post.countDocuments();
                const totalPages = Math.ceil(totalPosts / limit);

                res.status(200).json({
                    posts: updatedPosts,
                    hasMore: page > 0 && page < totalPages 
                });
        } catch(err){
            res.status(404).json({message: err.message})
        }
    },

    /*===============Get User posts====================*/
    async getUserPosts({params},res){
        try{
            const posts = await Post.find({ username: params.username}).sort({ createdAt: -1});
            res.status(200).json(posts);
        } catch(err){
            res.status(404).json({message: err.message})
        }
    },

    /*===============GET A POST'S LIKES====================*/
    async getPostLikes({params},res){
        try{
            const { id } = params
            const post = await Post.findById(id);

            if(!post){
                return res.status(404).json({ message: "This post has does not exist"})
            }
            
            const likes = [...post.likes.keys()].slice(0,4);
          
           const users = await User.find({
            username: { $in: likes }
           }).select('username profilePhotoUrl')
    
           res.status(200).json(users)
            
        } catch(err){
            res.status(404).json({message: err.message})
        }
    },


    /*===============lIKE AND UNLIKE A POST====================*/
    async addRemoveLike({params,body},res){
        try{
           
            const { id } = params;
            const { username } = body;

            const post = await Post.findById(id);
            const isLiked = post.likes.get(username);

            if(isLiked){
                post.likes.delete(username); // remove user from the object
            } else{
                post.likes.set(username, true) // like if the user already likes the post
            }

            const updatedPost = await Post.findByIdAndUpdate(
                id,
                {likes: post.likes},
                {new: true}
            )

            res.status(200).json(updatedPost);
        } catch(err){
            res.status(404).json({message: err.message})
        }
    },

}