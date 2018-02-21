const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products.controller');


router.get('/home', productsController.showUser);
router.get('/edit', productsController.showAdmin);
router.post('/edit', productsController.addProduct);
router.post('/updateProduct/:id', productsController.updateProduct);
router.post('/deleteProduct/:id', productsController.deleteProduct);
//router.post('/updateProduct', productsController.updateProduct);
/*
router.post('/products', productsController.addProductToCart);


*/
module.exports = router;
