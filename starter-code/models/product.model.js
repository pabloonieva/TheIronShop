const mongoose = require('mongoose');

//creating product class or constructor
// we have name, image and price
const productSchema = new mongoose.Schema({
  name:  {
    type: String,
    required: [true, `Name can't be empty`]
    },
  image: {
    type: String
  },
  price: {
    type: Number,
    required: [true, `Email can't be empty`]
  }
});
