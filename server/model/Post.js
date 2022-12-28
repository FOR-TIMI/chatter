const { Schema, model} = require('mongoose');

const commentSchema = require('./Comment');

const postSchema = new Schema(
    {
        username: {
            type: String,
            required: true
        },
        location: String,
        caption: String,
        postImageUrls: {
            type: Array,
            default: []
        },
        userProfilePhoto: String,
        likes: {
            type: Map,
            of: Boolean
        },
        comments:[commentSchema]
    },
    {
        timestamps: true
    }
)

const Post = model("Post", postSchema);

module.exports =  Post