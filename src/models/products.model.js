const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM products';
  const [result] = connection.execute(query);
  return result;
};

module.exports = {
  getAll,
};