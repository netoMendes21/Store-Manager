const { getAllProductsDataBase, getProductsById } = require('../models/products');

const allProducts = async () => {
  const itens = await getAllProductsDataBase();
  return { status: 200, data: itens };
};

const productsByID = async (id) => {
  const item = await getProductsById(id);
  if (!item || item.length === 0) {
    return { status: 404, data: { message: 'Product not found' } };
  }
  return { status: 200, data: item };
};

module.exports = {
  allProducts,
  productsByID,
};