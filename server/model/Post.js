const { Schema, model } = require("mongoose");
const Comment = require("./Comment");
const { cloudinary } = require("../config/cloudinary");

const ImageSchema = new Schema({
  url: String,
  filename: String,
});

ImageSchema.virtual("thumbnail").get(function () {
  return this.url.replace("/upload", "/upload/w_200");
});

const postSchema = new Schema(
  {
    username: {
      type: String,
      required: "Username is required",
      trim: true,
      maxLength: 50,
      minlength: [8, "Username must be at least 8 characters long"],
      match: [
        /^[a-zA-Z0-9!\(\)\-\.\?\[\]\_\`\~\;\:\!\@\#\$\%\^\&\*\+\=]+$/,
        "Username can only contain letters, numbers, and the following special characters: !()-.[]_`~;:!@#$%^&*+=",
      ],
    },
    userId: {
      type: String,
      match: [
        /^[a-zA-Z0-9!\(\)\-\.\?\[\]\_\`\~\;\:\!\@\#\$\%\^\&\*\+\=]+$/,
        "userId can only contain letters, numbers, and the following special characters: !()-.[]_`~;:!@#$%^&*+=",
      ],
    },
    location: {
      type: String,
      trim: true,
      match: [
        /^[a-zA-Z0-9,\- ]+$/,
        "Location can only contain letters, numbers, commas, spaces and -",
      ],
    },
    caption: {
      type: String,
      required: "Caption is required",
      trim: true,
      maxLength: 250,
      minlength: 1,
      match: [
        /^[a-zA-Z0-9!\(\)\-\.\?\[\]\_\`\~\;\:\!\@\#\$\%\^\&\*\+\= ]+$/,
        "Caption can only contain letters, numbers,spaces and the following special characters: !()-.[]_`~;:!@#$%^&*+=",
      ],
    },
    postImageUrls: [ImageSchema],
    userProfilePhoto: {
      type: String,
      match: [
        /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})(\/[\w, \.-]*)*\/?(?:\.png)?$/,
        "Link is invalid",
      ],
    },
    likes: {
      type: Map,
      of: Boolean,
      default: {},
    },
    commentCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

postSchema.pre("remove", async function (next) {
  try {
    // Delete all comments related to that post
    await Comment.deleteMany({ postId: this._id });

    //Delete all images related to that post from cloud
    const images = this.postImageUrls;

    for (const image of images) {
      await cloudinary.uploader.destroy(image.filename);
    }
  } catch (err) {
    return next(err);
  }
  next();
});

const Post = model("Post", postSchema);

module.exports = Post;
