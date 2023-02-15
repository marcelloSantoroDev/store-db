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
});