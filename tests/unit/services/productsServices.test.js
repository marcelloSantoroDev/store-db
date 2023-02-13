const { expect } = require('chai');
const sinon = require('sinon');

// const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');
const { allProductsMock, productMock } = require('./mocks/products.mock');

describe('testes unitários para camada service de products', function () {
  describe('listagem de produtos com sucesso', function () {
    it('lista todos os produtos', async function () {
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
    })
  })
})