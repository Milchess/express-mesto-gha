const express = require('express');

const userRoutes = express.Router();
const {
  getUsers, getUser, createUser, updateProfile, updateAvatar,
} = require('../controllers/users');

userRoutes.get('/users', express.json(), getUsers);
userRoutes.get('/users/:userId', express.json(), getUser);
userRoutes.post('/users', express.json(), createUser);
userRoutes.patch('/users/me', express.json(), updateProfile);
userRoutes.patch('/users/me/avatar', express.json(), updateAvatar);

module.exports = userRoutes;
