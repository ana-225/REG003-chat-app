/* eslint-disable no-console */
const express = require('express');
const cors = require('cors');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST'],
  },
});
const errorHandler = require('./middleware/errors');
const routes = require('./routes/indexRoutes');
const {
  getSocketMessages,
  createSocketMessage,
} = require('./controller/messageController');

const port = process.env.PORT || 8000;
// const socketPort = 8000;

// middlewares
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Link to Routes
routes(app, (err) => {
  if (err) {
    throw err;
  }
  app.use(errorHandler);
  // sends out the 10 most recent messages from recent to old
  const emitMostRecentMessges = () => {
    getSocketMessages()
      .then((result) => io.emit('chat message', result))
      .catch(console.log);
  };
  // connects, creates message, and emits top 10 messages
  io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('chat message', (msg) => {
      createSocketMessage(JSON.parse(msg))
        .then((_) => {
          emitMostRecentMessges();
        })
        .catch((error) => io.emit(error));
    });

    // close event when user disconnects from app
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

  server.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });
});
