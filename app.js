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

app.all('*', (req, res) => {
  res.status(404).send({ message: 'Страница не найдена' });
});

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb');
  await app.listen(PORT);
  console.log(`Сервер запущен на ${PORT} порту`);
}

main();
