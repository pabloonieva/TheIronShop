const mongoose = require('mongoose');
const shoppingCart = require('../models/shoppingCart.model');

module.exports.showShoppingCart = (req, res, next) => {

//Aquí tenemos que trabajar con las cookies para poder pasar a la vista carrito la info de carrito de un no-logueado
    
    if(typeof(req.session.currentUser)!='undefined'){

        const userEmail = req.session.currentUser.email;
    
        shoppingCart.findOne({userEmail:userEmail}, (err, cart) => {
            if (err) { return next(err); }
    
            if (cart) {
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

    const productNameAndPrice = {
        name: req.params.name,
        price: parseFloat(req.params.price)
    }

//Aquí tenemos que trabajar con las cookies para poder guardar carritos de no-logueados y trabajar con ellos

    if(typeof(req.session.currentUser)!='undefined'){

        const userEmail = req.session.currentUser.email;
    
        shoppingCart.findOne({userEmail:userEmail}, (err, cart) => {
            if (err) { return next(err); }
    
            if (cart) {
                cart.productsArray.push(productNameAndPrice);
                cart.totalCartPrice += productNameAndPrice.price;
                cart.save();
                console.log(cart);
    
            }else{
    
                const newShoppingCart = new shoppingCart({
                    userEmail: userEmail
                });
                newShoppingCart.productsArray.push(productNameAndPrice);
                newShoppingCart.save();
                newShoppingCart.totalCartPrice = productNameAndPrice.price;
                console.log(newShoppingCart);
            }
        });
        res.redirect('/home');
    }else{
        res.redirect("/signup");
    }
   
        
};

