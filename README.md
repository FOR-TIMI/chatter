<h1 align="center">CHATTER</h1>
<div align="center">
Welcome to Chatter, a social media application in the works that allows users to connect and interact with each other. 

</div> <br>

<p align="center">
 <img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge&logo=mit&logoColor=white""/>
 <img src="https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white"/>
 <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white"/>
 <img src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white"/>
</p>
<p align="center">
 <img src ="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB"/>
 <img src ="https://img.shields.io/badge/Mongoose-Mongoose-red?style=for-the-badge&logo=mongoose&logoColor=%2361DAFB"/>
 <img src="https://img.shields.io/badge/Nodemon-Nodemon-green?style=for-the-badge&logo=nodemon&logoColor=%2361DAFB">
</p>
<p align="center">
 <img src ="https://img.shields.io/badge/API-REST%20API-orange?style=for-the-badge&logo=rest&logoColor=%2361DAFB"/>
 <img src="https://img.shields.io/badge/Insomnia-5849be?style=for-the-badge&logo=Insomnia&logoColor=white"/>
</p>

<p align="center">
 <img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white"/>
 <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"/>
</p>

<p align="center">
 <img src="https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white"/>
</p>

## Support the project ⭐
If you feel awesome and want to support us in a small way, please consider checking out our other projects, starring and sharing this repo! This helps us getting known and grow the community. 🙏

## Table of Contents
- [Introduction](#introduction)
- [Installation](#installation)
- [User Story](#user-story)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Security Measures](#security-measures)
- [Deployment](#deployment)
- [Screenshots](#screenshots)
- [Questions](#questions)

## Introduction
  Chatter is a social media application that allows users to interact with one another by posting, commenting, and liking posts. The application was created by Femi-Ladiran Erifeoluwa (also known as Timi) and Oghenebrume Akpadaka (also known as Brume).
  Our goal with Chatter is to provide a platform for users to connect with one another and share their thoughts, ideas, and experiences. The user-friendly interface and sleek design make it easy for users to navigate and engage with the community.

## Installation
  To setup and use this project on your device, follow these steps;
  1. Make sure you have [MongoDB](https://www.mongodb.com/docs/manual/installation/) installed or create an account on [MongoDb Atlas](https://www.mongodb.com/cloud/atlas/register?utm_content=rlsavisitor&utm_source=google&utm_campaign=search_gs_pl_evergreen_atlas_core_retarget-brand_gic-null_amers-us-ca_ps-all_desktop_eng_lead&utm_term=cloud%20mongodb%20atlas&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=14291004479&adgroup=128837427307&cq_cmp=14291004479&gclid=CjwKCAiA2rOeBhAsEiwA2Pl7Q8gWedkZEkE_3UVhWbNLQDxsTq_ybqDnpdLVh2cHMN3tWNTCTomjYBoCHvgQAvD_BwE). 
   <br>Note: If you're using MongoDb Atlas, create a cluster, set ip address to `0.0.0.0` to allow the database to be accessible from anywhere and then copy the MongoDB URI.
  2. Clone this repository.
     - ![image](https://user-images.githubusercontent.com/104241247/213948144-81da9a6f-736e-46be-b561-d508cf4e91d6.png)
  3. Install dependencies by running the `npm install` command in the command line
  
  4. Open your code editor by running the command `code .`
  
  5. Create a [cloudinary](https://cloudinary.com/) account. your `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_KEY` & `CLOUDINARY_SECRET` for your .env would be generated there. Then create a folder called `chatter` on the cloudinary website to store all project images from chatter.
  
  6. create a `.env` file in the server folder for your environment variables. Follow the [sample](https://github.com/FOR-TIMI/chatter/blob/main/server/.env.sample) file. If you used MongoDB atlas, set `MONGODB_URI` to the url generated from Mongo Atlas that looks like `mongodb+srv://[username:password@]host[/[database][?options]]
`. <br><br>
 Note: The parts in square brackets are optional. The username and password are used for authentication, the host is the domain name of the Atlas cluster, and the database is the name of the database to connect to. The options are additional options to configure the connection.
 7. (optional) To have some seed data, you can run `npm run seed` in the terminal.
 8. To run the application on your local machine, you can run the `npm run develop` command which starts up the server as well as the react scripts.
 9. Finally, open [This Link](http://localhost:3000/) and see the beautiful application.


  
## User Story
  As a user, I want to be able to share my thoughts, ideas, and experiences with other users in real-time. 
  I want to be able to post, comment, and interact with other users in a safe and secure environment. 
  I also want to have access to a wide range of features and tools that will help me connect and engage with other users more effectively.

## Technologies Used
- MongoDB: A powerful and flexible NoSQL database that allows Chatter to store and retrieve data efficiently and quickly.
- Mongoose ODM: A powerful Object Data Modeling (ODM) library that simplifies interactions between MongoDB and the Chatter application.
- Express: A lightweight framework for building web applications and APIs that allows Chatter to handle HTTP requests and responses.
- Node: A powerful runtime environment that allows Chatter to run JavaScript code on the server-side.
- React: A powerful JavaScript library for building user interfaces that allows Chatter to provide a dynamic and responsive user experience.
- Material-UI: A popular UI library that provides a wide range of Material Design components for building beautiful and responsive user interfaces.

## Features
- Login and Signup: Users can create an account and log in to the application with their username and password.
- Profile: Users can view and edit their profile information, including their name, email, and bio.
- Home: The home page allows users to view and interact with other users' posts, including commenting, liking, and sharing.
- Search: Users can search for other users by name or username, allowing them to connect and interact with people they know.

   
## Security Measures
Chatter has implemented a number of security measures to ensure that users' data is kept safe and secure. These measures include:
 - CORS (Cross-Origin Resource Sharing): A security mechanism that allows Chatter to restrict access to its APIs based on the origin of the request.
 - Helmet: A library that sets various HTTP headers to help protect against common security threats.


## Deployment
Chatter is currently deployed on Heroku and can be accessed at the deployed link: <br> https://nameless-basin-36851.herokuapp.com/

## Screenshots
  - ### Login Page: 
   ![image](https://user-images.githubusercontent.com/104241247/211673290-b26544d6-38a7-4645-a8ab-865ab791bfd6.png)
   The login page allows users to enter their username and password to access the application.

  - ### Signup Page:
  ![image](https://user-images.githubusercontent.com/104241247/211673425-f61f7591-b805-4df2-9612-a27838fd6a66.png)
   The signup page allows users to create an account that they can use to interact with other users.

  - ### HomePage
  ![image](https://user-images.githubusercontent.com/104241247/211663467-157eee0a-4d07-4fa6-9c77-051ddee65443.png)
   The home page allows users to see their friend's posts and interact with the post by liking and so on
  - ### ProfilePage
  ![image](https://user-images.githubusercontent.com/104241247/211663684-75459c57-2440-479e-a4fc-9c2886b9f079.png)
  The profile page allows users to see another user's profile. This includes their posts, follower count and many more.




## questions
For additional questions contact me via email on [femiladiranerife24@gmail.com](mailto:femiladiranerife24@gmail.com) or [view some other projects](https://github.com/FOR-TIMI/).
