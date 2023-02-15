const { expect } = require('chai');
const sinon = require('sinon');

const { salesModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');

const {
  successfullRequisitionMock,
  successfullResponseMock,
  requisitionWithoutIdMock,
  requisitionWithoutQuantityMock,
  invalidQuantityMock,
  productNotFoundMock,
} = require('./mocks/sales.mocks');

describe('testes unitários paraa camada service de sales', function () {
  describe('cadastro de vendas', function () {
    it('cadastra uma venda com sucesso', async function () {
      // arrange
      sinon.stub(salesModel, 'insert').resolves(4);
      sinon.stub(salesModel, 'salesProductsInsert').resolves(null);
      // act
      const result = await salesService.salesProductsInsert(successfullRequisitionMock);
      // assert
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(successfullResponseMock);
    });
    it('retorna erro por falta do campo productId', async function () {
      // act
      const result = await salesService.salesProductsInsert(requisitionWithoutIdMock);
      // assert
      expect(result.type).to.equal('NOT_FOUND');
      expect(result.message).to.equal('"productId" is required');
    });
    it('retorna erro por falta do campo quantity', async function () {
      // act
      const result = await salesService.salesProductsInsert(requisitionWithoutQuantityMock);
      // assert
      expect(result.type).to.equal('NOT_FOUND');
      expect(result.message).to.equal('"quantity" is required');
    });
    it('retorna erro - campo quantity inválido', async function () {
      // act
      const result = await salesService.salesProductsInsert(invalidQuantityMock);
      // assert
      expect(result.type).to.equal('INVALID_QUANTITY');
      expect(result.message).to.equal('"quantity" must be greater than or equal to 1');
    });
     it('retorna erro - product não encontrado no DB', async function () {
      // act
      const result = await salesService.salesProductsInsert(productNotFoundMock);
      // assert
      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.equal('Product not found');
    });
  });
});
