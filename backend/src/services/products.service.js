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

const productNameUpdateServices = async (id, name) => {
  const product = await productModel.getProductsById(id);
  if (!product) {
    throw new Error('Product not found');
  }
  await productModel.productNameUpdate(id, name);
  const productUpdate = await productModel.getProductsById(id);
  return productUpdate;
};

module.exports = {
  allProducts,
  productsByID,
  productAddDbService,
  productNameUpdateServices,
};