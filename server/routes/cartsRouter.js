const express = require('express');
const {
  getCart,
  addCartItem,
  deleteAllCartItems,
  deleteCartItemById,
  updateItemFieldById,
  getMyCart,
  createCart,
} = require('../controllers/cartController');
const { auth } = require('../middleware/authentication');

const router = express.Router();

router
  .route('/')
  .post(auth, addCartItem)
  .get(getCart)
  .patch(updateItemFieldById)
  .delete(deleteCartItemById);

router.route('/me').get(auth, getMyCart).post(auth, createCart);

router.route('/:id').patch(deleteCartItemById).delete(deleteAllCartItems);

module.exports = router;
