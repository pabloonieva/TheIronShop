const mongoose = require('mongoose');
const shoppingCart = require('../models/shoppingCart.model');

module.exports.showShoppingCart = (req, res, next) => {

    res.render('cart/shopping-cart', {
        session: req.session.currentUser,

    });
};

module.exports.addToCart = (req, res, next) => {
    
    const productNameAndPrice = {
        name: req.params.name,
        price: parseFloat(req.params.price)
    }

    if(tyoeOf(session)!='undefined'){

        const userEmail = req.session.currentUser.email;
    
        shoppingCart.findOne({userEmail:userEmail}, (err, email) => {
            if (err) { return next(err); }
    
            if (email) {
                email.productsArray.push(productNameAndPrice);
                email.totalCartPrice += productNameAndPrice.price;
                email.save();
                console.log(email);
    
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
        redirect("/signup");
    }
   
        
};

