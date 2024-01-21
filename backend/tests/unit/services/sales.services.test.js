const chai = require('chai');
const sinon = require('sinon');
const {
  SALE_MOCK_1,
  MOCK_ALL_SALES,
  NO_SALE_MOCK,
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

    const sale = await salesModels.getSalesId(666);

    expect(sale).to.be.deep.equal(NO_SALE_MOCK);
    stub.restore();
  });

  it('É possível pegar apenas uma sale no DB', async function () {
    const stub = sinon.stub(salesModels, 'getSalesId').returns(SALE_MOCK_1);
    const sale = await salesModels.getSalesId(1);

    expect(sale).to.be.deep.equal(SALE_MOCK_1);
    stub.restore();
  });
});
