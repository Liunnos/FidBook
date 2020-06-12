const catchAsync = require('../utils/catchAsync');
const Card = require('../models/cardModel');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

exports.getAllCardsForAUser = catchAsync(async (req, res, next) => {
  if (!req.body.user) {
    req.body.user = req.user.id;
  }

  let filter = {};
  if (req.body.user) {
    filter = { user: req.body.user };
  }

  const cards = await Card.find(filter);

  res.status(200).json({
    status: 'succes',
    results: cards.length,
    data: {
      cards,
    },
  });
});

exports.createCard = catchAsync(async (req, res, next) => {
  if (!req.body.user) {
    req.body.user = req.user.id;
  }

  const newCard = await Card.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      card: newCard,
    },
  });
});

exports.updateCard = catchAsync(async (req, res, next) => {
  const filteredBody = filterObj(
    req.body,
    'name',
    'code',
    'barcodetype',
    'usage'
  );

  // ici je préfère faire usage de findOneAndUpdate afin de filtrer aussi par user pour m'assurer que seul le proprietaire puisse modifier sa carte
  const updatedCard = await Card.findOneAndUpdate(
    { _id: req.params.cardId, user: req.user.id },
    filteredBody,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedCard) {
    return next(new AppError('No card found with that ID by that user', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      updatedCard,
    },
  });
});

exports.getOne = catchAsync(async (req, res, next) => {
  const filteredBody = filterObj(
    req.body,
    'name',
    'code',
    'barcodetype',
    'usage'
  );

  // ici je préfère faire usage de findOneAndUpdate afin de filtrer aussi par user pour m'assurer que seul le proprietaire puisse modifier sa carte
  const card = await Card.findOne(
    { _id: req.params.cardId, user: req.user.id },
    filteredBody
  );

  if (!card) {
    return next(new AppError('No card found with that ID by that user', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      card,
    },
  });
});

exports.deleteCard = catchAsync(async (req, res, next) => {
  const card = await Card.findOneAndDelete({
    _id: req.params.cardId,
    user: req.user.id,
  });

  if (!card) {
    return next(
      new AppError('No card found with that ID or invalid user', 404)
    );
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getAllCards = factory.getAll(Card);
exports.deleteCardAdmin = factory.deleteOne(Card);
exports.getACardAdmin = factory.getOne(Card);
exports.updateCardAdmin = factory.updateOne(Card);
