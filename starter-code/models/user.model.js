const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name:  {
    type: String,
    required: [true, `Name can't be empty`]
    },
  email: {
    type: String,
    required: [true, `Email can't be empty`]
  },
  password:{
    type: String,
    required: [true, `You need to add your password`]
  },
  address: {
    type: String
  },
  paymentMethod: {
    type: Number
  }
});
