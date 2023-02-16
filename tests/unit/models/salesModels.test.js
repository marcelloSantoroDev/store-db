const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');

const { salesModel } = require('../../../src/models');

const {
  successfullRequisitionMock,
  successfullResponseMock,
  requisitionWithoutIdMock,
  requisitionWithoutQuantityMock,
  invalidQuantityMock,
  productNotFoundMock,
  modelInputMock,
  allSalesResponseMock,
  salesByIdMock,
} = require('./mocks/sales.mock');

describe('testes unitários para camada model de sales', function () {
  describe('cadastro de vendas', function () {
    it('cadastra uma venda com sucesso', async function () {
     // arrange
      sinon.stub(connection, 'execute').resolves()
      sinon.stub(salesModel, 'insert').resolves(4);
     // act
      await salesModel.salesProductsInsert(modelInputMock);
     //assert
    });
  });
  describe('listagem de vendas', function () {
    it('lista todas as vendas com sucesso', async function () {
      // arrange
      sinon.stub(connection, 'execute').resolves([allSalesResponseMock]);
      // act
      const result = await salesModel.getAll();
      // assert
      expect(result).to.deep.equal(allSalesResponseMock);
    });
    it('lista uma venda específica com sucesso', async function () {
      // arrange
      sinon.stub(connection, 'execute').resolves([salesByIdMock])
      // act
      const result = await salesModel.getSaleById(1);
      // assert
      expect(result).to.deep.equal(salesByIdMock);
    });
  });
  describe('models utilitárias', function () {
    it('teste de insert para retornar o id correto', async function () {
      // arrange
      sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
      // act
      const result = await salesModel.insert();
      // assert
      expect(result).to.equal(1);
    });
    it('teste de getById', async function () {
      // arrange
      sinon.stub(connection, 'execute').resolves([[{ "id": 1, "date": Date.now() }]])
      // act
      const result = await salesModel.getById(1);
      // assert
      expect(result).to.deep.equal({ "id": 1, "date": Date.now() })
    });
  });
  describe('deletando vendas', function () {
    it('deleta uma venda com sucesso - tabela sales', async function () {
      // arrange
      sinon.stub(connection, 'execute')
        .resolves
        ([
          {
            fieldCount: 0,
            affectedRows: 1,
            insertId: 0,
            info: '',
            serverStatus: 2,
            warningStatus: 0
          }
        ]);
      
      // act
      const result = await salesModel.deleteSale(1);
      expect(result).to.equal(undefined);
    });
    it('deleta uma venda com sucesso - tabela sales_products', async function () {
      // arrange
      sinon.stub(connection, 'execute')
        .resolves
        ([
          {
            fieldCount: 0,
            affectedRows: 0,
            insertId: 0,
            info: '',
            serverStatus: 2,
            warningStatus: 0
          }
        ]);
      
      // act
      const result = await salesModel.deleteSaleProduct(1);
      expect(result).to.equal(undefined);
    });
  });
    afterEach(function () {
    sinon.restore();
    });
});