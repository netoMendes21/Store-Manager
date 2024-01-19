const MOCK_ALL_PRODUCTS = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
  {
    id: 3,
    name: 'Escudo do Capitão América',
  },
];

const PRODUCT_1 = {
  id: 1,
  name: 'Martelo de Thor',
};

const PRODUCT_NOT_FOUND = {
  message: 'Product not found',
};

const MOCK_SERVICES = {
  status: 200,
  data: MOCK_ALL_PRODUCTS,
};

module.exports = {
  PRODUCT_1,
  MOCK_ALL_PRODUCTS,
  MOCK_SERVICES,
  PRODUCT_NOT_FOUND,
};