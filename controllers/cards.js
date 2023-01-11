const Card = require('../models/card');

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    res.status(200).send(cards);
  } catch (err) {
    res.status(500).send({ message: `Ошибка ${err}` });
  }
};

const createCard = async (req, res) => {
  try {
    const card = await Card.create({
      owner: req.user._id, ...req.body,
    });
    res.status(200).send(card);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'Переданы неккоректные данные' });
    } else {
      res.status(500).send({ message: `Ошибка ${err}` });
    }
  }
};

const deleteCard = async (req, res) => {
  try {
    const card = await Card.findById(req.params.cardId);
    if (!card) {
      res.status(404).send({ message: 'Карточка с указанным id не найдена' });
    } else {
      card.remove();
      res.status(200).send({ message: 'Карточка удалена' });
    }
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Переданы неккоректные данные' });
    } else {
      res.status(500).send({ message: `Ошибка ${err}` });
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
      res.status(404).send({ message: 'Карточка с указанным id не найдена' });
    } else {
      res.status(200).send({ message: 'Лайк карточке поставлен' });
    }
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Переданы неккоректные данные' });
    } else {
      res.status(500).send({ message: `Ошибка ${err}` });
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
      res.status(404).send({ message: 'Карточка с указанным id не найдена' });
    } else {
      res.status(200).send({ message: 'Лайк удален у карточки' });
    }
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Переданы неккоректные данные' });
    } else {
      res.status(500).send({ message: `Ошибка ${err}` });
    }
  }
};

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
