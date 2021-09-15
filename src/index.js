const express = require('express');

const app = express();

const port = process.env.PORT || 3002;

console.log(process.env);
app.get('/', (req, res) => {
  res.send('Hello Fares!');
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
