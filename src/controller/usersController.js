/* eslint-disable no-console */
// const bcrypt = require('bcrypt');
// eslint-disable-next-line import/extensions
const client = require('../dbconfig');

// GET '/users'
const getUsers = async (req, res) => {
  const response = await client.query('SELECT * FROM public.users');
  res.status(200).json(response.rows);
};

module.exports = {
  getUsers,
};
