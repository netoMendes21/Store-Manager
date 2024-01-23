const SALE_MOCK_1 = {
  id: 1,
  date: '2024-01-18 01:11:44',
  saleId: 1,
  productId: 1,
  quantity: 5,
};

const MOCK_ALL_SALES = [
  {
    id: 1,
    date: '2024-01-18 01:11:44',
    saleId: 1,
    productId: 1,
    quantity: 5,
  },
  {
    id: 2,
    date: '2024-01-18 01:11:44',
    saleId: 1,
    productId: 2,
    quantity: 10,
  },
  {
    id: 3,
    date: '2024-01-18 01:11:44',
    saleId: 2,
    productId: 3,
    quantity: 15,
  },
];

const ADD_ONE_SALE_MOCK = [
  {
    productId: 1,
    quantity: 50,
  },
];

const ADD_TWO_SALES_MOCK = [
  {
    productId: 1,
    quantity: 416,
  },
  {
    productId: 2,
    quantity: 416,
  },
];

const RESPONSE_ADD_ONE_SALE_MOCK = 111;

const RESPONSE_ADD_TWO_SALES_MOCK = {
  id: 666,
};

const RESPONSE_NEW_ADD_ONE_SALE_MOCK = [
  {
    productId: 3,
    quantity: 416,
  },
];

const RESPONSE_NEW_ADD_TWO_SALES_MOCK = [
  {
    productId: 3,
    quantity: 354384,
  },
  {
    productId: 4,
    quantity: 354384,
  },
];

const NO_SALE_MOCK = { status: 404, data: { message: 'Product not found' } };

module.exports = {
  SALE_MOCK_1,
  MOCK_ALL_SALES,
  NO_SALE_MOCK,
  ADD_ONE_SALE_MOCK,
  ADD_TWO_SALES_MOCK,
  RESPONSE_ADD_ONE_SALE_MOCK,
  RESPONSE_ADD_TWO_SALES_MOCK,
  RESPONSE_NEW_ADD_ONE_SALE_MOCK,
  RESPONSE_NEW_ADD_TWO_SALES_MOCK,
};