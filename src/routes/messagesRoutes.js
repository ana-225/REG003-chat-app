const {
  getMessages,
  createMessage,
} = require('../controller/messageController');
const { requireAuth } = require('../middleware/auth');

/** @module messages */
module.exports = (app, next) => {
  app.get('/messages', requireAuth, getMessages);
  app.post('/messages', requireAuth, createMessage);
  next();
};
