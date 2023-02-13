const { expect } = require('chai');
const sinon = require('sinon');

// const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');
const { allProductsMock } = require('./mocks/products.mock');

describe('testes unitários para camada service de products', function () {
  describe('listagem de produtos com sucesso', function () {
    it('lista todos os produtos', async function () {
      // act
      const result = await productsService.getAll();
      // assert
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(allProductsMock);
    })
  })
})