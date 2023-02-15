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

module.exports = {
  getAll,
  getById,
  insert,
  update,
};