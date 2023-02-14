const { salesModel } = require('../models');
const schema = require('./validations/validationInputValues');

const salesProductsInsert = async (sales) => {
  const productIdError = await schema.validadeProductId(sales);

  if (productIdError.type) {
    return productIdError;
  }

  const quantityError = schema.validateQuantity(sales);

  if (quantityError.type) {
    return quantityError;
  }

  const saleId = await salesModel.insert();

 await Promise.all(sales
    .map(({ productId, quantity }) => salesModel
      .salesProductsInsert({ saleId, productId, quantity })));

  return {
    type: null,
    message: {
      id: saleId,
      itemsSold: sales,
  } };
};

module.exports = {
  // insert,
  salesProductsInsert,
};