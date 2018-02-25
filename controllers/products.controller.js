const mongoose = require('mongoose');
const Product = require('../models/product.model');
const expressFlash = require('express-flash');


module.exports.showUser = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render('home/home', {
        listOfProducts: products,
        session: req.user,
        url: req.originalUrl
      });
    })
    .catch(error => next(error));
};

module.exports.showAdmin = (req, res, next) => {
  if (!req.user) {
    res.redirect("http://www.i-fuckyou.com/");
  } else {
    Product.find()
      .then(products => {
        console.log(req.user);
        if (!req.user.isAdmin) {
          res.redirect("http://www.i-fuckyou.com/");
        } else {
          res.render('home/edit', {
            listOfProducts: products,
            session:req.user,
            url: req.originalUrl
          });
        }
      })
      .catch(error => next(error));
  }
};

module.exports.addProduct = (req, res, next) => {
  const newProduct = new Product ({
    name: req.body.name,
    image: req.body.image,
    image2: req.body.image2,
    color: req.body.color,
    price: req.body.price
  });
  newProduct.save()
    .then(() => {
      console.log("Saved correctly");
      res.redirect('/edit');
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
          res.redirect('/edit');
      } else {
          next(error);
      }
    });
};

module.exports.updateProduct = (req, res, next) => {
  productId = req.params.id;
  console.log(productId);
  console.log("Entro");

  var update = {
    name: req.body.name,
    image: req.body.image,
    image2: req.body.image2,
    color: req.body.color,
    price: req.body.price,
    };

  Product.findOne({ _id:productId }, (err, editedProduct) => {
    console.log(editedProduct);
    //console.log(update);
    editedProduct.name = update.name;
    editedProduct.image = update.image;
    editedProduct.image2 = update.image2;
    editedProduct.color = update.color;
    editedProduct.price = update.price;
    editedProduct.save();
    //console.log(editedProduct);
    res.redirect("/edit");
  });
};
module.exports.deleteProduct = (req, res, next) => {
  const productId = req.params.id;

  Product.findByIdAndRemove(productId, (err, product) => {
    if (err){ return next(err); }
    res.redirect('/edit');
  });
};
