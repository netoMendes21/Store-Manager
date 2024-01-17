const express = require('express');
const { getAllProductsDataBase, getProductsById } = require('./controllers/products.controller');

const app = express();

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

app.get('/products', async (request, response) => {
  const res = await getAllProductsDataBase(request, response);
  response.status(200).send(res);
});

app.get('/products/:id', async (request, response) => {
  const res = await getProductsById(request, response);
  response.status(200).send(res);
});

app.get('/sales', async (request, response) => {
  const res = await 
})

module.exports = app;
