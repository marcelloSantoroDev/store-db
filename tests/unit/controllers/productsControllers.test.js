const { expect } = require('chai');
const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');

const { productsController } = require('../../../src/controllers');
const { productsService } = require('../../../src/services');

const  { allProductsMock, productMock, idNotFoundMock } = require('./mocks/products.mock')

chai.use(sinonChai);

describe('testes unitários da camada controllers de products', function () {
  describe('listagem de produtos com sucesso', function () {
    it('retorna status 200 com lista de todos os produtos', async function () {
      // arrange
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'getAll')
        .resolves({ type: null, message: allProductsMock })
      // act
      await productsController.getAll(req, res);
      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allProductsMock);
    });
    it('retorna status 200 com produto a partir do seu id', async function () {
      // arrange
      const res = {};
      const req = {
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'getById')
        .resolves({ type: null, message: productMock });
      // act
      await productsController.getById(req, res);
      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productMock);
    });
  });
  describe('listagem de produtos com erro', function () {
    it('retorna erro 404 e resposta para id inválido', async function () {
      // arrange
      const res = {};
      const req = {
        params: { id: 100 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'getById')
        .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });
      
      // act
      await productsController.getById(req, res);
      
      // assert
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith(idNotFoundMock);
    });
  });
  describe('cadastro de produtos', function () {
    it('cadastra um produto com sucesso', async function () {
      // arrange
      const res = {};
      const req = {
        body: { name: 'abajur' },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'insert')
        .resolves({ type: null, message: { name: 'abajur' } })
      sinon
        .stub(productsService, 'getById')
        .resolves(4);
      
      // act
      await productsController.insert(req, res);
      // assert
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith({ name: 'abajur' });
    });
    it('recebe erro por falta do campo name', async function () {
      // arrange
      const res = {};
      const req = {
        body: '',
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'insert')
        .resolves({ type: 'VALUE_NOT_FOUND', message: '"name" is required' })
      
      // act
      await productsController.insert(req, res);
      // assert
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ "message": "\"name\" is required" });
    });
    it('recebe erro por nome inválido', async function () {
      // arrange
      const res = {};
      const req = {
        body: { name: 'a' },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'insert')
        .resolves({ type: 'INVALID_VALUE', message: '"name" length must be at least 5 characters long' })
      
      // act
      await productsController.insert(req, res);
      // assert
      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ "message": '"name" length must be at least 5 characters long' });
    });
  });
    afterEach(function () {
    sinon.restore();
  });
});