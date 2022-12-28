const { User } = require('../model');
const { signToken } = require('../middleware/jwt-config')


module.exports = {

   /**==========REGISTER USER============ */ 
   async register({body},res){
      try{
         const {
            username
            ,email
            ,password
            ,followings
            ,followers
            ,location
            ,occupation
         } = body
         const newUser = await User.create({
            username
            ,email
            ,password
            ,followings
            ,followers
            ,location
            ,occupation
            ,viewedProfile: Math.floor(Math.random() * 10000)
            ,impressions: Math.floor(Math.random() * 10000)
         });

         //Generate JWT
         const token= signToken(newUser);

         //Delete password 
         delete newUser.password;

         res.status(201).json({ token, newUser })
      } catch(err){
         res
         .status(500)
         .json({error: err.message});
      }
   },

   /**==========Login USER============ */ 
   async login(req,res){
      try{
         const { username = '', email = '', password} = req.body;
         
         const user = await User.findOne({ $or: [
            {email},
            {username}
        ]})

        if(!user){
         return res
         .status(404)
         .json({ message: "User does not exist"})
        }
     
     //password check
     const isValidPasword = await user.isCorrectPassword(password);

     //Invalid password
     if(!isValidPasword){
         return res
         .status(400)
         .json({ message: "Invalid credentials"})
     }

     const token = signToken(user);

     //Delete password
     delete user.password;

     res.status(200).json({ token, user})
          

     return res.status(201).json(token);

      } catch(err){
         res
         .status(500)
         .json({error: err.message});
      }
   }

}


