const { expect } = require('chai');
const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const { salesController } = require('../../../src/controllers');
const { salesService } = require('../../../src/services');

const {
  successfullResponseMock,
  successfullRequisitionMock,
  requisitionWithoutIdMock,
  requisitionWithoutQuantityMock,
  invalidQuantityMock,
  productNotFoundMock,
} = require('./mocks/sales.mock');

chai.use(sinonChai);

describe('testes unitário para a camada controller de sales', function () {
  describe('cadastro de vendas', function () {
    it('cadastra uma venda com sucesso', async function () {
      // arrange
      const res = {};
      const req = {
        body: successfullRequisitionMock,
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'salesProductsInsert')
        .resolves({ type: null, message: successfullResponseMock })
      
      // act
      await salesController.insert(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(successfullResponseMock);
    });
    it('retorna erro por falta do campo "productID"', async function () {
      // arrange
      const res = {};
      const req = {
        body: requisitionWithoutIdMock,
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'salesProductsInsert')
        .resolves({ type: 'NOT_FOUND', message: '"productId" is required' })
      
      // act
      await salesController.insert(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"productId" is required' });
    });
    it('retorna erro por falta do campo "quantity"', async function () {
      // arrange
      const res = {};
      const req = {
        body: requisitionWithoutQuantityMock,
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'salesProductsInsert')
        .resolves({ type: 'NOT_FOUND', message: '"quantity" is required' })
      
      // act
      await salesController.insert(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"quantity" is required' });
    });
    it('retorna erro por quantity inválida', async function () {
      // arrange
      const res = {};
      const req = {
        body: invalidQuantityMock,
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'salesProductsInsert')
        .resolves({ type: 'INVALID_QUANTITY', message: '"quantity" must be greater than or equal to 1' })
      
      // act
      await salesController.insert(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"quantity" must be greater than or equal to 1' });
    });
    it('retorna erro por produto não encontrado', async function () {
      // arrange
      const res = {};
      const req = {
        body: productNotFoundMock,
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'salesProductsInsert')
        .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });
      
      // act
      await salesController.insert(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    })
  });
      afterEach(function () {
    sinon.restore();
  });
});