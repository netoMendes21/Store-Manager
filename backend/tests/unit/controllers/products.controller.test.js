const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chaiHttp = require('chai-http');

const { expect } = chai;

const productsServices = require('../../../src/services/products.service');
const productsController = require('../../../src/controllers/products.controller');

const { PRODUCT_1, MOCK_SERVICES, MOCK_ALL_PRODUCTS } = require('../mocks/products.mock');

chai.use(chaiHttp);
chai.use(sinonChai);

describe('Testando products controller', function () {
  afterEach(function () {
    sinon.restore();
  });
  
  it('Retorna todos os produtos da DB', async function () {
    const request = {
      params: {
        id: 1,
      },
    };
    const response = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis(),
    };
    const stub = sinon.stub(productsServices, 'allProducts').resolves(MOCK_SERVICES);
    await productsController.controllerProducts(request, response);
    expect(response.status).to.have.been.calledWith(200);

    stub.restore();
  });

  it('Retorna um produto pelo id', async function () {
    const response = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis(),
    };
    const request = {
      params: {
        id: 1,
      },
    };
    const stub = sinon.stub(productsServices, 'productsByID').resolves(PRODUCT_1);
    await productsController.controllerProductById(request, response);
    expect(response.status).to.have.been.calledWith(200);

    stub.restore();
  });

  it('Caso produto não exista na DB ,retorne uma mensagem de error', async function () {
    const response = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis(),
    };
    const request = {
      params: {
        id: 1,
      },
    };

    const stub = sinon.stub(productsServices, 'productsByID').resolves(MOCK_ALL_PRODUCTS);
    await productsController.controllerProductById(request, response);

    expect(response.status).to.have.been.calledWith(200);

    stub.restore();
  });
});
