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




module.exports = {
  successfullRequisitionMock,
  successfullResponseMock,
  requisitionWithoutIdMock,
  requisitionWithoutQuantityMock,
  invalidQuantityMock,
  productNotFoundMock,
  allSalesResponseMock,
  salesByIdMock,
}