const chai = require('chai');
const sinon = require('sinon');
const { PRODUCT_1, MOCK_ALL_PRODUCTS } = require('../mocks/products.mock');

const { expect } = chai;
const ProductModel = require('../../../src/models/products.model');

describe('Products Model', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Retorne todos os produtos', async function () {
    const stub = sinon.stub(ProductModel, 'getAllProductsDataBase').returns(MOCK_ALL_PRODUCTS);
    const products = await ProductModel.getAllProductsDataBase();

    expect(products).to.be.an('array');
    expect(products).to.be.deep.equal(MOCK_ALL_PRODUCTS);

    stub.restore();
  });

  it('Não é possível retornar um produto inexistente', async function () {
    const stub = sinon.stub(ProductModel, 'getProductsById').returns({ status: 404, data: { message: 'Product not found' } });

    const product = await ProductModel.getProductsById(555);

    expect(product).to.be.deep.equal({ status: 404, data: { message: 'Product not found' } });

    stub.restore();
  });

  it('É possível inserir um novo produto pelo id', async function () {
    const stub = sinon.stub(ProductModel, 'getProductsById').returns(PRODUCT_1);
    const product = await ProductModel.getProductsById(1);

    expect(product).to.be.deep.equal(PRODUCT_1);
    stub.restore();
  });
});
