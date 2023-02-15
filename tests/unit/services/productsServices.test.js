const { expect } = require('chai');
const sinon = require('sinon');

const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');
const { allProductsMock, productMock, updatedProductMock, connectionReturnMock } = require('./mocks/products.mock');

describe('testes unitários para camada service de products', function () {
  describe('listagem de produtos com sucesso', function () {
    it('lista todos os produtos', async function () {
      // arrange
      sinon.stub(productsModel, 'getAll').resolves(allProductsMock);
      // act
      const result = await productsService.getAll();
      // assert
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(allProductsMock);
    });
    it('lista produto a partir do seu id', async function () {
      // act
      const result = await productsService.getById(1);
      // assert
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(productMock);
    });
  });
  describe('listagem de produtos com erro', function () {
    it('retorna erro caso id inválido', async function () {
      // act
      const result = await productsService.getById(100);
      // assert
      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.deep.equal('Product not found');
    });
  });
  describe('cadastro de produtos', function () {
    it('cadastra um produto com sucesso', async function () {
      // arrange
      sinon.stub(productsModel, 'insert').resolves(4);
      sinon.stub(productsModel, 'getById').resolves({ id: 4, name: 'abajur' });
      // act
      const result = await productsService.insert({ name: 'abajur' });
      // assert
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal({ id: 4, name: 'abajur' });
    });
    it('retorna erro caso campo name não exista', async function () {
      // act
      const result = await productsService.insert({});
      // assert
      expect(result.type).to.equal('VALUE_NOT_FOUND');
      expect(result.message).to.deep.equal('"name" is required');
    });
    it('retorna erro caso name não seja válido', async function () {
      // act
      const result = await productsService.insert({ name: 'a' });
      // assert
      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.deep.equal('"name" length must be at least 5 characters long');
    });
  });
  describe('atualização de produtos', function () {
    it('atualiza um produto com sucesso', async function () {
      // arrange
      // sinon.stub(productsModel, 'getById').resolves(productMock);
      // sinon.stub(productsModel, 'update').resolves(connectionReturnMock)
      // act
      const result = await productsService.update(1, 'abajur');
      // assert
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(updatedProductMock);
    })
  })
        afterEach(function () {
    sinon.restore();
    });
});