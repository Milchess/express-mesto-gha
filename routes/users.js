const express = require('express');

const userRoutes = express.Router();
const {
  getUsers, getUser, createUser, updateUserInfo,
} = require('../controllers/users');

userRoutes.get('/users', express.json(), getUsers);
userRoutes.get('/users/:userId', express.json(), getUser);
userRoutes.post('/users', express.json(), createUser);
userRoutes.patch('/users/me', express.json(), updateUserInfo);
userRoutes.patch('/users/me/avatar', express.json(), updateUserInfo);

module.exports = userRoutes;
