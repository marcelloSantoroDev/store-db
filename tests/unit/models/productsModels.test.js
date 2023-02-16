const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');

const { allProductsMock, productMock, connectionReturnMock } = require('./mocks/products.mock');

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
  describe('atualização de produtos', function () {
    it('atualiza um produto com sucesso', async function () {
      // arrange 
      sinon.stub(connection, 'execute').resolves(connectionReturnMock)
      // act
      const result = await productsModel.update({ name: "abajur" })
      // assert
      expect(result).to.deep.equal(undefined);
    });
  });
  describe('deletando produtos', function () {
    it('deleta um produto com sucesso', async function () {
      // arrange
      sinon.stub(connection, 'execute').resolves([{
        fieldCount: 0,
        affectedRows: 1,
        insertId: 0,
        info: '',
        serverStatus: 2,
        warningStatus: 0
      }]);
      // act
      const result = await productsModel.deleteProduct(2);
      // assert
      expect(result).to.equal(undefined);
    });
  });
  describe('pesquisando produtos', function () {
    it('pesquisa um produto com sucesso', async function () {
      // arrange
      sinon.stub(connection, 'execute').resolves([[{ "id": 1, "name": "Martelo de Thor" }]]);

      // act
      const result = await productsModel.search('Martelo');

      // assert
      expect(result).to.deep.equal([{ "id": 1, "name": "Martelo de Thor" }]);
    })
  })
      afterEach(function () {
    sinon.restore();
    });
});
