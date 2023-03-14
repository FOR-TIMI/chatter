const { sendMessage } = require('../controllers/message-controller');
const { authMiddleware } = require('../middleware/jwt-config');

const router = require('express').Router();


router.post('/',authMiddleware,sendMessage) //To send a new message
router.get('/:conversationId', authMiddleware, sendMessage) //To get all messages related to a conversation



module.exports = router;