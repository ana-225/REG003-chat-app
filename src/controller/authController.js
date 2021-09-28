const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config');
const User = require('../models/user');

const { secret } = config;

module.exports.authenticateUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(400);
  }

  const userFound = User.findOne({ email });
  userFound.then((result) => {
    if (!result) {
      return res.status(404)({ message: 'User not found' });
    }
    bcrypt.compare(password, result.password, (err, data) => {
      if (err) console.info(err);
      else if (!data) {
        return res.status(404).json({ message: 'Incorrect Password' });
      }

      jwt.sign(
        {
          uid: result._id,
          email: result.email,
          roles: result.roles,
        },
        secret,
        {
          expiresIn: 3600,
        },
        (err, token) => {
          if (err) console.error(err);
          return res.status(200).json({ token });
        },
      );
    });
  });
};