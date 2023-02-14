const { productsModel } = require('../../models');
const { productNameSchema } = require('./schemas');

const validateProductName = (name) => {
  const { error } = productNameSchema.validate(name);

  if (error) {
    return { type: 'INVALID_VALUE', message: '"name" length must be at least 5 characters long' };
  }

  return { type: null, message: '' };
};

const productInDbValidation = async (sales) => {
  const findProduct = await Promise
    .all(sales.map(({ productId }) => productsModel.getById(productId)));
  return findProduct.includes(undefined);
};

const validadeProductId = async (sales) => {
  for (let index = 0; index < sales.length; index += 1) {
    if (!sales[index].productId) {
      return { type: 'NOT_FOUND', message: '"productId" is required' };
    }
  }
  const test = await productInDbValidation(sales);

  if (test) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }
  
    return { type: null, message: '' };
};

const validateQuantity = (sales) => {
  for (let index = 0; index < sales.length; index += 1) {
      if (sales[index].quantity < 1) {
      return { type: 'INVALID_QUANTITY', message: '"quantity" must be greater than or equal to 1' };
    }
    if (!sales[index].quantity) {
      return { type: 'NOT_FOUND', message: '"quantity" is required' };
    }
  }

  return { type: null, message: '' };
};

module.exports = {
  validateProductName,
  validadeProductId,
  validateQuantity,
};