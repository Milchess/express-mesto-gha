const User = require('../models/user');

const getUsers = async (req, res) => {
  await User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(500).send(err.message));
};

const getUser = async (req, res) => {
  await User.findById(req.params.id)
    .then((user) => res.status(200).send(user))
    .catch((err) => res.status(500).send(err.message));
};

const createUser = async (req, res) => {
  await User.create(req.body)
    .then((user) => res.status(200).send(user))
    .catch((err) => res.status(500).send(err.message));
};

module.exports = { getUsers, getUser, createUser };
