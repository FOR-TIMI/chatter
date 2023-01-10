const db = require('../config/db');
const users = require('./users');


//Models
const  { Post, User } = require('../model');




function getRandomCaption() {
  // create a copy of the captions array
  const captions = [
    "Making memories that will last a lifetime!",
    "Feeling grateful for this beautiful day!",
    "Life is too short to not chase your dreams!",
    "Trying out this new restaurant and loving it!",
    "Hiking through the mountains with my besties!",
    "Feeling inspired by the sights and sounds of the city!",
    "Enjoying some much-needed relaxation at the beach!",
    "Making the most of every moment with my loved ones!"
  ]
  // select a random index from the copy
  const randomIndex = Math.floor(Math.random() * captions.length);
  // remove the selected caption from the copy
  const selectedCaption = captions.splice(randomIndex, 1)[0];
  // return the selected caption
  return selectedCaption;
}



db.once('open', async () => {

    //Delete all current users and posts in the database

    const oldUsers = db.collection('users')
    await oldUsers.drop();

    console.log('\n=============DELETED ALL CURRENT USERS=================\n')

   const oldPosts = db.collection('posts')
   await oldPosts.drop()


 console.log('\n=============DELETED ALL CURRENT POSTS=================\n')


    const createdUsers = []


    //Create users
    for(let user of users){
      const newUser = await User.create(user)
      createdUsers.push(newUser)
    }


    console.log('\n===================CREATED USERS=======================\n')


  for(let i=0; i < 5; i++){

    /**
     * Make random 10 character titles for posts
     */
    const postImageUrls = [
        {
          url: `https://res.cloudinary.com/diskudcr3/image/upload/c_scale,h_521/v1672524602/chatter/gvvxsfb3v5l76csavwzk.png`,
          filename: "chatter/gvvxsfb3v5l76csavwzk.png"
        }
    ]

    if(i % 2 === 0){
      postImageUrls.unshift({
        url: 'https://res.cloudinary.com/diskudcr3/image/upload/c_scale,h_521/v1672524603/chatter/ftdouuixfhvefz5vdgom.png',
        filename: "/chatter/ftdouuixfhvefz5vdgom.png"
      })
    }
   

    const caption = getRandomCaption();
  
    /**
     * get a random user from the createdUser array
     */
    const randomUserIndex = Math.floor(Math.random() * createdUsers.length);
    const {location, profilePhotoUrl: userProfilePhoto, username, _id:userId} = createdUsers[randomUserIndex];
    
    
    
    /**
     * create a post
    */
    await Post.create({
        username, 
        userId,
        location,
        caption,
        userProfilePhoto,
        postImageUrls,
        likes: {}
      })   
  }
  
  console.log('\n====================CREATED POSTS=======================\n')

  
  

 process.exit(0);

})