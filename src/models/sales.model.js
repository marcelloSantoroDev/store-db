const connection = require('./connection');

const insert = async () => {
  const query = 'INSERT INTO sales (date) VALUES (NOW())';
  const [{ insertId }] = await connection.execute(query);
  return insertId;
};

const getById = async (id) => {
  const query = 'SELECT * FROM sales WHERE ID = ?';
  const [[result]] = await connection.execute(query, [id]);
  return result;
};

const salesProductsInsert = async ({ saleId, productId, quantity }) => {
  const query = 'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)';
  await connection.execute(query, [saleId, productId, quantity]);
};

module.exports = {
  insert,
  getById,
  salesProductsInsert,
};