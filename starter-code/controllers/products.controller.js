const mongoose = require('mongoose');
const Product = require('../models/product.model');
const expressFlash = require('express-flash');



module.exports.showUser = (req, res, next) => {
  Product.find({}, (err, listOfProducts) => {
    if (err) { return next(err); }
    console.log(listOfProducts);
    res.render('home/home', {
      listOfProducts:listOfProducts,
      session:req.session.currentUser,
      url: req.originalUrl
    });
  });
};

module.exports.showAdmin = (req, res, next) => {
  Product.find({}, (err, listOfProducts) => {
    if (err) {return next(err);}
    if(req.session.currentUser){
      if(!req.session.currentUser.isAdmin){
        res.redirect("http://www.i-fuckyou.com/");
        }else{
          res.render('home/edit', {
            listOfProducts:listOfProducts,
            session:req.session.currentUser,
            url: req.originalUrl
          });
        }
    }else{
      res.redirect("http://www.i-fuckyou.com/");
    }
  });
};

module.exports.addProduct = (req, res, next) => {
  const newProduct = new Product ({
    name: req.body.name,
    image: req.body.image,
    color: req.body.color,
    price: req.body.price
  });
  newProduct.save()
    .then(() => {
      console.log("Saved correctly");
      res.redirect('/edit');
    });
};

module.exports.updateProduct = (req, res, next) => {
  productId = req.params.id;
  console.log(productId);
  console.log("Entro");

  var update = {
    name: req.body.name,
    image: req.body.image,
    color: req.body.color,
    price: req.body.price,
    };
    
  Product.findOne({ _id:productId }, (err, editedProduct) => {
    console.log(editedProduct);
    //console.log(update);
    editedProduct.name = update.name;
    editedProduct.image = update.image;
    editedProduct.color = update.color;
    editedProduct.price = update.price;
    editedProduct.save();
    //console.log(editedProduct);
    res.redirect("/edit");
  });
};
module.exports.deleteProduct = (req, res, next) => {
  const productId = req.params.id;
  //console.log(productId);
  //console.log("Heeeeeeeello");

  Product.findByIdAndRemove(productId, (err, product) => {
    if (err){ return next(err); }
    res.redirect('/edit');
  });
};

/*
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
      }
    ]
  });
};
*/
