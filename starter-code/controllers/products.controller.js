const mongoose = require('mongoose');
const Product = require('../models/product.model');
const expressFlash = require('express-flash');

//Recordar vector
module.exports.showUser = (req, res, next) => {
  res.render('home/home');
};
