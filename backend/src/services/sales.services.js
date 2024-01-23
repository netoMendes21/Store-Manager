const salesModels = require('../models/sales.models');

const getAllSalesServicesDb = async () => {
  const sales = await salesModels.getAllSalesDb();
  return sales;
};

const getSalesServicesId = async (id) => {
  const sale = await salesModels.getSalesId(id);
  return sale;
};

const addNewSale = async () => {
  const date = new Date();
  const newSale = await salesModels.addNewSale(date);
  return newSale;
};

const addProductSale = async (newSale) => {
  const addSale = await addNewSale();
  const { insertId } = addSale;
  await salesModels.addProductSale(insertId, newSale);
  return insertId;
};

module.exports = {
  getAllSalesServicesDb,
  getSalesServicesId,
  addNewSale,
  addProductSale,
};