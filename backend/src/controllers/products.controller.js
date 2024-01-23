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

const idValidator = (id) => !id || id === undefined;

const nameValidator = (name) => !name || name === undefined;

const productNameUpdateController = async (request, response) => {
  const { id } = request.params;
  const { name } = request.body;
  try {
    if (idValidator(id)) {
      return response.status(404).json({ message: 'Product not found' });
    }
    if (nameValidator(name)) {
      return response.status(400).json({ message: '"name" is required' });
    }
    if (name.length < 5) {
      return response.status(422)
        .json({ message: '"name" length must be at least 5 characters long' });
    }
    const productUpdate = await productsServices.productNameUpdateServices(id, name);
    response.status(200).json(productUpdate); 
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

const removeProductController = async (req, res) => {
  const { id } = req.params;
  try {
    if (idValidator(id)) {
      return res.status(404).json({ message: 'Product not found' });
    }
    await productsServices.deleteProductService(id);
    res.status(204).end();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = { 
  controllerProducts, 
  controllerProductById, 
  controllerAddProduct,
  productNameUpdateController,
  removeProductController };