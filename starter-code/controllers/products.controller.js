const mongoose = require('mongoose');
const Product = require('../models/product.model');
const expressFlash = require('express-flash');

//Recordar vector
module.exports.showUser = (req, res, next) => {
  res.render('home/home',{
    listOfProducts: [
      {
        name: "IronSweater",
        color: "light grey",
        image: "https://preview.ibb.co/mURKgS/2018_02_18_10_40_59.jpg",
        price: 35
      },
      {
        name: "IronTshirt",
        color: "blue",
        image: "https://preview.ibb.co/eE6PFn/2018_02_18_10_41_51.jpg",
        price: 10
      },
      {
        name: "IronBottle",
        color: "black",
        image: "https://preview.ibb.co/iFfiqn/2018_02_17_19_39_42.jpg",
        price: 8
      },
    ]
  });
};
