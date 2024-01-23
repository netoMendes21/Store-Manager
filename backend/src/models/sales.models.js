const connection = require('./connections');

const getAllSalesDb = async () => {
  const [sales] = await connection.execute(
    `SELECT date, product_id AS productId, quantity, sale_id AS saleId
    FROM sales_products 
    INNER JOIN sales 
    ON sales_products.sale_id = sales.id 
    ORDER BY sale_id ASC, product_id ASC`,
  );
  return sales;
};

const getSalesId = async (id) => {
  const [sale] = await connection.execute(
    `SELECT date, product_id AS productId, quantity
    FROM sales_products
    JOIN sales
    ON sales_products.sale_id = sales.id
    WHERE id = ?`,
    [id],
  );
  return sale;
};

const addNewSale = async (date) => {
  const [createdSale] = await connection.execute(
    'INSERT INTO sales (date) VALUES (?)',
    [date],
  );
  return createdSale;
};

const addProductSale = async (idProduct, saleCreated) => {
  if (saleCreated) {
    const reqDB = saleCreated.map((sale) => {
      const { productId, quantity } = sale;
      return connection.execute(
        'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
        [idProduct, productId, quantity],
      );
    });
    const newSale = await Promise.all(reqDB);
    return newSale;
  }
};

module.exports = {
  getAllSalesDb,
  getSalesId,
  addNewSale,
  addProductSale,
};