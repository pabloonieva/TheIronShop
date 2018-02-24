const express = require('express');
const router = express.Router();
const shoppingCartController = require('../controllers/shoppingCart.controller');


router.get('/shoppingCart', shoppingCartController.showShoppingCart);
router.get('/add-to-cart/:name', shoppingCartController.addToCart);
router.get('/remove-from-cart/:email/:name', shoppingCartController.removeFromCart);


/*
router.post('/shoppingCart', shoppingCartController.buyProducts);
*/

module.exports = router;
