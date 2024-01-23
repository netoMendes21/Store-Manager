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

const PRODUCT_ADD_MOCK = {
  id: 4, 
  name: 'Holy Bible',
};

const UPDATE_MOCK = {
  name: 'Açaí batido com morango',
};

const UPDATE_MOCK_OUT = {
  id: 1,
  name: 'Açaí batido com morango',
};

const MOCK_PRODUCT_NOT_FOUND = {
  status: 404, data: 'Product not found', 
};

module.exports = {
  PRODUCT_1,
  MOCK_ALL_PRODUCTS,
  MOCK_SERVICES,
  PRODUCT_NOT_FOUND,
  PRODUCT_ADD_MOCK,
  UPDATE_MOCK,
  UPDATE_MOCK_OUT,
  MOCK_PRODUCT_NOT_FOUND,
};