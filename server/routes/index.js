var express = require('express');
var router = express.Router();

/* GET */
router.get('/welcome', (req, res, next) => {
  console.log('GET index route');
  res.status(200).send({ message: 'Welcome to Express!' });
});

module.exports = router;
