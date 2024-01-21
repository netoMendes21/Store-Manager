const salesServices = require('../services/sales.services');

const controllerAllSales = async (_req, res) => {
  try {
    const sales = await salesServices.getAllSalesServicesDb();
    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const controllerById = async (req, res) => {
  const { id } = req.params;
  try {
    const sale = await salesServices.getSalesServicesId(id);
    if (!sale || sale.length === 0) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    res.status(200).json(sale);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  controllerAllSales,
  controllerById,
};