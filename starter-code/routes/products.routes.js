const express = require('express');
const router = express.Router();
const Controller = require('../controllers/products.controller');

router.get('/products', productsController.showUser);
router.post('/products', productsController.addProductToCart);

router.get('/edit', productsController.showAdmin);
router.post('/products', productsController.addProduct);
router.post('/products', productsController.deleteProduct);
router.post('/products', productsController.updateProduct);
