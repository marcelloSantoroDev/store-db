const { productsModel } = require('../models');

const schema = require('./validations/validationInputValues');

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
    return { type: 'VALUE_NOT_FOUND', message: '"name" is required' };
  }

  const error = schema.validateProductName(name);

  if (error.type) {
    return error;
  }

  const newProductId = await productsModel.insert({ name });
  const newProduct = await productsModel.getById(newProductId);

  return { type: null, message: newProduct };
};

const update = async (id, name) => {
  if (!name) {
    return { type: 'VALUE_NOT_FOUND', message: '"name" is required' };
  }
  const product = await productsModel.getById(id);
  if (!product) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }

   const error = schema.validateProductName(name);

  if (error.type) {
    return error;
  }
  
  await productsModel.update(id, name);

  return { type: null, message: { id, name } };
};

const deleteProduct = async (id) => {
  const product = await productsModel.getById(id);
  if (!product) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }

  await productsModel.deleteProduct(id);

  return { type: null, message: '' };
};

const search = async (q) => {
  if (!q) {
    const allProducts = await productsModel.getAll();
    return { type: null, message: allProducts };
  }

  const product = await productsModel.search(q);

  return { type: null, message: product };
};

module.exports = {
  getAll,
  getById,
  insert,
  update,
  deleteProduct,
  search,
};