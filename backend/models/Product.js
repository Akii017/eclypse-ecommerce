const mongoose = require('mongoose');

const SIZES = ["XS", "S", "M", "L", "XL"];

const productSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: String,
  sizes: [{
    type: String,
    enum: SIZES
  }],
  images: [{
    type: String
  }],
  stock: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema); 