const { Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new Schema({
    username:{
        type: String,
        required: "Your username is required",
        unique: true,
        trim: true,
        maxlength: 30,
        minlength: 8
    },
    email: {
        type:String,
        unique:true,
        required: "Your email is required",
        match: [/.+@.+\..+/, "Must match an email address!"],
        trim:true,
    },
    password:{
        type: String,
        required: "Your password is required",
        minlength: 8,
        maxlength: 80
    },
    followings: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"           
        }
    ],
    followers:[
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    likedPosts:[
        {
            type: Schema.Types.ObjectId,
            ref: "Post"
        }
    ],
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Post"
        }
    ]
},{
    toJSON: {
        virtuals: true
    }
}



);

//middleware to create password
userSchema.pre("save", async function(next){
    //check if the user is updating password or creating a new password
    if(this.isNew || this.isModified("password")){
        try{
            const SALT_ROUND = 10;
            const salt = await bcrypt.genSalt(SALT_ROUND);
            this.password = await bcrypt.hash(this.password, salt);
            return next();
        } catch(error){
            return next(err);
        }
    }
    next();
})

//compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password){
    return bcrypt.compare(password, this.password);
}


// Number of followers
userSchema
    .virtual('followerCount')
    .get(function(){
        return this.followers.length
    })


// Number of following
userSchema
    .virtual('followerCount')
    .get(function(){
        return this.followings.length;
    });

const User = model('User',userSchema);

module.exports = User;

