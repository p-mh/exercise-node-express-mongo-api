const express = require('express');
const bodyParser = require('body-parser');
const {
  listProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} = require('./services/mongo');

const app = express();

app.use(bodyParser.json());

app.get('/products/', async (req, res) => {
  const { page, orderAttribut, orderWay } = req.query;
  const products = await listProducts(page, orderAttribut, orderWay);
  res.json(products);
});

app.post('/products', async (req, res) => {
  const product = req.body;
  await addProduct(product);
  res.sendStatus(201);
});

app.put('/products/:productId', async (req, res) => {
  const productId = req.params.productId;
  const productFieldToChange = req.body;
  await updateProduct(productId, productFieldToChange);
  res.sendStatus(204);
});

app.delete('/products/:productId', async (req, res) => {
  const productId = req.params.productId;
  await deleteProduct(productId);
  res.sendStatus(204);
});

app.listen(3000, () => console.log('server started'));
