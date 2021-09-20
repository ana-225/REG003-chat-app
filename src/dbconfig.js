/* eslint-disable no-console */
const { Client } = require('pg');

// conexión a base de datos
const connectionData = {
  user: 'postgres',
  host: 'localhost',
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
});

module.exports = client;
