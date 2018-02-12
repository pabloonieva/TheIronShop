const express = require('express');
const router = express.Router();
const Controller = require('../controllers/shoppingCart.controller');

router.get('/shoppingCart', shoppingCartController.showUser);
router.post('/shoppingCart', shoppingCartController.buyProducts);
