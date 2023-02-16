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

const allSalesResponseMock = [
  {
    "saleId": 1,
    "date": "2023-02-15T16:19:33.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "saleId": 1,
    "date": "2023-02-15T16:19:33.000Z",
    "productId": 2,
    "quantity": 10
  },
  {
    "saleId": 2,
    "date": "2023-02-15T16:19:33.000Z",
    "productId": 3,
    "quantity": 15
  }
];

const salesByIdMock = [
  {
    "date": "2023-02-15T16:19:33.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "date": "2023-02-15T16:19:33.000Z",
    "productId": 2,
    "quantity": 10
  }
];

const updateSaleConnectionResponseMock = [
  {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 0,
    info: 'Rows matched: 1  Changed: 1  Warnings: 0',
    serverStatus: 2,
    warningStatus: 0,
    changedRows: 1
  },
  undefined
]
[
  {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 0,
    info: 'Rows matched: 1  Changed: 1  Warnings: 0',
    serverStatus: 2,
    warningStatus: 0,
    changedRows: 1
  },
  undefined
];

module.exports = {
  successfullRequisitionMock,
  successfullResponseMock,
  requisitionWithoutIdMock,
  requisitionWithoutQuantityMock,
  invalidQuantityMock,
  productNotFoundMock,
  modelInputMock,
  allSalesResponseMock,
  salesByIdMock,
  updateSaleConnectionResponseMock,
}