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

const getAll = async () => {
  const sales = await salesModel.getAll();
  return { type: null, message: sales };
};

const getSaleById = async (id) => {
  const sale = await salesModel.getSaleById(id);
  const [saleCheck] = await salesModel.getSaleById(id);
  if (!saleCheck) {
    return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  }

  return { type: null, message: sale };
};

module.exports = {
  salesProductsInsert,
  getAll,
  getSaleById,
};