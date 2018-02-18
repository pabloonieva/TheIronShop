const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products.controller');


router.get('/home', productsController.showUser);
router.get('/edit', productsController.showAdmin);

/*
router.post('/products', productsController.addProductToCart);
router.post('/products', productsController.addProduct);
router.post('/products', productsController.deleteProduct);
router.post('/products', productsController.updateProduct);
*/
module.exports = router;
