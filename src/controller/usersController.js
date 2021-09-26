/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
/* eslint-disable no-console */
const bcrypt = require('bcrypt');
const { isAValidEmail, isAWeakPassword } = require('../utils/utils');
// const pool = require('../dbconfig');
const pool = require('../dbconfig');

// GET '/users'
const getUsers = async (req, res) => {
  const response = await pool.query('SELECT * FROM public.users');
  res.status(200).json(response.rows);
};

// POST '/users'
const createUsers = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return next(400);
    }
    if (isAWeakPassword(password) || !isAValidEmail(email)) return next(400);
    const newUserPassword = bcrypt.hashSync(req.body.password, 10);

    // check if user already exists on db
    const userFound = await pool.query(
      'SELECT "userEmail" FROM public.users WHERE "userEmail" = $1',
      [email]
    );
    if (userFound.rows.length) {
      return res.send('user already exists');
    }
    await pool.query(
      'INSERT INTO public.users ( "userName", "userEmail", "userPassword") VALUES ($1, $2, $3)',
      [name, email, newUserPassword]
    );
    console.log(userFound);
    if (userFound.rows.length) {
      return next(403);
      // ('user already exists');
    }
    // await pool.query(
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
