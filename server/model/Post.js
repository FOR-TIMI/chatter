const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");
const commentSchema = require("./Comment");

const ImageSchema = new Schema({
  url: {
    type: String,
    required: "url re",
  },
  filename: {
    type: String,
    required: "",
  },
});

//import comment schema

// ImageSchema.virtual('thumbnail').get(function(){
// 	return this.url.replace('/upload','/upload/w_200')
// })

const postSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: "You must add a title",
      minLength: 1,
      maxLength: 128,
    },
    images: [ImageSchema],
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [commentSchema],
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
);

postSchema.virtual("commentCount").get(function () {
  if (this.comments) return this.comments.length;
});

postSchema.virtual("likeCount").get(function () {
  if (this.likes) return this.likes.length;
});

const Post = model("Post", postSchema);

module.exports = Post;
