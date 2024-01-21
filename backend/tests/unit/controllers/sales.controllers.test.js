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
});