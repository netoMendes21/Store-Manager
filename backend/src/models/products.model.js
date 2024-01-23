const connection = require('./connections');

const getAllProductsDataBase = async () => {
  const [products] = await connection.execute('SELECT * FROM products ORDER BY id ASC');
  return products;
};

const getProductsById = async (id) => {
  const [[product]] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
  return product;
};

const productAddDB = async (name) => {
  const [product] = await connection.execute('INSERT INTO products (name) VALUES (?)', [name]);

  const productAdd = {
    id: product.insertId,
    name,
  };
  return productAdd;
};

const productNameUpdate = async (id, name) => {
  const [product] = await connection
    .execute('UPDATE products SET name = ? WHERE id = ?', [name, id]);
  return product;
};

module.exports = { getAllProductsDataBase, getProductsById, productAddDB, productNameUpdate }; 