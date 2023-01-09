const express = require('express');
const router = express.Router();

// Mock products database for testing
const products = require('../data/products.json');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Calculate the order total on the server to prevent
// people from directly manipulating the amount on the client
const calculateOrderAmount = (items) => {
  if (!items || items.length === 0) {
    throw new Error('Items do not exist');
  }

  const result = products.filter((product) => {
    return items.find((mp) => mp.id === product.id);
  });

  if (!result || result.length === 0) {
    throw new Error('Items are unavailable');
  }

  const amount = result.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.price;
  }, 0);

  return amount;
};

/* POST */
router.post('/api/payments/create-payment-intent', async (req, res, next) => {
  const { items } = req.body;

  console.log(items);

  try {
    // Stripe uses a PaymentIntent object to represent your intent to collect payment from a customer,
    // tracking charge attempts and payment state changes throughout the process.
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: 'usd'
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
      total: paymentIntent.amount
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
