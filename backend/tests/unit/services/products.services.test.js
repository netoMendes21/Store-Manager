const chai = require('chai');
const sinon = require('sinon');

const productModel = require('../../../src/models/products.model');

const productsServices = require('../../../src/services/products.service');

const { expect } = chai;

const {
  PRODUCT_1,
  MOCK_ALL_PRODUCTS,
  PRODUCT_NOT_FOUND,
  PRODUCT_ADD_MOCK,
  UPDATE_MOCK_OUT,
} = require('../mocks/products.mock');

describe('Products Service', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Lista todos os produtos da DB', async function () {
    const stub = sinon.stub(productModel, 'getAllProductsDataBase').returns(MOCK_ALL_PRODUCTS);

    const result = await productsServices.allProducts();

    expect(result).to.be.an('array');
    expect(result).to.be.deep.equal(MOCK_ALL_PRODUCTS);

    stub.restore();
  });

  it('É possível pegar um produto pelo seu id', async function () {
    const stub = sinon.stub(productModel, 'getProductsById').returns(PRODUCT_1);

    const result = await productsServices.productsByID(1);

    expect(result).to.be.deep.equal(PRODUCT_1);

    stub.restore();
  });

  it('Não é possível pegar um produto com id inexistente', async function () {
    const stub = sinon.stub(productModel, 'getProductsById').returns(PRODUCT_NOT_FOUND);

    const result = await productModel.getProductsById(777);

    expect(result).to.be.deep.equal(PRODUCT_NOT_FOUND);

    stub.restore();
  });

  it('É possível adicionar um produto ao DB', async function () {
    const stub = sinon.stub(productModel, 'productAddDB').returns(PRODUCT_ADD_MOCK);
    const addProduct = await productModel.productAddDB('Holy Bible');
    expect(addProduct).to.be.deep.equal(PRODUCT_ADD_MOCK);

    stub.restore();
  });

  it('É possível atualizar o nome de um produto', async function () {
    const stub = sinon.stub(productModel, 'productNameUpdate').returns(UPDATE_MOCK_OUT);

    const result = await productModel.productNameUpdate(1, 'Açaí batido com morango');

    expect(result).to.be.deep.equal(UPDATE_MOCK_OUT);

    stub.restore();
  });

  it('É impossível atualizar um nome de um produto inexistente', async function () {
    const stub = sinon.stub(productModel, 'productNameUpdate')
      .returns({ status: 404, data: 'Product not found' });

    const result = await productModel.productNameUpdate(683, 'Açaí batido com morango');

    expect(result).to.be.deep.equal({ status: 404, data: 'Product not found' });

    stub.restore();
  });

  it('Não é possível atualizar o nome de um produto que tenha um nome com menos de 5 caracteres', async function () {
    const stub = sinon.stub(productModel, 'productNameUpdate')
      .returns({ status: 422, data: '"name" length must be at least 5 characters long' });

    const result = await productModel.productNameUpdate(54, 'Aça');

    expect(result).to.be.deep.equal({ status: 422, data: '"name" length must be at least 5 characters long' });

    stub.restore();
  });

  it('Deve ser possível remover um produto', async function () {
    const stub = sinon.stub(productModel, 'deleteProduct').returns(null);

    const result = await productModel.deleteProduct(1);

    expect(result).to.be.deep.equal(null);

    stub.restore();
  });

  it('Não é possível deletar um produto inexistente', async function () {
    const stub = sinon.stub(productModel, 'deleteProduct')
      .returns({ status: 404, data: 'Product not found' });

    const result = await productModel.deleteProduct(446);

    expect(result).to.be.deep.equal({ status: 404, data: 'Product not found' });

    stub.restore();
  });
});