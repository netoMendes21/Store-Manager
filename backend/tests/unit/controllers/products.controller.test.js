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
    const request = { params: { id: 1 } };
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
    const request = { params: { id: 1 } };
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
    const request = { params: { id: 1 } };

    const stub = sinon.stub(productsServices, 'productsByID').resolves(MOCK_ALL_PRODUCTS);
    await productsController.controllerProductById(request, response);

    expect(response.status).to.have.been.calledWith(200);

    stub.restore();
  });

  it('É possível adicionar um produto ao DB', async function () {
    const request = { body: { name: 'Holy Bible' } };
    const response = { status: sinon.stub().returnsThis(), json: sinon.stub().returnsThis() };
    const stub = sinon.stub(productsServices, 'productAddDbService').resolves(MOCK_SERVICES);
    await productsController.controllerAddProduct(request, response);
    expect(response.status).to.be.calledWith(201);
    stub.restore();
  });
  
  describe('Produto adicionado ao DB com sucesso', function () {
    it('Retorna o produto adicionado ao DB com a mensagem de sucesso', async function () {
      const response = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub().returnsThis(),
      };
      const request = {
        body: {
          name: 'Holy Bible',
        },
      };
      const stub = sinon.stub(productsServices, 'productAddDbService').resolves(MOCK_SERVICES);
      await productsController.controllerAddProduct(request, response);

      expect(response.status).to.have.been.calledWith(201);
      stub.restore();
    });
  });

  describe('Quando não é possível adicionar o produto', function () {
    it('Produto adicionado sem a chave name', async function () {
      const response = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const request = {
        body: {},
      };

      const stub = sinon.stub(productsServices, 'productAddDbService').resolves(null);
      
      await productsController.controllerAddProduct(request, response);
      expect(response.status).to.have.been.calledWith(400);
      expect(response.json).to.have.been.calledWith({ message: '"name" is required' });
      stub.restore();
    });

    it('Error por tentar adicionar um produto com menos de 5 caracteres', async function () {
      const response = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const request = {
        body: {
          name: 'node',
        },
      };
      const stub = sinon.stub(productsServices, 'productAddDbService').resolves(null);
      await productsController.controllerAddProduct(request, response);

      expect(response.status).to.have.been.calledWith(422);
      expect(response.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
      stub.restore();
    });
  });

  describe('Quando o produto é atualizado com sucesso', function () {
    it('Retorna o produto atualizado', async function () {
      const response = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub().returnsThis(),
      };
      const request = {
        params: {
          id: 1,
        },
        body: {
          name: 'Açaí batido com morango',
        },
      };
      const stub = sinon.stub(productsServices, 'productNameUpdateServices').resolves();
      await productsController.productNameUpdateController(request, response);

      expect(response.status).to.have.been.calledWith(200);
      stub.restore();
    });
  });

  describe('Quando há uma falha na atualização do produto', function () {
    it('Sem colocar o nome', async function () {
      const response = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const request = {
        params: {
          id: 1,
        },
        body: {},
      };
      const stub = sinon.stub(productsServices, 'productNameUpdateServices').resolves(null);
      await productsController.productNameUpdateController(request, response);

      expect(response.status).to.have.been.calledWith(400);
      expect(response.json).to.have.been.calledWith({ message: '"name" is required' });
      stub.restore();
    });

    it('Nome com menos de 5 caracteres', async function () {
      const response = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const request = {
        params: {
          id: 1,
        },
        body: {
          name: 'FBI',
        },
      };
      const stub = sinon.stub(productsServices, 'productNameUpdateServices').resolves(null);
      await productsController.productNameUpdateController(request, response);

      expect(response.status).to.have.been.calledWith(422);
      expect(response.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
      stub.restore();
    });

    it('Produto não encontrado', async function () {
      const response = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const request = {
        params: {
          id: 1,
        },
        body: {
          name: 'Açaí batido com morango',
        },
      };
      const stub = sinon.stub(productsServices, 'productNameUpdateServices').resolves({ message: 'Product not found' });
      await productsController.productNameUpdateController(request, response);

      expect(response.status).to.have.been.calledWith(200);
      expect(response.json).to.have.been.calledWith({ message: 'Product not found' });
      stub.restore();
    });
  });

  describe('Quando o produto é deletado com sucesso', function () {
    it('Retorna uma mensagem de sucesso', async function () {
      const response = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub().returnsThis(),
      };
      const request = { params: { id: 1 } };
      const stub = sinon.stub(productsServices, 'deleteProductService').resolves(PRODUCT_1);
      await productsController.removeProductController(request, response);

      expect(response.status).to.have.been.calledWith(204);
      stub.restore();
      sinon.restore();
    });
  });

  describe('Quando o produto não é deletado com sucesso', function () {
    it('Quando o produto é recebido com uma string vazia', async function () {
      const response = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const request = { params: { id: 1 } };
      const stub = sinon.stub(productsServices, 'deleteProductService').resolves(null);
      await productsController.removeProductController(request, response);

      expect(response.status).to.have.been.calledWith(404);
      expect(response.json).to.have.been.calledWith({ message: 'Product not found' });
      stub.restore();
      sinon.restore();
    });
  });
});