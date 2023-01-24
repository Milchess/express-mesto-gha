const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const SUCCESS_CODE = 200;
const DATA_CODE = 400;
const AUTH_CODE = 401;
const ID_CODE = 404;
const SERVER_CODE = 500;

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(SUCCESS_CODE).send(users);
  } catch (err) {
    res.status(SERVER_CODE).send({ message: 'Произошла ошибка' });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.params.userId });
    if (!user) {
      res.status(ID_CODE).send({ message: 'Пользователь с указанным id не найден' });
    } else {
      res.status(SUCCESS_CODE).send(user);
    }
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(DATA_CODE).send({ message: 'Переданы неккоректные данные' });
    } else {
      res.status(SERVER_CODE).send({ message: 'Произошла ошибка' });
    }
  }
};

const createUser = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(AUTH_CODE).send({ message: 'Введите логин или пароль' });
  }
  try {
    const user = await bcrypt.hash(req.body.password, 10)
      .then((hash) => User.create({
        ...req.body,
        password: hash,
      }));
    res.status(SUCCESS_CODE).send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(DATA_CODE).send({ message: 'Переданы неккоректные данные' });
    } else {
      res.status(SERVER_CODE).send({ message: 'Произошла ошибка' });
    }
  }
};

const updateProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, {
      name: req.body.name,
      about: req.body.about,
    }, { new: true, runValidators: true });
    if (!user) {
      res.status(ID_CODE).send({ message: 'Пользователь с указанным id не найден' });
    } else {
      res.status(SUCCESS_CODE).send(user);
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(DATA_CODE).send({ message: 'Переданы неккоректные данные' });
    } else {
      res.status(SERVER_CODE).send({ message: 'Произошла ошибка' });
    }
  }
};

const updateAvatar = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, {
      avatar: req.body.avatar,
    }, { new: true, runValidators: true });
    if (!user) {
      res.status(ID_CODE).send({ message: 'Пользователь с указанным id не найден' });
    } else {
      res.status(SUCCESS_CODE).send(user);
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(DATA_CODE).send({ message: 'Переданы неккоректные данные' });
    } else {
      res.status(SERVER_CODE).send({ message: 'Произошла ошибка' });
    }
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(AUTH_CODE).send({ message: 'Поля должны быть заполнены' });
  }
  try {
    const user = User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(ID_CODE).send({ message: 'Пользователь не найден' });
    }

    const isUserValid = await bcrypt.compare(password, user.password);
    if (isUserValid) {
      const token = jwt.sign({ _id: user._id }, 'super-strong-secret', { expiresIn: '7d' });

      return res.status(SUCCESS_CODE).send(token);
    }
    return res.status(AUTH_CODE).send({ message: 'Неверный логин или пароль' });
  } catch (e) {
    return res.status(SERVER_CODE).send({ message: 'Произошла ошибка' });
  }
};

const getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(SUCCESS_CODE).send(user);
  } catch (e) {
    res.status(SERVER_CODE).send({ message: 'Произошла ошибка' });
  }
};

module.exports = {
  getUsers, getUser, createUser, updateProfile, updateAvatar, login, getUserInfo,
};
