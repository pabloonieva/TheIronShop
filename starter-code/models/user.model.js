const mongoose = require('mongoose');

//creating user class or constructor
// we have name, email, password, address and paymentMethod
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
