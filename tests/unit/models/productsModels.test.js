const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');

const { allProductsMock, productMock } = require('./mocks/products.mock');

describe('testes unitários para a camada model de products', function () {
  describe('listagem de produtos com sucesso', function () {

    it('retorna todos os produtos', async function () {
      // arrange
      sinon.stub(connection, 'execute').resolves([allProductsMock]);
      // act
      const result = await productsModel.getAll();
      // assert
      expect(result).to.deep.equal(allProductsMock)
    });

    it('retorna um produto a partir do seu id', async function () {
      // arrange
      sinon.stub(connection, 'execute').resolves([[productMock]]);
      // act
      const result = await productsModel.getById(1);
      // assert
      expect(result).to.deep.equal(productMock);
    });
  });
  describe('cadastro de produtos', function () {
    it('cadastra um produto com sucesso', async function () {
      // arrange
      sinon.stub(connection, 'execute').resolves([ { insertId: 1 } ])
      // act
      const result = await productsModel.insert({ name: "abajur" })
      // assert
      expect(result).to.deep.equal(1);
    });
  });
      afterEach(function () {
    sinon.restore();
    });
});
