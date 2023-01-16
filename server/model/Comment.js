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
    likes: {
        type: Map,
        of: Boolean,
        default: {}
    }
},
{
    timestamps: true,
    toJSON:{
        getters: true
    },
    id: false
});

commentSchema.pre("save", async function(next){
    if(this.isNew){
        this.model("Post").findByIdAndUpdate(this.postId,{
             $inc: { commentCount: 1}}, 
             { new: true}).exec();
    }
    next()
})


// commentSchema.pre("findOneAndDelete", async function(next){
//     const comment = this.getQuery();
//     this.model("Post").findByIdAndUpdate(comment.postId,
//         { $inc: { commentCount : -1}},{ new: true}).exec();

//     next();
// })

const Comment = model('Comment', commentSchema)

module.exports = Comment;