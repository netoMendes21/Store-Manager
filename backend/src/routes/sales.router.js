const express = require('express');
const salesController = require('../controllers/sales.controller');
const middlewaresSales = require('../middlewares/validateSale');

const router = express.Router();

router.use(express.json());
router.get('/sales', salesController.controllerAllSales);

router.post(
  '/sales', 
  middlewaresSales.validateSale,
  salesController.addSale,
);

router.get('/sales/:id', salesController.controllerById);

module.exports = router;
