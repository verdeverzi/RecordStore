const Cart = require('../models/cartModel');
const { successHandler } = require('../middleware/successHandler');

exports.createCart = async (req, res, next) => {
  console.log('create cart runs!');
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      'items.record'
    );

    if (cart) {
      return successHandler(res, 200, cart);
    }

    const newCart = new Cart({
      user: req.user._id,
      items: [],
      total: 0,
    });

    console.log('newCart ->', newCart);
    await newCart.save();

    successHandler(res, 201, newCart);
  } catch (error) {
    next(error);
  }
};

exports.addCartItem = async (req, res, next) => {
  try {
    const { record, quantity, cartId } = req.body;

    const cart = await Cart.findByIdAndUpdate(
      cartId,
      { $push: { items: { record, quantity } } },
      { new: true, upsert: true }
    ).populate('items.record');

    successHandler(res, 201, cart);
  } catch (error) {
    next(error);
  }
};

exports.deleteAllCartItems = async (req, res, next) => {
  try {
    const cart = await Cart.findByIdAndUpdate(
      req.params.id,
      { $set: { items: [] } },
      { new: true }
    );

    successHandler(res, 200, cart);
  } catch (error) {
    next(error);
  }
};

exports.getCart = async (req, res, next) => {
  try {
    const carts = await Cart.find().populate('items.record');

    successHandler(res, 200, carts);
  } catch (error) {
    next(error);
  }
};

exports.getMyCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      'items.record'
    );

    successHandler(res, 200, cart);
  } catch (error) {
    next(error);
  }
};

exports.deleteCartItemById = async (req, res, next) => {
  const { recordId } = req.body;

  try {
    const cart = await Cart.findByIdAndUpdate(
      req.params.id,
      { $pull: { items: { record: recordId } } },
      { new: true }
    );

    successHandler(res, 200, cart);
  } catch (error) {
    next(error);
  }
};

//! -----------------------------------------------------------------------

/* 
    ! Update the field of an item in the cart based on its ID.

    ^ http method: patch

    {
    "quantity": 2,
    "recordId": "record-id",
    "cartId": "cart-id"
    }

*/

exports.updateItemFieldById = async (req, res, next) => {
  try {
    const { quantity, recordId, cartId } = req.body;
    const cart = await Cart.findByIdAndUpdate(
      { _id: cartId },
      { $set: { 'items.$[item].quantity': quantity } },
      {
        arrayFilters: [{ 'item.record': recordId }],
        new: true,
      }
    );

    successHandler(res, 200, cart);
  } catch (error) {
    next(error);
  }
};
