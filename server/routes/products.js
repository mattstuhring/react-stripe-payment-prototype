const express = require('express');
const router = express.Router();
const products = require('../data/products.json');

/* GET */
router.get('/api/products', (req, res, next) => {
  console.log('GET products route');
  res.status(200).send({ products });
});

module.exports = router;
