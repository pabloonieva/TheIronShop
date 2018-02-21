const mongoose = require('mongoose');
const ShoppingCart = require('../models/shoppingCart.model');
const Product = require('../models/product.model');


module.exports.showShoppingCart = (req, res, next) => {

//Aquí tenemos que trabajar con las cookies para poder pasar a la vista carrito la info de carrito de un no-logueado
    
    if(typeof(req.session.currentUser)!='undefined'){

        const userEmail = req.session.currentUser.email;
    
        ShoppingCart.findOne({userEmail:userEmail}, (err, cart) => {
            if (err) { return next(err); }
    
            if (cart) {
                console.log(cart);
                res.render('cart/shopping-cart', {
                    session: req.session.currentUser,
                    shoppingCart: cart
                });

            }else{
                console.log("Carrito not found");
                res.redirect("/home");
            }
        });
    }else{
        console.log("A darte de alta, jefe");
        res.redirect("/signup");
    }
};

module.exports.addToCart = (req, res, next) => {

    const pushedToCartProductName = req.params.name;

    Product.findOne({name:pushedToCartProductName}, (err, pushedToCartProduct) => {

        console.log(pushedToCartProduct);
        pushedToCartProduct = pushedToCartProduct;
    

        if(typeof(req.session.currentUser)!='undefined'){

            const userEmail = req.session.currentUser.email;
        
            ShoppingCart.findOne({userEmail:userEmail}, (err, cart) => {
                if (err) { return next(err); }
        
                if (cart) {
                    cart.productsArray.push(pushedToCartProduct);
                    cart.totalCartPrice += pushedToCartProduct.price;
                    cart.save();
                    console.log(cart);
        
                }else{
        
                    const newShoppingCart = new ShoppingCart({
                        userEmail: userEmail
                    });
                    newShoppingCart.productsArray.push(pushedToCartProduct);
                    newShoppingCart.save();
                    newShoppingCart.totalCartPrice = pushedToCartProduct.price;
                    console.log(newShoppingCart);
                }
            });
            //Flash product added to cart
            res.redirect('/home');
        }else{
            //Message: need to login to purchase
            res.redirect("/signup");
        }
    });    
};

