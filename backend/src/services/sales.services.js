const salesModels = require('../models/sales.models');

const getAllSalesServicesDb = async () => {
  const sales = await salesModels.getAllSalesDb();
  return sales;
};

const getSalesServicesId = async (id) => {
  const sale = await salesModels.getSalesId(id);
  return sale;
};

module.exports = {
  getAllSalesServicesDb,
  getSalesServicesId,
};