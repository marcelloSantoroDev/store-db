const successfullResponseMock = {
  "id": 4,
  "itemsSold": [
    {
      "productId": 1,
      "quantity": 1
    },
    {
      "productId": 2,
      "quantity": 3
    }
  ]
};

const successfullRequisitionMock = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 3
  }
];

const requisitionWithoutIdMock = [
  {
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 3
  }
];

const requisitionWithoutQuantityMock = [
  {
    "productId": 1
  },
  {
    "productId": 2,
    "quantity": 3
  }
];

const invalidQuantityMock = [
  {
    "productId": 1,
    "quantity": 0
  },
  {
    "productId": 2,
    "quantity": 3
  }
];

const productNotFoundMock = [
  {
    "productId": 100,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 3
  }
];

const modelInputMock = {
  "saleId": 4,
  "productId": 1,
  "quantity": 1,
};

const modelReturnMock = {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 0,
  info: '',
  serverStatus: 2,
  warningStatus: 0
};



module.exports = {
  successfullRequisitionMock,
  successfullResponseMock,
  requisitionWithoutIdMock,
  requisitionWithoutQuantityMock,
  invalidQuantityMock,
  productNotFoundMock,
  modelInputMock,
  modelReturnMock,
}