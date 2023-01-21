const {Schema,model } = require('mongoose');


const notificationSchema = new Schema({
    userId: { 
         type: String,
         required: true 
        },
    event: {
      type: { type: String, required: true },
      postUrl: { type: String },
      profilePhotoUrl: { type: String },
      createdAt: {type: String },
      senderUsername: { type: String}
    }
});
  
const Notification = model('Notification', notificationSchema);
  
module.exports = Notification;