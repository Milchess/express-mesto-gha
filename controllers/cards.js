const Card = require('../models/card');

const getCards = async (req, res) => {
  await Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) => res.status(500).send(err.message));
};

const createCard = async (req, res) => {
  await Card.create({
    owner: req.user._id, ...req.body,
  })
    .then((card) => res.status(200).send(card))
    .catch((err) => res.status(500).send(err.message));
};

const deleteCard = async (req, res) => {
  await Card.findByIdAndRemove(req.params.id)
    .then(res.status(200).send({ message: 'Карточка удалена' }))
    .catch(res.status(500).send({ message: 'Такой карточки не существует' }));
};

module.exports = { getCards, createCard, deleteCard };
