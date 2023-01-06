require('dotenv').config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const paymentsRouter = require('./routes/payments');
const PORT = process.env.PORT || 3001;

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/', indexRouter);
app.use('/api/payments/', paymentsRouter);

// 404 Handling
app.use((_req, res, _next) => {
  res.sendStatus(404);
});

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.message);

  // If no specified error code, set to 'Internal Server Error (500)'
  if (!err.statusCode) {
    err.statusCode = 500;
  }

  // Send error with status code and message
  res.status(err.statusCode).send(err.message);
});

// Start Server
app.listen(PORT, () => {
  console.log('App listening on PORT: ', PORT);
});

module.exports = app;
