const Card = require('../models/cardModel');
const catchAsync = require('../utils/catchAsync');
const APIfeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');

exports.getLogin = (req, res, next) => {
  if (req.body.user || req.user) {
    return next();
  }
  res.status(200).render('login', {
    title: 'Login',
  });
};

exports.getOverview = catchAsync(async (req, res, next) => {
  if (!req.body.user) {
    if (!req.user) {
      return next();
    }
    req.body.user = req.user.id;
  }

  let filter = {};
  if (req.body.user) {
    filter = { user: req.body.user };
  }

  const features = new APIfeatures(Card.find(filter), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  // const doc = await features.query.explain();
  const cardbyuser = await features.query;

  res.status(200).render('overview', {
    title: 'Vos cartes',
    cardbyuser,
  });
});

exports.getCard = catchAsync(async (req, res, next) => {
  if (!req.body.user) {
    if (!req.user) {
      return next();
    }
    req.body.user = req.user.id;
  }

  // ici je préfère faire usage de findOneAnd update afin de mettre a jour l'usage
  const card = await Card.findOneAndUpdate(
    {
      _id: req.params.cardId,
      user: req.user.id,
    },
    { $inc: { usage: 1 } }
  );

  if (!card) {
    return next(new AppError('No card found with that ID for that user', 404));
  }

  res.status(200).render('card', {
    title: card.name,
    card,
  });
});

exports.getMenu = (req, res, next) => {
  res.status(200).render('menu', {
    title: 'Menu',
  });
};

exports.getSignup = (req, res, next) => {
  if (req.body.user || req.user) {
    return next();
  }
  res.status(200).render('signup', {
    title: 'Sign up',
  });
};

exports.getMyAccount = (req, res, next) => {
  if (!req.body.user) {
    if (!req.user) {
      return next();
    }
    req.body.user = req.user.id;
  }
  res.status(200).render('account', {
    title: 'My Account',
  });
};

exports.getMyPassword = (req, res, next) => {
  if (!req.body.user) {
    if (!req.user) {
      return next();
    }
    req.body.user = req.user.id;
  }
  res.status(200).render('changeMyPassword', {
    title: 'My Password',
  });
};

exports.getAbout = (req, res, next) => {
  if (!req.body.user) {
    if (!req.user) {
      return next();
    }
    req.body.user = req.user.id;
  }
  res.status(200).render('about', {
    title: 'About',
  });
};

exports.getNewCard = (req, res, next) => {
  if (!req.body.user) {
    if (!req.user) {
      return next();
    }
    req.body.user = req.user.id;
  }
  res.status(200).render('addCard', {
    title: 'Add a new card',
  });
};

exports.getCardEdit = catchAsync(async (req, res, next) => {
  if (!req.body.user) {
    if (!req.user) {
      return next();
    }
    req.body.user = req.user.id;
  }
  const card = await Card.findOne({
    _id: req.params.cardId,
    user: req.user.id,
  });

  if (!card) {
    return next(new AppError('No card found with that ID for that user', 404));
  }

  res.status(200).render('cardEdit', {
    title: card.name,
    card,
  });
});

exports.getPasswordForget = (req, res, next) => {
  if (req.body.user || req.user) {
    return next();
  }
  res.status(200).render('forgotPassword', {
    title: 'Forgot My Password',
  });
};

exports.getPasswordReset = (req, res, next) => {
  if (req.body.user || req.user) {
    return next();
  }
  res.status(200).render('resetPassword', {
    title: 'Reset My Password',
    resetToken: req.params.token,
  });
};
