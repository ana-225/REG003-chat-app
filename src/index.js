/* eslint-disable no-console */
const express = require('express');
const { Client } = require('pg');
const routes = require('./routes');
// const config = require('../config');

const app = express();
const port = process.env.PORT || 3000;
// const dbURL = config;

// conexión a base de datos
const connectionData = {
  user: 'postgres',
  host: '',
  database: 'postgres',
  password: 'postgres',
  port: 5432,
};
const client = new Client(connectionData);
// const client = new Client({
//   dbURL,
// });

client.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log('BD conectada');
  }

  // client
  //   .query('SELECT * FROM public.""')
  //   .then((response) => {
  //     console.log(response.rows);
  //     client.end();
  //   })
  //   .catch(() => {
  //     client.end();
  //   });
});

// middlewares
// parse application/x-www-form-urlencoded
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// Link to Routes
routes(app, (err) => {
  if (err) {
    throw err;
  }

  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });
});

module.exports = { connectionData };
