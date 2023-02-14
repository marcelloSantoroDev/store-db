const Joi = require('joi');

const productNameSchema = Joi.string().min(5);

const quantitySchema = Joi.number().min(1);

module.exports = {
  productNameSchema,
  quantitySchema,
};