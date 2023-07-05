const { Schema, model } = require('mongoose');

const CartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },

  items: [
    {
      record: {
        type: Schema.Types.ObjectId,
        ref: 'Record',
        required: true,
      },

      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],

  total: Number,
});

module.exports = model('Cart', CartSchema);
