const { salesService } = require('../services');

const insert = async (req, res) => {
  const { type, message } = await salesService.salesProductsInsert(req.body);

  if (type === 'NOT_FOUND') return res.status(400).json({ message });
  if (type === 'INVALID_QUANTITY') return res.status(422).json({ message });
  if (type === 'PRODUCT_NOT_FOUND') return res.status(404).json({ message });
  return res.status(201).json(message);
};

module.exports = {
  insert,
};