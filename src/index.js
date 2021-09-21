/* eslint-disable no-console */
const express = require('express');

const routes = require('./routes/indexRoutes');

const app = express();
const port = process.env.PORT || 3000;

// middlewares
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Link to Routes
routes(app, (err) => {
  if (err) {
    throw err;
  }

  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });
});
