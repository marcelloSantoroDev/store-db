const { salesService } = require('../services');

const insert = async (req, res) => {
  const { type, message } = await salesService.salesProductsInsert(req.body);

  if (type === 'NOT_FOUND') return res.status(400).json({ message });
  if (type === 'INVALID_QUANTITY') return res.status(422).json({ message });
  if (type === 'PRODUCT_NOT_FOUND') return res.status(404).json({ message });
  return res.status(201).json(message);
};

const getAll = async (_req, res) => {
  const { message } = await salesService.getAll();
  return res.status(200).json(message);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.getSaleById(id);

  if (type) {
    return res.status(404).json({ message });
  }

  return res.status(200).json(message);
};

module.exports = {
  insert,
  getAll,
  getSaleById,
};