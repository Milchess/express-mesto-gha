const express = require('express');
const { celebrate, Joi } = require('celebrate');

const userRoutes = express.Router();
const {
  getUsers, getUser, updateProfile, updateAvatar, getUserInfo,
} = require('../controllers/users');

userRoutes.get('/users', getUsers);
userRoutes.get('/user/me', getUserInfo);

userRoutes.get(
  '/users/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().alphanum().length(24),
    }),
  }),
  getUser,
);
userRoutes.patch(
  '/users/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  updateProfile,
);
userRoutes.patch(
  '/users/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().regex(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/),
    }),
  }),
  updateAvatar,
);

module.exports = userRoutes;
