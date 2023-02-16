const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM products';
  const [result] = await connection.execute(query);
  return result;
};

const getById = async (id) => {
  const query = 'SELECT * FROM products WHERE id = ?';
  const [[result]] = await connection.execute(query, [id]);
  return result;
};

const insert = async ({ name }) => {
  const query = 'INSERT INTO products (name) VALUES (?)';

  const [{ insertId }] = await connection.execute(query, [name]);

  return insertId;
};

const update = async (id, name) => {
  const query = 'UPDATE products SET name = ? WHERE id = ?';
  await connection.execute(query, [name, id]);
};

const deleteProduct = async (id) => {
  const query = 'DELETE FROM products WHERE id = ?';
  await connection.execute(query, [id]);
};

const search = async (q) => {
  const query = 'SELECT * FROM products WHERE name LIKE ?';
  const [result] = await connection.execute(query, [`%${q}%`]);
  return result;
};

module.exports = {
  getAll,
  getById,
  insert,
  update,
  deleteProduct,
  search,
};