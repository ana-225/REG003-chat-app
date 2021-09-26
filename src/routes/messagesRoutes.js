const {
  getMessages,
  createMessage,
} = require('../controller/messageController');
/** @module messages */
module.exports = (app, next) => {
  app.get('/messages', getMessages);
  app.post('/messages', createMessage);
  next();
};
