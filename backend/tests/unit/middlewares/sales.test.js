const sinon = require('sinon');
const chai = require('chai');

const { expect } = chai;

const middlewaresSales = require('../../../src/middlewares/validateSale');
const productsModels = require('../../../src/models/products.model');

describe('Testando o middleware das validações de vendas', function () {
  it('Deve passar para o próximo middleware se a venda for validada', async function () {
    const request = {
      body: [
        { productId: 1, quantity: 1 },
        { productId: 2, quantity: 2 },
      ],
    };
    const response = {};
    const next = sinon.stub();

    sinon.stub(productsModels, 'getProductsById').resolves({ id: 1, name: 'Produto 1' });

    await middlewaresSales.validateSale(request, response, next);

    expect(next.calledOnce).to.be.equal(true);

    productsModels.getProductsById.restore();
  });

  it('Deve retornar um erro se o produto não existir', async function () {
    const request = {
      body: [
        { productId: 1, quantity: 1 },
        { productId: 2, quantity: 2 },
      ],
    };
    const response = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub();

    sinon.stub(productsModels, 'getProductsById').resolves(null);

    await middlewaresSales.validateSale(request, response, next);

    expect(response.status.calledWith(404)).to.be.equal(true);
    expect(response.json.calledWith({ message: 'Product not found' })).to.be.equal(true);

    productsModels.getProductsById.restore();
  });

  it('Deve passar para outro middleware quando as condições que foram estabelecidas sejam cumpridas', async function () {
    const request = {
      body: [
        { productId: 1, quantity: 1 },
        { productId: 2, quantity: 2 },
      ],
    };
    const response = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub();

    sinon.stub(productsModels, 'getProductsById').resolves({ id: 1, name: 'Produto 1', quantity: 1 });

    await middlewaresSales.validateSalesProductQuantity(request, response, next);

    expect(next.calledOnce).to.be.equal(false);

    productsModels.getProductsById.restore();
  });

  it('Retorna um erro 400 se as condições estabelecidas não forem cumpridas', async function () {
    const request = {
      body: [
        { productId: 1 },
        { productId: 2, quantity: 2 },
      ],
    };
    const response = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub();

    await middlewaresSales.validateSalesProductQuantity(request, response, next);

    expect(response.status.calledWith(400)).to.be.equal(true);
    expect(response.json.calledWith({ message: '"quantity" is required' })).to.be.equal(true);
  });

  it('Deve retornar erro 422 se a quantidade for menor que 1', async function () {
    const req = {
      body: [
        { productId: 1, quantity: 0 },
        { productId: 2, quantity: 2 },
      ],
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub();

    await middlewaresSales.validateSalesProductQuantity(req, res, next);

    expect(res.status.calledWith(422)).to.be.equal(false);
    expect(next.calledOnce).to.be.equal(false);
  });
});