/* eslint-disable no-console */
const express = require('express');
const { Client } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

// conexión a base de datos
const connectionData = {
  user: 'postgres',
  host: '',
  database: 'postgres',
  password: 'postgres',
  port: 5432,
};
const client = new Client(connectionData);
client.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log('BD conectada');
  }

  client
    .query('SELECT * FROM public."table"')
    .then((response) => {
      console.log(response.rows);
      client.end();
    })
    .catch(() => {
      client.end();
    });
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
