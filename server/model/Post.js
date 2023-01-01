const { Schema, model} = require('mongoose');

const commentSchema = require('./Comment');

const ImageSchema = new Schema({
	url: String,
	filename: String
})

ImageSchema.virtual('thumbnail').get(function(){
	return this.url.replace('/upload','/upload/w_200')
})


const postSchema = new Schema(
    {
        username: {
            type: String,
            required: true
        },
        userId: {
            type: String
        },
        location: String,
        caption: String,
        postImageUrls: [ImageSchema],
        userProfilePhoto: String,
        likes: {
            type: Map,
            of: Boolean,
        },
        comments:[commentSchema]
    },
    {
        timestamps: true
    }
)

const Post = model("Post", postSchema);

module.exports =  Post