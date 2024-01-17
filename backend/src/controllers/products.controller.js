const { getAllProductsDataBase, getProductsById } = require('../services/products.service');

const controllerProducts = async (_request, response) => {
  const itens = await getAllProductsDataBase();
  response.status(200).json(itens);
};

const controllerProductById = async (request, response) => {
  const { id } = request.params;
  const item = await getProductsById(id);
  response.status(200).json(item);
};

module.exports = { controllerProducts, controllerProductById };