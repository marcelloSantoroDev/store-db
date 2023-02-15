const { productsService } = require('../services');

const getAll = async (_req, res) => {
  const { message } = await productsService.getAll();
  return res.status(200).json(message);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.getById(id);

  if (type) {
    return res.status(404).json({ message });
  }
  return res.status(200).json(message);
};

const insert = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await productsService.insert({ name });

  if (type === 'VALUE_NOT_FOUND') {
    return res.status(400).json({ message });
  }

  if (type === 'INVALID_VALUE') {
    return res.status(422).json({ message });
  }

  if (type === 'PRODUCT_NOT_FOUND') {
    return res.status(404).json({ message });
  }

  return res.status(201).json(message);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { type, message } = await productsService.update(id, name);

   if (type === 'VALUE_NOT_FOUND') {
    return res.status(400).json({ message });
  }

  if (type === 'INVALID_VALUE') {
    return res.status(422).json({ message });
  }

  if (type === 'PRODUCT_NOT_FOUND') {
    return res.status(404).json({ message });
  }

  return res.status(200).json(message);
};

module.exports = {
  getAll,
  getById,
  insert,
  update,
};