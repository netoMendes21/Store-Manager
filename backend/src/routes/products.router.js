const express = require('express');

const controller = require('../controllers/products.controller');

const router = express.Router();

router.use(express.json());

router.get('/products', controller.controllerProducts);

router.get('/products/:id', controller.controllerProductById);

router.post('/products', controller.controllerAddProduct);

router.delete('/products/:id', controller.removeProductController);

router.put('/products/:id', controller.productNameUpdateController);

module.exports = router;