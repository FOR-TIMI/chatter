const {Schema,model } = require('mongoose');



const commentSchema  = new Schema({
    postId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    userProfilePhoto: String,
    commentBody :{
        type : String,
        trim: true,
        required: true
    },

},
{
    timestamps: true,
    toJSON:{
        getters: true
    },
    id: false
})

const Comment = model('Comment', commentSchema)

module.exports = Comment;