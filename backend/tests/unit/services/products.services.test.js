const chai = require('chai');
const sinon = require('sinon');

const productModel = require('../../../src/models/products.model');

const { expect } = chai;

const {
  PRODUCT_1,
  MOCK_ALL_PRODUCTS,
  PRODUCT_NOT_FOUND,
} = require('../mocks/products.mock');

describe('Products Service', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Lista todos os produtos da DB', async function () {
    const stub = sinon.stub(productModel, 'getAllProductsDataBase').returns(MOCK_ALL_PRODUCTS);

    const result = await productModel.getAllProductsDataBase();

    expect(result).to.be.an('array');
    expect(result).to.be.deep.equal(MOCK_ALL_PRODUCTS);

    stub.restore();
  });

  it('É possível pegar um produto pelo seu id', async function () {
    const stub = sinon.stub(productModel, 'getProductsById').returns(PRODUCT_1);

    const result = await productModel.getProductsById(1);

    expect(result).to.be.deep.equal(PRODUCT_1);

    stub.restore();
  });

  it('Não é possível pegar um produto com id inexistente', async function () {
    const stub = sinon.stub(productModel, 'getProductsById').returns(PRODUCT_NOT_FOUND);

    const result = await productModel.getProductsById(777);

    expect(result).to.be.deep.equal(PRODUCT_NOT_FOUND);

    stub.restore();
  });
});