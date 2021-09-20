/* eslint-disable no-console */
// const bcrypt = require('bcrypt');
// eslint-disable-next-line import/extensions
const client = require('../dbconfig');

// GET '/users'
const getUsers = async (req, res) => {
  const response = await client.query('SELECT * FROM public.users');
  res.status(200).json(response.rows);
};

// POST '/users'
const createUsers = async (req, res, next) => {
  try {
    // const { id, name, email } = req.body;
    const id = 2;
    const name = 'Ana';
    const email = 'ana@gmail.com';

    if (!id || !name || !email) {
      return next(400);
    }
  } catch (error) {
    next(error);
  }

  const response = await client.query(
    'INSERT INTO public.users ( userId, userName, userEmail) VALUES ($1, $2, $3)',
    [id, name, email]
  );
  return res.status(200).json(response.rows);
};

module.exports = {
  getUsers,
  createUsers,
};
