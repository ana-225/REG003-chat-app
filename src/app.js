/* eslint-disable no-console */
const express = require('express');
// const cors = require('cors');
const errorHandler = require('./middleware/errors');
const routes = require('./routes/indexRoutes');

const app = express();
const port = process.env.PORT || 3000;
// const socketPort = 8000;

// const server = require('http').createServer(app);
// const io = require('socket.io')(server, {
//   cors: {
//     origin: 'http://localhost:3001',
//     methods: ['GET', 'POST'],
//   },
// });

// middlewares
// app.use(cors());
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Link to Routes
routes(app, (err) => {
  if (err) {
    throw err;
  }
  app.use(errorHandler);
  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });
});
