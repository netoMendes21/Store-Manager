const productsServices = require('../services/products.service');

const controllerProducts = async (_request, response) => {
  try {
    const itens = await productsServices.allProducts();
    response.status(200).json(itens);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};  

const controllerProductById = async (request, response) => {
  try {
    const { id } = request.params;
    const item = await productsServices.productsByID(id);
    if (!item) {
      return response.status(404).json({ message: 'Product not found' });
    }
    response.status(200).json(item);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

module.exports = { controllerProducts, controllerProductById };