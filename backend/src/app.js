const express = require('express');
const productRouter = require('./routes/products.router');
const saleRouter = require('./routes/sales.router');

const app = express();

app.use(express.json());
app.use(productRouter);
app.use(saleRouter);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

app.use('/products', productRouter);
app.use('/sales', saleRouter);

module.exports = app;
