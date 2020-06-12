const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, 'a card must have a code'],
      maxlength: [25, " a card can't exceed 25 characters"],
    },
    barcodetype: {
      type: String,
      enum: ['EAN13'],
      default: 'EAN13',
    },
    user: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'a card has to be own by a user'],
      },
    ],
    name: {
      type: String,
      required: [true, 'a card must have a name'],
      trim: true,
      lowercase: true,
    },
    usage: {
      type: Number,
      default: 0,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
