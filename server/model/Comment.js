const {Schema } = require('mongoose');



const commentSchema  = new Schema({
    authorId: {
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


module.exports = commentSchema;