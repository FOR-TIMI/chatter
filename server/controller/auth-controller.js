const { User} = require('../model')

const authController = {
    // Register User 
    async register(req,res){
        const { username, email, password } = req.body;

        if (username && email && password) {
          try {
            const user = await User.create(req.body);
            res.json(user);
          } catch (error) {
            res
              .status(500)
              .json({ message: "something went wrong with the server", error: error.message });
          }
        } else {
          res.status(422).json({
            message: "Invalid fields",
            "possible Solution":
              "make sure that the username,email and password fields are not NULL",
          });
        }
    },


    //Login User
    async login(req,res){
        const { email, username, password} = req.body;

        if (username || email && password) {
            try{
                const user = await User.findOne({ $or: [
                    {email},
                    {username}
                ]})

                if(!user){
                    return res.status(404).json({ message: "No user found with this email or username"})
                }
                
    
                

                //password check
                const isValidPasword = await user.isCorrectPassword(password);

                //Invalid user
                if(!isValidPasword){
                    return res
                    .status(400)
                    .json({ message: "Incorrect credentials"})
                }


                return res.json({ user , isAuthenticated: true});
                
            } catch(error){
                res.status(500).json(({ error: error.message }))
            }
        } else{ 
            res.status(422).json({
                message: "Invalid fields",
                "possible Solution":
                  "make sure that the username,email and password fields are not NULL",
            }); 
        }


    }
}


module.exports = authController

