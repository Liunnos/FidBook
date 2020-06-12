const express = require('express');
const cardController = require('../controller/cardController');
const authController = require('../controller/authController');

const router = express.Router();

router
  .route('/mycard')
  .get(
    authController.protect,
    authController.restrictTo('user', 'admin'),
    cardController.getAllCardsForAUser
  )
  .post(
    authController.protect,
    authController.restrictTo('user'),
    cardController.createCard
  );

router
  .route('/mycard/:cardId')
  .get(
    authController.protect,
    authController.restrictTo('user'),
    cardController.getOne
  )
  .patch(
    authController.protect,
    authController.restrictTo('user'),
    cardController.updateCard
  )
  .delete(
    authController.protect,
    authController.restrictTo('user'),
    cardController.deleteCard
  );

router.use(authController.protect, authController.restrictTo('admin'));
router.route('/').get(cardController.getAllCards);
router
  .route('/:id')
  .get(cardController.getACardAdmin)
  .patch(cardController.updateCardAdmin)
  .delete(cardController.deleteCardAdmin);

module.exports = router;
