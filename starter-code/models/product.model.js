const mongoose = require('mongoose');

//creating product class or constructor
// we have name, image and price
const productSchema = new mongoose.Schema({
  name:  {
    type: String,
    required: [true, `Name can't be empty`],
    index: {unique: true}
    },
  image: {
    type: String
  },
  color: {
    type: String
  },
  price: {
    type: Number,
    required: [true, `Email can't be empty`],
    min: 0
  }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
