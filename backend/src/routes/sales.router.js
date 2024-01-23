const express = require('express');
const salesController = require('../controllers/sales.controller');

const router = express.Router();

router.use(express.json());
router.get('/sales', salesController.controllerAllSales);

router.post('/sales', salesController.addSale);

router.get('/sales/:id', salesController.controllerById);

module.exports = router;
