/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
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
    const { id, name, email } = req.body;
    if (!id || !name || !email) {
      return next(400);
    }
    // issue problema para verificar si usuario existe
    console.log(email);
    const userFound = await client.query(
      'SELECT "userEmail" FROM public.users WHERE "userEmail" = $1',
      [email]
    );
    console.log(userFound);
    if (userFound.rows.length) {
      return next(403);
      // ('user already exists');
    }
    // await client.query(
    //   'INSERT INTO public.users ( "userId", "userName", "userEmail") VALUES ($1, $2, $3)',
    //   [id, name, email]
    // );
    return res.status(200).send('user created successfully');
  } catch (error) {
    return next(error);
  }
};
module.exports = {
  getUsers,
  createUsers,
};
