/* eslint-disable no-console */
const { Client } = require('pg');
const { parse } = require('pg-connection-string').parse;
const { dbUrl } = require('../config');

const config = parse(dbUrl);

// conexión a base de datos
const client = new Client(config);
client.connect((err) => {
  if (err) {
    console.log(1, err);
    throw err;
  } else {
    console.log('BD conectada');
  }
});

module.exports = client;
