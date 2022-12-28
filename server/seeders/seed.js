const faker = require('faker');
const db = require('../config/db');


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
        const location = faker.address.city();
        const occupation = faker.commerce.department();
        const followings = []
        const followers = []
        const profilePhotoUrl = `https://i.pravatar.cc/150?u=${Math.floor(Math.random() * 10000)}`
        
        
        //Database users
        const user  = await User.create({ 
            username
            ,email
            ,password
            ,followings
            ,followers 
            ,location
            ,profilePhotoUrl
            ,occupation
            ,viewedProfile: Math.floor(Math.random() * 10000)
            ,impressions: Math.floor(Math.random() * 10000)
        });
        //Local array
        createdUsers.push(user);
    }
    console.log('\n ----- Added Users ----- \n ');
    


     // create Posts
    let createdPosts = [];

  for(let i=0; i < 20; i++){

    /**
     * Make random 10 character titles for posts
     */
    const postImageUrls = [
        `https://i.pravatar.cc/500?u=${Math.floor(Math.random() * 10000)}`
        ,`https://i.pravatar.cc/500?u=${Math.floor(Math.random() * 10000)}`
        ,`https://i.pravatar.cc/500?u=${Math.floor(Math.random() * 10000)}`
    ]
   

    const caption = faker.lorem.words(Math.round(Math.random() * 10) + 1);
  
    /**
     * get a random user from the createdUser array
     */
    const randomUserIndex = Math.floor(Math.random() * createdUsers.length);
    const {location, profilePhotoUrl: userProfilePhoto, username} = createdUsers[randomUserIndex];
    

    /**
     * create a post
     */
    const createdPost = await Post.create({
        username, 
        location,
        caption,
        userProfilePhoto,
        postImageUrls 
      })
   

    /**
     * Add to the list of created posts
     */
    createdPosts.push(createdPost);
  }

  console.log('\n ----- Added Posts ----- \n');



 process.exit(0);

})