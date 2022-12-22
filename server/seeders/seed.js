const faker = require('faker');
const db = require('../config/connection');

//Models
const  { Post, User } = require('../model');

db.once('open', async () => {

    //Delete all current users and posts in the database

    await User.deleteMany({});
    console.log('\n ----- Deleted all current Users ----- \n ');

    await Post.deleteMany({});
    console.log('\n ----- Deleted all current Posts ----- \n ');






    //created user data
    const createdUsers = [];

    for (let i = 0; i < 10; i += 1) {
        const username = faker.internet.userName();
        const email = faker.internet.email(username);
        const password = faker.internet.password();
        
        
        //Database users
        const user  = await User.create({ username, email, password});
        //Local array
        createdUsers.push(user);
    }
    console.log('\n ----- Added Users ----- \n ');
    

    //create followers & followings
     
    for(let i=0; i < 10; i++){

        const randomUserIndex = Math.floor(Math.random() * createdUsers.length);
        const {  _id: userId  } = createdUsers[randomUserIndex];
    
        //Get random people to follow
        const randomFollowingIndex = Math.floor(Math.random() * createdUsers.length);
        
        
        let followingId = createdUsers[randomFollowingIndex]
        let followerId = userId
    

        while(followerId === userId){
        const randomFollowerIndex = Math.floor(Math.random() * createdUsers.length);
        followerId = createdUsers[randomFollowerIndex]
        }

        await User.updateOne({ _id: userId }, { $addToSet: { followers: followerId, followings : followingId  } });
    }
    console.log('\n ----- Added Followers and following ----- \n');


     // create Posts
  let createdPosts = [];

  for(let i=0; i < 20; i++){

    /**
     * Make random 10 character titles for posts
     */
    const title = faker.lorem.words(Math.round(Math.random() * 10) + 1);
  
    /**
     * get a random user from the createdUser array
     */
    const randomUserIndex = Math.floor(Math.random() * createdUsers.length);
    const {_id: userId} = createdUsers[randomUserIndex];

    //set author to the users Id
    const author = userId
    

    /**
     * create a post
     */
    const createdPost = await Post.create({ title, author});
   
    /**
     * Add post id to the posts field in the user's data
     */
    await User.updateOne(
       {_id: userId},
       {$push: { posts: createdPost._id}}
    )
    /**
     * Add to the list of created posts
     */
    createdPosts.push(createdPost);
  }

  console.log('\n ----- Added Posts ----- \n');


//Create Comments

  for(let i=0; i <10; i++){
    /**
     * Make random comment texts
     */
    const commentText = faker.lorem.words(Math.round(Math.random() * 20) + 1);
    
      
    /**
     * get a random user from the createdUser array
     */
    const randomUserIndex = Math.floor(Math.random() * createdUsers.length);
    const { _id : author } = createdUsers[randomUserIndex];

      
    /**
     * get a random post from the createdPost array
     */
    const randomPostIndex = Math.floor(Math.random() * createdPosts.length);
    const { _id : postId } = createdPosts[randomPostIndex];
  
    /**
     * add comments to a Post
     */
    await Post.updateOne(
      { _id: postId },
      { $push: { comments: { commentText,author }}},
      { runValidators: true }
    )
  }

 

console.log('\n ----- Added Comments ----- \n');



    /**
     *  Add Likes
     * */ 
    for(let post of createdPosts){
        for(let i=0; i < 10; i++){
            /**
             * get a user from the createdUser array
             */
            const { _id : userId } = createdUsers[i];

            

            /**
             * get a random post from the createdPost array
             */
            const randomPostIndex = Math.floor(Math.random() * createdPosts.length);
            const { _id : postId } = createdPosts[randomPostIndex];
            
            /**
             * Add unique like to a post
             */
            await Post.updateOne(
                { _id: postId },
                { $addToSet : { likes : userId}},
                { runValidators: true }
            )

            /**
             * Add to a user's liked posts
             */
            await User.updateOne(
                { _id: userId},
                { $addToSet:{ likedPosts: postId}},
                { runValidators: true }
            )
        }
    }


 console.log('\n ----- Added likes ----- \n');

 console.log('\n ----- all done! ----- \n');

 process.exit(0);

})