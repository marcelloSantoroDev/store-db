const { productsModel } = require('../models');

const getAll = async () => {
  const products = await productsModel.getAll();
  return { type: null, message: products };
};

const getById = async (id) => {
  const product = await productsModel.getById(id);
  if (!product) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  } 
  return { type: null, message: product };
};

const insert = async ({ name }) => {
  if (!name) {
    return { type: 'INVALID_VALUE', message: 'A name must be provided' };
  }

  const newProductId = await productsModel.insert({ name });
  const newProduct = await productsModel.getById(newProductId);

  return { type: null, message: newProduct };
};

module.exports = {
  getAll,
  getById,
  insert,
};