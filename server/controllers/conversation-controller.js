const { Conversation } = require("../model");

module.exports = {
  //To start a conversation
  async startConversation({ body }, res) {
    try {
      const { senderId, recieverId } = body;
      const conversation = await Conversation.create({
        members: [senderId, recieverId],
      });

      res.status(200).json(conversation);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  //To get all existing conversation of a user
  async getConversations({params}, res){
    try{
        const conversation = await Conversation.find({
            members : { $in : [params.userId]}
        })

        res.status(200).json(conversation)
    } catch(err){
        res.status(500).json({ message: err.message }); 
    }
  }
};
