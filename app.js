const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');

const { PORT = 3000 } = process.env;
const app = express();

app.use((req, res, next) => {
  req.user = {
    _id: '63bc44c5fb0839f92599a9f0',
  };

  next();
});

app.use(userRoutes);
app.use(cardRoutes);

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb');
  app.listen(PORT);
  console.log(`Сервер запущен на ${PORT} порту`);
}

main();
