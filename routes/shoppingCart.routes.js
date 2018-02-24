const express = require('express');
const router = express.Router();
const shoppingCartController = require('../controllers/shoppingCart.controller');


router.get('/shoppingCart', shoppingCartController.showShoppingCart);
router.get('/add-to-cart/:name', shoppingCartController.addToCart);
router.get('/remove-from-cart/:email/:name', shoppingCartController.removeFromCart);
router.get('/ckeckOut', shoppingCartController.buy);
router.get('/pp/ok', shoppingCartController.onPaypalOk);
router.get('/pp/error', shoppingCartController.onPaypalError);

/*
router.post('/shoppingCart', shoppingCartController.buyProducts);
*/

module.exports = router;
