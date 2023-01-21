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
            ,location
            ,occupation
         } = body
         const newUser = await User.create({
            username
            ,email
            ,password
            ,location
            ,occupation
            ,followings: []
            ,followers: []
            ,viewedProfile: Math.floor(Math.random() * 10000)
            ,impressions: Math.floor(Math.random() * 10000)
         });

         //Delete password 
         newUser.password = undefined;
         
         //Generate JWT
         const token= signToken(newUser);

 


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
         const {  email , password} = req.body;
         
         const user = await User.findOne({ email })

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

      //Delete password
      user.password = undefined;

     const token = signToken(user);

     res.status(200).json({ token, user})
      } catch(err){
         res
         .status(500)
         .json({error: err.message});
      }
   }

}


