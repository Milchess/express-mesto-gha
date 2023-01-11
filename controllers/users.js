const User = require('../models/user');

const SUCCESS_CODE = 200;
const DATA_CODE = 400;
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
  try {
    const user = await User.create(req.body);
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

module.exports = {
  getUsers, getUser, createUser, updateProfile, updateAvatar,
};
