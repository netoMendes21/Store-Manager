const chai = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connections');
const {
  SALE_MOCK_1,
  MOCK_ALL_SALES,
  NO_SALE_MOCK,
  ADD_ONE_SALE_MOCK,
  ADD_TWO_SALES_MOCK,
  RESPONSE_ADD_ONE_SALE_MOCK,
  RESPONSE_ADD_TWO_SALES_MOCK,
} = require('../mocks/sales.mock');

const { expect } = chai;
const salesModels = require('../../../src/models/sales.models');

describe('Sales Models', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Liste todas as Sales', async function () {
    const stub = sinon.stub(salesModels, 'getAllSalesDb').returns(MOCK_ALL_SALES);

    const sales = await salesModels.getAllSalesDb();

    expect(sales).to.be.an('array');
    expect(sales).to.be.deep.equal(MOCK_ALL_SALES);

    stub.restore();
  });

  it('Não deve ser possível listar uma sale inexistente', async function () {
    const stub = sinon.stub(salesModels, 'getSalesId').returns(NO_SALE_MOCK);

    const sale = await salesModels.getSalesId(10);

    expect(sale).to.be.deep.equal(NO_SALE_MOCK);
    stub.restore();
  });

  it('É possível pegar apenas uma sale no DB', async function () {
    const stub = sinon.stub(salesModels, 'getSalesId').returns(SALE_MOCK_1);
    const sale = await salesModels.getSalesId(1);

    expect(sale).to.be.deep.equal(SALE_MOCK_1);
    stub.restore();
  });
  
  it('Deve ser possível inserir uma sale', async function () {
    const stub = sinon.stub(salesModels, 'addNewSale').returns(RESPONSE_ADD_ONE_SALE_MOCK);
    const product = await salesModels.addNewSale(ADD_ONE_SALE_MOCK);
  
    expect(product).to.be.deep.equal(RESPONSE_ADD_ONE_SALE_MOCK);
    stub.restore();
  });
  
  it('Deve ser possível inserir duas sales', async function () {
    const stub = sinon.stub(salesModels, 'addNewSale').returns(RESPONSE_ADD_TWO_SALES_MOCK);
    const product = await salesModels.addNewSale(ADD_TWO_SALES_MOCK);
  
    expect(product).to.be.deep.equal(RESPONSE_ADD_TWO_SALES_MOCK);
    stub.restore();
  });

  it('Retorna um produto pelo id usando a connection com o MOCK', async function () {
    const stub = sinon.stub(connection, 'execute').resolves([MOCK_ALL_SALES]);

    const products = await salesModels.getSalesId(1);

    expect(products).to.be.an('array');
    expect(products).to.be.deep.equal(MOCK_ALL_SALES);

    stub.restore();
  });

  it('Todos os produtos devem ser retornados pela connection com o MOCK', async function () {
    const stub = sinon.stub(connection, 'execute').resolves([MOCK_ALL_SALES]);

    const products = await salesModels.getAllSalesDb();

    expect(products).to.be.an('array');
    expect(products).to.be.deep.equal(MOCK_ALL_SALES);

    stub.restore();
  });

  it('Deve ser possível adicionar um produto através da connection com o MOCK', async function () {
    const stub = sinon.stub(connection, 'execute').resolves([MOCK_ALL_SALES]);

    const products = await salesModels.addNewSale(ADD_ONE_SALE_MOCK);

    expect(products).to.be.an('array');
    expect(products).to.be.deep.equal(MOCK_ALL_SALES);

    stub.restore();
  });
});
