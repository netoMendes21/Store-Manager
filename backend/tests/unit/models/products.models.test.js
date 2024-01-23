const chai = require('chai');
const sinon = require('sinon');
const { PRODUCT_1, MOCK_ALL_PRODUCTS, PRODUCT_ADD_MOCK,
  UPDATE_MOCK_OUT } = require('../mocks/products.mock');

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

  it('É possível adicionar um produto ao DB', async function () {
    const stub = sinon.stub(ProductModel, 'productAddDB').returns(PRODUCT_ADD_MOCK);
    const addProduct = await ProductModel.productAddDB('Holy Bible');
    expect(addProduct).to.be.deep.equal(PRODUCT_ADD_MOCK);

    stub.restore();
  });

  it('É possível atualizar um nome de produto', async function () {
    const stub = sinon.stub(ProductModel, 'productNameUpdate').returns(UPDATE_MOCK_OUT);
    const product = await ProductModel.productNameUpdate(1, 'Açaí batido com morango');

    expect(product).to.be.deep.equal(UPDATE_MOCK_OUT);
    stub.restore();
  });

  it('É impossível atualizar um nome de um produto inexistente', async function () {
    const stub = sinon.stub(ProductModel, 'productNameUpdate')
      .returns({ status: 404, data: 'Product not found' });

    const product = await ProductModel.productNameUpdate(456, 'Açaí batido com morango');

    expect(product).to.be.deep.equal({ status: 404, data: 'Product not found' });
    stub.restore();
  });

  it('Não é possível atualizar o nome de um produto que tenha um nome com menos de 5 caracteres', async function () {
    const stub = sinon.stub(ProductModel, 'productNameUpdate')
      .returns({ status: 422, data: '"name" length must be at least 5 characters long' });

    const product = await ProductModel.productNameUpdate(69, 'Aça');

    expect(product).to.be.deep.equal({ status: 422, data: '"name" length must be at least 5 characters long' });
    stub.restore();
  });

  it('É possível remover um produto', async function () {
    const stub = sinon.stub(ProductModel, 'deleteProduct').returns({ status: 200, data: 'Product deleted successfully' });

    const product = await ProductModel.deleteProduct(1);

    expect(product).to.be.deep.equal({ status: 200, data: 'Product deleted successfully' });
    stub.restore();
  });
});
