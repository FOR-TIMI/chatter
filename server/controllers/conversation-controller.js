const { Conversation } = require("../model");

module.exports = {
  //To start a conversation
  async startConversation({ body }, res) {
    try {
      const { senderId, recieverId } = body;
      // Check if a conversation already exists between the two users
      const conversation = await Conversation.findOne({
        members: {
          $all: [senderId, recieverId],
        },
      });

      if (conversation) {
        return res.status(200).json(conversation);
      }

      // Create a new conversation
      const newConversation = await Conversation.create({
        members: [senderId, recieverId],
      });
      console.log({ conversation, newConversation });

      res.status(200).json(newConversation);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  //To get all existing conversation of a user
  async getConversations({ params }, res) {
    try {
      const conversation = await Conversation.find({
        members: { $in: [params.userId] },
      });
      res.status(200).json(conversation);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};
