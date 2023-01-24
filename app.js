const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { celebrate, Joi } = require('celebrate');
const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');

const {
  login, createUser,
} = require('./controllers/users');
const auth = require('./middlewares/auth');
const NotFound = require('./errors/notFound');

const { PORT = 3000 } = process.env;
const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.disable('x-powered-by');
app.use(limiter);
app.use(helmet());
app.use(express.json());

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  login,
);
app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().regex(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/),
    }),
  }),
  createUser,
);

app.use(auth);
app.use(userRoutes);
app.use(cardRoutes);

app.all('*', (req, res, next) => {
  try {
    next(new NotFound('Страница не найдена'));
  } catch (err) {
    next();
  }
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode)
    .send({
      message: statusCode === 500
        ? 'Произошла ошибка'
        : message,
    });
  next();
});

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb');
  await app.listen(PORT);
  console.log(`Сервер запущен на ${PORT} порту`);
}

main();
