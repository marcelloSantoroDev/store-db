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

const deleteSale = async (id) => {
  const sale = await salesModel.getById(id);
  if (!sale) {
    return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  }

  salesModel.deleteSale(id);
  salesModel.deleteSaleProduct(id);

  return { type: null, message: '' };
};

const update = async (sales, id) => {
  const sale = await salesModel.getById(id);

  if (!sale) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

  const productIdError = await schema.validadeProductId(sales);

  if (productIdError.type) return productIdError;

  const quantityError = schema.validateQuantity(sales);

  if (quantityError.type) return quantityError;

  await Promise.all(sales
    .map(({ productId, quantity }) => salesModel
      .update({ id, productId, quantity })));
  
  await salesModel.updateSaleDate(id);

    return {
    type: null,
    message: {
      saleId: id,
      itemsUpdated: sales,
  } };
};

module.exports = {
  salesProductsInsert,
  getAll,
  getSaleById,
  deleteSale,
  update,
};