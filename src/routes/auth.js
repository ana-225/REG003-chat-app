/* eslint-disable no-console */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config');
const User = require('../models/user');

const { secret } = config;

/** @module auth */
module.exports = (app, nextMain) => {
  /**
   * @name /auth
   * @description Crea token de autenticación.
   * @path {POST} /auth
   * @body {String} email Correo
   * @body {String} password Contraseña
   * @response {Object} resp
   * @response {String} resp.token Token a usar para los requests sucesivos
   * @code {200} si la autenticación es correcta
   * @code {400} si no se proveen `email` o `password` o ninguno de los dos
   * @auth No requiere autenticación
   */
  app.post('/auth', (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(400);
    }
    // TODO: autenticar a la usuarix
    const userFound = User.findOne({ email });
    userFound.then((result) => {
      if (!result) {
        return res.status(404).send({ message: 'User not found' });
      }
      bcrypt.compare(password, result.password, (err, data) => {
        if (err) console.info(err);
        else if (!data) {
          console.log(data);
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
    // next();
  });
  return nextMain();
};