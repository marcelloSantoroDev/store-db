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

const getAll = async () => {
  const query = `SELECT sale_id AS saleId,
  date AS date,
  product_id AS productId,
  quantity AS quantity
  FROM sales_products AS sp
  INNER JOIN sales AS s
  WHERE sp.sale_id = s.id`;
  const [result] = await connection.execute(query);
  return result;
};

const getSaleById = async (id) => {
  const query = `SELECT date as date,
  product_id as productId,
  quantity as quantity
  FROM sales_products as sp
  INNER JOIN sales as s
  WHERE sp.sale_id = s.id
  AND sp.sale_id = ?`;
  const [result] = await connection.execute(query, [id]);
  return result;
};

const deleteSale = async (id) => {
  const query = 'DELETE FROM sales WHERE id = ?';
  await connection.execute(query, [id]);
};

const deleteSaleProduct = async (id) => {
  const query = 'DELETE FROM sales_products WHERE sale_id = ?';
  await connection.execute(query, [id]);
};

const update = async ({ id, productId, quantity }) => {
  const query = `UPDATE sales_products
  SET product_id = ?, quantity = ? WHERE sale_id = ? AND product_id = ?`;
  const a = await connection.execute(query, [productId, quantity, id, productId]);
  console.log(a);
};

const updateSaleDate = async (id) => {
  const query = 'UPDATE sales SET date = NOW() WHERE id = ?';
  await connection.execute(query, [id]);
};

module.exports = {
  insert,
  getById,
  salesProductsInsert,
  getAll,
  getSaleById,
  deleteSale,
  deleteSaleProduct,
  update,
  updateSaleDate,
};