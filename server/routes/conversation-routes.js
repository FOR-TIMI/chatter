const { startConversation, getConversations } = require('../controllers/conversation-controller');
const { authMiddleware } = require('../middleware/jwt-config');

const router = require('express').Router();

router.get('/:userId' ,authMiddleware, getConversations) //To get all conversation related to a user


router.post('/',authMiddleware,startConversation) //To start a new conversation




module.exports = router;