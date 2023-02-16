const { expect } = require('chai');
const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');

const { productsController } = require('../../../src/controllers');
const { productsService } = require('../../../src/services');

const  { allProductsMock, productMock, idNotFoundMock } = require('./mocks/products.mock');
const { productsModel } = require('../../../src/models');

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
  describe('atualização de produtos', function () {
    it('atualiza um produto com sucesso', async function () {
      // arrange
      const res = {};
      const req = {
        params: { id: 1 },
        body: { name: 'abajur' }
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'update')
        .resolves({ type: null, message: { id: 1, name: 'abajur' } });
      // act
      await productsController.update(req, res);
      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({ id: 1, name: 'abajur' });
    });
     it('retorna erro - campo name inexistente', async function () {
      // arrange
      const res = {};
      const req = {
        params: { id: 1 },
        body: { name: ''}
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'update')
        .resolves({ type: 'VALUE_NOT_FOUND', message: '"name" is required' });
      // act
      await productsController.update(req, res);
      // assert
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
     });
    it('retorna erro - produto não encontrado', async function () {
      // arrange
      const res = {};
      const req = {
        params: { id: 999 },
        body: { name: 'abajur'}
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'update')
        .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });
      // act
      await productsController.update(req, res);
      // assert
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
    it('retorna erro - campo name inválido', async function () {
      // arrange
      const res = {};
      const req = {
        params: { id: 1 },
        body: { name: 'a'}
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'update')
        .resolves({ type: 'INVALID_VALUE', message: '"name" length must be at least 5 characters long' });
      // act
      await productsController.update(req, res);
      // assert
      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
    });
  });
  describe('deletando produtos', function () {
    it('deleta um produto com sucesso', async function () {
      // arrange
      const res = {};
      const req = {
        params: { id: 2 }
      };

      res.status = sinon.stub().returns(res);
      res.end = sinon.stub().returns();
      sinon
        .stub(productsService, 'deleteProduct')
        .resolves({ type: null, message: '' })
      // act
      await productsController.deleteProduct(req, res);
      // assert
      expect(res.status).to.have.been.calledWith(204);
    })
    it('retorna erro - produto não encontrado', async function () {
      // arrange
      const res = {};
      const req = {
        params: { id: 999 }
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'deleteProduct')
        .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' })
      // act
      await productsController.deleteProduct(req, res);
      // assert
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });
  describe('pesquisando um produto', function () {
    it('pesquisa um produto com sucesso', async function () {
      // arrange
      const res = {};
      const req = {
        query: { q: 'Martelo' }
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'search')
        .resolves({ type: null, message: [{ "id": 1, "name": "Martelo de Thor" }] });
      
      // act
      await productsController.search(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith([{ "id": 1, "name": "Martelo de Thor" }]);


    })
  })
    afterEach(function () {
    sinon.restore();
  });
});