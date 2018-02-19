const mongoose = require('mongoose');
const shoppingCart = require('../models/shoppingCart.model');

module.exports.showShoppingCart = (req, res, next) => {

    res.render('cart/shopping-cart', {
        session: req.session.currentUser
    })

  };