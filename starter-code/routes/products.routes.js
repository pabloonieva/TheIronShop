const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products.controller');


router.get('/home', productsController.showUser);
router.get('/edit', productsController.showAdmin);
router.post('/edit', productsController.addProduct);
router.get('/updateProduct/:id', productsController.updateProduct);
//router.post('/updateProduct', productsController.updateProduct);
/*
router.post('/products', productsController.addProductToCart);
router.post('/products', productsController.deleteProduct);

*/
module.exports = router;
