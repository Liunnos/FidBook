const express = require('express');

const viewController = require('../controller/viewsContoller');
const authController = require('../controller/authController');

const router = express.Router();

router.use('/login', router);
router.get(
  '/',
  authController.isLoggedIn,
  viewController.getLogin,
  viewController.getOverview
);
router.get(
  '/overview',
  authController.isLoggedIn,
  viewController.getOverview,
  viewController.getLogin
);
router.get(
  '/card/:cardId',
  authController.isLoggedIn,
  viewController.getCard,
  viewController.getLogin
);
router.get(
  '/menu',
  authController.protect,
  viewController.getMenu,
  viewController.getLogin
);
router.get(
  '/signup',
  authController.isLoggedIn,
  viewController.getSignup,
  viewController.getOverview
);

router.get(
  '/me',
  authController.protect,
  viewController.getMyAccount,
  viewController.getLogin
);
router.get(
  '/changeMyPassword',
  authController.protect,
  viewController.getMyPassword,
  viewController.getLogin
);

router.get(
  '/about',
  authController.isLoggedIn,
  viewController.getAbout,
  viewController.getLogin
);

router.get(
  '/newCard',
  authController.protect,
  viewController.getNewCard,
  viewController.getLogin
);
router.get(
  '/CardEdit/:cardId',
  authController.protect,
  viewController.getCardEdit,
  viewController.getLogin
);
router.get(
  '/passwordforget',
  authController.isLoggedIn,
  viewController.getPasswordForget,
  viewController.getOverview
);

router.get(
  '/passwordreset/:token',
  authController.isLoggedIn,
  viewController.getPasswordReset,
  viewController.getOverview
);

module.exports = router;
