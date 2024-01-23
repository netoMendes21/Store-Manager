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

const controllerAddProduct = async (request, response) => {
  const { name } = request.body;
  if (!name || name === undefined) {
    return response.status(400).json({ message: '"name" is required' });
  }
  if (name.length < 5) {
    return response.status(422)
      .json({ message: '"name" length must be at least 5 characters long' });
  }
  const insertedProduct = await productsServices.productAddDbService(name); 
  response.status(201).json(insertedProduct);
};

module.exports = { controllerProducts, controllerProductById, controllerAddProduct };