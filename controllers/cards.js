const Card = require('../models/card');

const SUCCESS_CODE = 200;
const DATA_CODE = 400;
const ID_CODE = 404;
const SERVER_CODE = 500;

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    res.status(SUCCESS_CODE).send(cards);
  } catch (err) {
    res.status(SERVER_CODE).send({ message: 'Произошла ошибка' });
  }
};

const createCard = async (req, res) => {
  try {
    const card = await Card.create({
      owner: req.user._id, ...req.body,
    });
    res.status(SUCCESS_CODE).send(card);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(DATA_CODE).send({ message: 'Переданы неккоректные данные' });
    } else {
      res.status(SERVER_CODE).send({ message: 'Произошла ошибка' });
    }
  }
};

const deleteCard = async (req, res) => {
  try {
    const card = await Card.findById(req.params.cardId);
    if (!card) {
      res.status(ID_CODE).send({ message: 'Карточка с указанным id не найдена' });
    } else {
      await card.remove();
      res.status(SUCCESS_CODE).send({ message: 'Карточка удалена' });
    }
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(DATA_CODE).send({ message: 'Переданы неккоректные данные' });
    } else {
      res.status(SERVER_CODE).send({ message: 'Произошла ошибка' });
    }
  }
};

const likeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    if (!card) {
      res.status(ID_CODE).send({ message: 'Карточка с указанным id не найдена' });
    } else {
      res.status(SUCCESS_CODE).send({ message: 'Лайк карточке поставлен' });
    }
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(DATA_CODE).send({ message: 'Переданы неккоректные данные' });
    } else {
      res.status(SERVER_CODE).send({ message: 'Произошла ошибка' });
    }
  }
};

const dislikeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    if (!card) {
      res.status(ID_CODE).send({ message: 'Карточка с указанным id не найдена' });
    } else {
      res.status(SUCCESS_CODE).send({ message: 'Лайк удален у карточки' });
    }
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(DATA_CODE).send({ message: 'Переданы неккоректные данные' });
    } else {
      res.status(SERVER_CODE).send({ message: 'Произошла ошибка' });
    }
  }
};

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
