const express = require('express');
const router = express.Router();

// Example GET route
router.get('/api/welcome', (req, res, next) => {
  res.status(200).send({ message: 'Welcome to Express!' });
});

module.exports = router;
