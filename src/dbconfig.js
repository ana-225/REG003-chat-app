/* eslint-disable no-console */
const { Pool } = require('pg');

const { parse } = require('pg-connection-string').parse;
const { dbUrl } = require('../config');

// const config = parse(
//   'postgres://dnlhmiogrxigiy:d5324e320d3414e761264ed46bc7395ed8b72bbf2ed1eaa45d443aa7e1fe250b@ec2-3-219-111-26.compute-1.amazonaws.com:5432/df2lc0ku3mnad4'
// );
const config = parse(dbUrl);

const connector = { ...config, ssl: { rejectUnauthorized: false } };
// console.log(config);
// const client = new Client({
//   user: 'dnlhmiogrxigiy',
//   host: 'ec2-3-219-111-26.compute-1.amazonaws.com',
//   database: 'df2lc0ku3mnad4',
//   password: 'd5324e320d3414e761264ed46bc7395ed8b72bbf2ed1eaa45d443aa7e1fe250b',
//   port: 5432,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });

// conexión a base de datos
const pool = new Pool(connector);
pool.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log('BD conectada');
  }
});

module.exports = pool;
