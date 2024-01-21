const productModel = require('../models/products.model');

const allProducts = async () => {
  const itens = await productModel.getAllProductsDataBase();
  return itens;
};

const productsByID = async (id) => {
  const item = await productModel.getProductsById(id);
  if (!item) {
    const error = new Error('Product not found');
    error.status = 400;
  }
  return item;
};

const productAddDbService = async (name) => {
  const product = await productModel.productAddDB(name);
  return product;
};

module.exports = {
  allProducts,
  productsByID,
  productAddDbService,
};