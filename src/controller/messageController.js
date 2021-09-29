const pool = require('../dbconfig');

const getMessages = (request, response) => {
  pool.query('SELECT * FROM messages ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};
const createMessage = (request, response) => {
  const { text, username } = request.body;
  pool.query(
    'INSERT INTO public.messages ("text", "username") VALUES ($1, $2) RETURNING text, username, created_at',
    [text, username],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(results.rows);
    }
  );
};
const getSocketMessages = () => {
  return new Promise((resolve) => {
    pool.query('SELECT * FROM messages ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error;
      }
      resolve(results.rows);
    });
  });
};
const createSocketMessage = (message) => {
  return new Promise((resolve) => {
    pool.query(
      'INSERT INTO messages ("text", "username") VALUES ($1, $2) RETURNING text, username, created_at',
      [message.text, message.username],
      (error, results) => {
        if (error) {
          throw error;
        }
        resolve(results.rows);
      }
    );
  });
};

module.exports = {
  getMessages,
  createMessage,
  getSocketMessages,
  createSocketMessage,
};
