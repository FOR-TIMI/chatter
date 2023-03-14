const { Schema, model} = require('mongoose');


const messageSchema = new Schema(
    {
        conversationId : {
            type : String
        },
        sender : {
            type: String
        },
        content : {
            type : String
        }
    },
    {
        timestamps: true
    }
)

const Message = model("Message", messageSchema);

module.exports =  Message