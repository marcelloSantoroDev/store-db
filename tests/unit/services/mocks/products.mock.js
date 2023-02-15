const allProductsMock = [
  {
    "id": 1,
    "name": "Martelo de Thor"
  },
  {
    "id": 2,
    "name": "Traje de encolhimento"
  },
  {
    "id": 3,
    "name": "Escudo do Capitão América"
  }
];

const productMock = {
  "id": 1,
  "name": "Martelo de Thor"
};

const idNotFoundMock = {
  "message": "Product not found"
};

const updatedProductMock = {
  "id": 1,
  "name": "abajur"
}

const connectionReturnMock = [{
  fieldCount: 0,
  affectedRows: 1,
  insertId: 0,
  info: 'Rows matched: 1  Changed: 0  Warnings: 0',
  serverStatus: 2,
  warningStatus: 0,
  changedRows: 0
}];


module.exports = {
  allProductsMock,
  productMock,
  idNotFoundMock,
  updatedProductMock,
  connectionReturnMock,
}