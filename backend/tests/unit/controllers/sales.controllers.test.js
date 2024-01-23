const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chaiHttp = require('chai-http');

const { expect } = chai;

const salesServices = require('../../../src/services/sales.services');
const salesControllers = require('../../../src/controllers/sales.controller');

const {
  SALE_MOCK_1,
  MOCK_ALL_SALES,
  NO_SALE_MOCK,
  ADD_ONE_SALE_MOCK,
  RESPONSE_ADD_ONE_SALE_MOCK,
  RESPONSE_NEW_ADD_ONE_SALE_MOCK,
  ADD_TWO_SALES_MOCK,
  RESPONSE_ADD_TWO_SALES_MOCK,
  RESPONSE_NEW_ADD_TWO_SALES_MOCK,
} = require('../mocks/sales.mock');

chai.use(chaiHttp);
chai.use(sinonChai);

describe('Testes para sales controller', function () {
  afterEach(function () {
    sinon.restore();
  });

  describe('Quando a existe sale no DB', function () {
    it('Retorne uma lista com todas as vendas', async function () {
      const request = {
        params: {
          id: 1,
        },
      };
      const response = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub().returnsThis(),
      };
      const stub = sinon.stub(salesServices, 'getAllSalesServicesDb').returns(MOCK_ALL_SALES);
      await salesControllers.controllerAllSales(request, response);
      expect(response.status).to.have.been.calledWith(200);
      expect(response.json).to.have.been.calledWith(MOCK_ALL_SALES);
      stub.restore();
    });
  
    it('Retorna uma venda pelo id', async function () {
      const response = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub().returnsThis(),
      };
      const request = {
        params:
        {
          id: 1,
        },
      };
      const stub = sinon.stub(salesServices, 'getSalesServicesId').returns(SALE_MOCK_1);
      await salesControllers.controllerById(request, response);
      expect(response.status).to.have.been.calledWith(200);
      expect(response.json).to.have.been.calledWith(SALE_MOCK_1);
  
      stub.restore();
    });
  });

  describe('Quando a venda não existe no DB', function () {
    it('Retorna uma mensagem de não encontrado,caso não tenha no DB', async function () {
      const response = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub().returnsThis(),
      };
      const request = {
        params:
        {
          id: 1,
        },
      };
      const stub = sinon.stub(salesServices, 'getSalesServicesId').returns(NO_SALE_MOCK);
      await salesControllers.controllerById(request, response);
  
      expect(response.status).to.have.been.calledWith(200);
      stub.restore();
    });
  });

  describe('Sale adicionada com sucesso', function () {
    it('É possível adicionar uma sale', async function () {
      const req = {
        body: ADD_ONE_SALE_MOCK,
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub().returnsThis(),
      };
      const stub = sinon.stub(salesServices, 'addProductSale').resolves(RESPONSE_ADD_ONE_SALE_MOCK);
      const stubSecond = sinon.stub(salesServices, 'getSalesServicesId').resolves(RESPONSE_NEW_ADD_ONE_SALE_MOCK);
      await salesControllers.addSale(req, res);
      expect(res.status).to.have.been.calledWith(201);
      stub.restore();
      stubSecond.restore();
    });

    it('É possível adicionar duas sales', async function () {
      const req = {
        body: ADD_TWO_SALES_MOCK,
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub().returnsThis(),
      };
      const stub = sinon.stub(salesServices, 'addProductSale').resolves(RESPONSE_ADD_TWO_SALES_MOCK);
      const stubSecond = sinon.stub(salesServices, 'getSalesServicesId').resolves(RESPONSE_NEW_ADD_TWO_SALES_MOCK);
      await salesControllers.addSale(req, res);
      expect(res.status).to.have.been.calledWith(201);
      stub.restore();
      stubSecond.restore();
    });
  });
});