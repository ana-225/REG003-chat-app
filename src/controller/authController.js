const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../../config');
const pool = require('../dbconfig');

const { secret } = config;

const authenticateUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(400);
  }
  const userFound = await pool.query(
    'SELECT * FROM public.users WHERE "userEmail" = $1',
    [email]
  );
  if (!userFound.rows.length) {
    return res.status(404).json({ message: 'User not found' });
    // eslint-disable-next-line no-else-return
  } else {
    const resultPassword = userFound.rows[0].userPassword;
    bcrypt.compare(password, resultPassword, (err, data) => {
      if (err) console.info(err);
      else if (!data) {
        return res.status(404).json({ message: 'Incorrect Password' });
      }
      jwt.sign(
        {
          uid: userFound.rows[0].userId,
          email: userFound.rows[0].userEmail,
          name: userFound.rows[0].userName,
        },
        secret,
        {
          expiresIn: 36000,
        },
        (error, token) => {
          if (error) console.error(err);
          return res.status(200).json({ token });
        }
      );
    });
  }
};
module.exports = { authenticateUser };
