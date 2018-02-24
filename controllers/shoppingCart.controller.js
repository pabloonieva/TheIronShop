const mongoose = require('mongoose');
const ShoppingCart = require('../models/shoppingCart.model');
const Product = require('../models/product.model');
const paypal = require('../configs/paypal.config');


module.exports.showShoppingCart = (req, res, next) => {
  //Aquí tenemos que trabajar con las cookies para poder pasar a la vista carrito la info de carrito de un no-logueado
  if (req.user) {
      const userEmail = req.user.email;

      ShoppingCart.findOne({ userEmail:userEmail }, (err, cart) => {
          if (err) { return next(err); }
          if (cart) {
              //console.log(cart);
              res.render('cart/shopping-cart', {
                  session: req.user,
                  shoppingCart: cart,
                  url: req.originalUrl
              });

          }else{
              console.log("Carrito not found");
              res.redirect("/home");
          }
      });
    } else {
        //Deberíamos imprimir mensaje: para acceder carro log in
        res.redirect("/login");
    }
};

module.exports.addToCart = (req, res, next) => {

    const pushedToCartProductName = req.params.name;

    Product.findOne({name:pushedToCartProductName}, (err, pushedToCartProduct) => {
        //console.log(pushedToCartProduct);
        pushedToCartProduct = pushedToCartProduct;

        if (req.user) {
            const userEmail = req.user.email;

            ShoppingCart.findOne({ userEmail:userEmail }, (err, cart) => {
                if (err) { return next(err); }
                if (cart) {
                    cart.productsArray.push(pushedToCartProduct);
                    cart.totalCartPrice += pushedToCartProduct.price;
                    cart.save();
                    //console.log(cart);
                } else {
                    const newShoppingCart = new ShoppingCart({
                        userEmail: userEmail
                    });
                    newShoppingCart.productsArray.push(pushedToCartProduct);
                    newShoppingCart.save();
                    newShoppingCart.totalCartPrice = pushedToCartProduct.price;
                    //console.log(newShoppingCart);
                }
            });
            //Flash product added to cart
            res.redirect('/home');
        }else{
            //Message: need to login to purchase
            res.redirect("/login");
        }
    });
};

module.exports.removeFromCart = (req, res, next) => {
    const removedProductUserEmail = req.params.email;
    const removedProductName = req.params.name;

    ShoppingCart.findOne({userEmail:removedProductUserEmail}, (err, cart) => {

        for (let i = 0; i < cart.productsArray.length; i++) {
            if (cart.productsArray [ i ].name === removedProductName) {
                indexOfProduct = i;
            }
        }
        cart.totalCartPrice -= cart.productsArray [indexOfProduct].price;
        cart.productsArray.splice(indexOfProduct,1);
        cart.save();
    });
    res.redirect("/shoppingCart");
}

module.exports.buy = (req, res, next) => {
  ShoppingCart.findOne({ userEmail: req.user.email })
    .then(cart => {
      paypal.pay(cart._id, cart.totalCartPrice, 'IronShop', 'EUR', true, ['custom', 'data'], function(error, url) {
      	if (error) {
      		console.log(error);
      		next(error);
      	}
      	// redirect to paypal webpage
      	res.redirect(url);
      });
    })
    .catch(error => next(error));
}

module.exports.onPaypalOk = (req, res, next) => {
  const payerID = req.query.PayerID;
  const token = req.query.token;

  paypal.detail(token, payerID, (error, data, invoiceNumber, price) => {
  	if (error) {
  		console.log(error);
  		next(error);
  	}
    console.log(data);
    if (data.success) {
      console.log('SUCCESS');
      const orderId = data.CUSTOM.split('|')[0];
      console.log(orderId);
      ShoppingCart.remove({ userEmail: req.user.email, _id: orderId })
        .then(() => {
          res.redirect('/');
        })
        .catch(error => next(error));
    } else {
      console.log('FAIL');
      res.redirect('/');
    }
  });
}

module.exports.onPaypalError = (req, res, next) => {
  res.redirect('/shoppingCart');
}
