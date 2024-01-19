const express = require('express');

const controller = require('../controllers/products.controller');

const router = express.Router();

router.use(express.json());

router.get('/products', controller.controllerProducts);

router.get('/products/:id', controller.controllerProductById);

module.exports = router;