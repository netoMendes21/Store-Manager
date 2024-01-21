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

const NO_SALE_MOCK = { status: 404, data: { message: 'Product not found' } };

module.exports = {
  SALE_MOCK_1,
  MOCK_ALL_SALES,
  NO_SALE_MOCK,
};