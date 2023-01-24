const express = require('express');

const userRoutes = express.Router();
const {
  getUsers, getUser, updateProfile, updateAvatar, getUserInfo,
} = require('../controllers/users');

userRoutes.get('/users', getUsers);
userRoutes.get('/users/:userId', getUser);
userRoutes.get('/user/me', getUserInfo);
userRoutes.patch('/users/me', updateProfile);
userRoutes.patch('/users/me/avatar', updateAvatar);
userRoutes.patch('/users/me/avatar', updateAvatar);

module.exports = userRoutes;
