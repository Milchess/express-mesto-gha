const User = require('../models/user');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send({ message: `Ошибка ${err}` });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).send('Пользователь с указанным id не найдена');
    } else {
      res.status(200).send(user);
    }
  } catch (err) {
    res.status(500).send({ message: `Ошибка ${err}` });
  }
};

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'Переданы неккоректные данные' });
    } else {
      res.status(500).send({ message: `Ошибка ${err}` });
    }
  }
};

const updateUserInfo = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, req.body);
    if (!user) {
      res.status(404).send('Пользователь с указанным id не найдена');
    } else {
      res.status(200).send(user);
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'Переданы неккоректные данные' });
    } else {
      res.status(500).send({ message: `Ошибка ${err}` });
    }
  }
};

module.exports = {
  getUsers, getUser, createUser, updateUserInfo,
};
