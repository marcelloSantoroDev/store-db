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
  allSalesResponseMock,
  salesByIdMock,
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
      // arrange
      sinon.stub(salesModel, 'salesProductsInsert').resolves(null);
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
  describe('listagem de vendas', function () {
    it('lista todas as vendas com sucesso', async function () {
      // arrange
      sinon.stub(salesModel, 'getAll').resolves(allSalesResponseMock);
      // act
      const result = await salesService.getAll();
      // assert
      expect(result.type).to.equal(null);
      expect(result.message).to.equal(allSalesResponseMock);
    });
    it('lista venda a partir do seu id', async function () {
      // arrange
      sinon.stub(salesModel, 'getSaleById').resolves(salesByIdMock);
      // act
      const result = await salesService.getSaleById(1);
      // assert
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(salesByIdMock);
    });
    it('retorna erro de venda não encontrada', async function () {
      // act
      const result = await salesService.getSaleById(999);
      // assert
      expect(result.type).to.equal('SALE_NOT_FOUND');
      expect(result.message).to.equal('Sale not found');
    });
  });
  describe('deletando vendas', function () {
    it('deleta uma venda com sucesso', async function () {
      // arrange
      sinon.stub(salesModel, 'deleteSale')
        .resolves
        ({
          fieldCount: 0,
          affectedRows: 1,
          insertId: 0,
          info: '',
          serverStatus: 2,
          warningStatus: 0
        });
      sinon.stub(salesModel, 'deleteSaleProduct')
        .resolves
        ({
          fieldCount: 0,
          affectedRows: 0,
          insertId: 0,
          info: '',
          serverStatus: 2,
          warningStatus: 0
        });
      
      // act
      const result = await salesService.deleteSale(1)

      // assert
      expect(result.type).to.equal(null)
      expect(result.message).to.equal('')
    });
    it('retorna erro - venda não encontrada', async function () {
      // act
      const result = await salesService.deleteSale(999)
      
      // assert
      expect(result.type).to.equal('SALE_NOT_FOUND')
      expect(result.message).to.equal('Sale not found')
    });
  });
  describe('atualizando vendas', function () {
    it('atualiza venda com sucesso', async function () {
      // arrange
      sinon.stub(salesModel, 'getById').resolves({ id: 1, date: '2023-02-16T18:50:28.000Z ' })
      sinon.stub(salesModel, 'update').resolves
        (
          {
            fieldCount: 0,
            affectedRows: 0,
            insertId: 0,
            info: '',
            serverStatus: 2,
            warningStatus: 0
          }
        );

      // act
      const result = await salesService.update(successfullRequisitionMock, 1)

      // assert

      expect(result.type).to.equal(null);
    });
    it('retorna erro - venda não encontrada', async function () {
      // act
      const result = await salesService.update(successfullRequisitionMock, 999);

      // assert
      expect(result.type).to.equal('SALE_NOT_FOUND');
    });
    it('retorna erro - productId não encontrado', async function () {
      // arrange
      sinon.stub(salesModel, 'getById').resolves({ id: 1, date: '2023-02-16T18:50:28.000Z ' })
      // act
      const result = await salesService.update(requisitionWithoutIdMock, 1);

      // assert
      expect(result.type).to.equal('NOT_FOUND');
    });
    it('retorna erro - produto não encontrado', async function () {
      // arrange
      sinon.stub(salesModel, 'getById').resolves({ id: 1, date: '2023-02-16T18:50:28.000Z ' })
      // act
      const result = await salesService.update(productNotFoundMock, 1);

      // assert
      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
    });
    it('retorna erro - quantidade inválida', async function () {
      // arrange
      sinon.stub(salesModel, 'getById').resolves({ id: 1, date: '2023-02-16T18:50:28.000Z ' })
      // act
      const result = await salesService.update(invalidQuantityMock, 1);

      // assert
      expect(result.type).to.equal('INVALID_QUANTITY');
    });
  });
    afterEach(function () {
    sinon.restore();
    });
});
