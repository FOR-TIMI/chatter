const { Message} =require('../model');

module.exports = {
    //To send a message
    async sendMessage({body}, res){
        try{
            const newMessage = await Message.create(body);
            res.status(200).json(newMessage);
        }catch(err){
            res.status(500).json({message: err.message})
        }
    },

    //To get all messages related to a conversation
    async getMessages({params}, res){
        try{
            const messages = await Message.find({ conversationId : params.conversationId});
            res.status(200).json(messages);
        }catch(err){
            res.status(500).json({message: err.message})
        }
    }
}