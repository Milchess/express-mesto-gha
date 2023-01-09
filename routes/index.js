const express = require('express');

const userRoutes = express.Router();
const cardRoutes = express.Router();

const { getUsers, getUser, createUser } = require('../controllers/users');
const { getCards, createCard, deleteCard } = require('../controllers/cards');

userRoutes.get('/users', express.json(), getUsers);
userRoutes.get('/users/:userId', express.json(), getUser);
userRoutes.post('/users', express.json(), createUser);

cardRoutes.get('/cards', express.json(), getCards);
cardRoutes.post('/cards', express.json(), createCard);
cardRoutes.delete('/cards/:cardId', express.json(), deleteCard);

module.exports = { userRoutes, cardRoutes };
