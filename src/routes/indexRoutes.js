// const auth = require('./auth');
const users = require('./usersRoutes');
const messages = require('./messagesRoutes');
const auth = require('./authRoutes');

const root = (app, next) => {
  app.get('/', (req, res) => res.send('Chat App!'));
  app.all('*', (req, resp, nextAll) => nextAll(404));
  return next();
};

// eslint-disable-next-line consistent-return
const register = (app, routes, cb) => {
  if (!routes.length) {
    return cb();
  }

  routes[0](app, (err) => {
    if (err) {
      return cb(err);
    }
    return register(app, routes.slice(1), cb);
  });
};

module.exports = (app, next) =>
  register(app, [auth, users, messages, root], next);
