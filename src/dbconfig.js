/* eslint-disable no-console */
const { Client } = require('pg');
const { parse } = require('pg-connection-string').parse;
const { dbUrl } = require('../config');

const config = parse(
  'postgres://dnlhmiogrxigiy:d5324e320d3414e761264ed46bc7395ed8b72bbf2ed1eaa45d443aa7e1fe250b@ec2-3-219-111-26.compute-1.amazonaws.com:5432/df2lc0ku3mnad4'
);

// conexión a base de datos
const client = new Client(config);
client.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log('BD conectada');
  }
});

module.exports = client;
