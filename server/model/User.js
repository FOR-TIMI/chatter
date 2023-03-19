const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: "Username is required",
      trim: true,
      unique: true,
      maxLength: 50,
      minlength: [8, "Username must be at least 8 characters long"],
      match: [
        /^[a-zA-Z0-9!\(\)\-\.\?\[\]\_\`\~\;\:\!\@\#\$\%\^\&\*\+\=]+$/,
        "Username can only contain letters, numbers, and the following special characters: !()-.[]_`~;:!@#$%^&*+=",
      ],
    },
    email: {
      type: String,
      unique: true,
      required: "Your email is required",
      match: [
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Email is invalid",
      ],
      trim: true,
    },
    password: {
      type: String,
      required: "Password is required",
      minlength: [8, "Password must be at least 8 characters long"]
    },
    followings: {
      type: Array,
      default: [],
    },
    followers: {
      type: Array,
      default: [],
    },
    profilePhotoUrl: {
      type: String,
      match: [
        /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})(\/[\w, \.-]*)*\/?(?:\.png)?$/,
        "Link is invalid",
      ],
      default: "https://i.stack.imgur.com/l60Hf.png",
    },
    location: {
      type: String,
      trim: true,
      match: [
        /^[a-zA-Z0-9,\- ]+$/,
        "Location can only contain letters, numbers, commas, spaces and -",
      ],
    },
    occupation: {
      type: String,
      trim: true,
      match: [
        /^[a-zA-Z0-9,\- ]+$/,
        "Occupation can only contain letters,numbers and characters -,",
      ],
    },
    viewedProfile: {
      type: Number,
      match: [/^[0-9]+$/, "viewedProfile can only contain numbers"],
    },
    impressions: {
      type: Number,
      match: [/^[0-9]+$/, "impressions can only contain numbers"],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

//middleware to create password
userSchema.pre("save", async function (next) {
  //check if the user is updating password or creating a new password
  if (this.isNew || this.isModified("password")) {
    try {
      const SALT_ROUND = 10;
      const salt = await bcrypt.genSalt(SALT_ROUND);
      this.password = await bcrypt.hash(this.password, salt);
      return next();
    } catch (error) {
      return next(err);
    }
  }
  next();
});

//To get follower count
userSchema.virtual("followerCount").get(function () {
  return this.followers.length;
});

//To get following count
userSchema.virtual("followingCount").get(function () {
  return this.followings.length;
});

//compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;
