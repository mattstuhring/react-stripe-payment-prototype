import React, { useState, useEffect } from 'react';
import { useStripe, Elements } from '@stripe/react-stripe-js';
import { withNavigate } from '../withNavigate';
import { loadStripe } from '@stripe/stripe-js';
import '../styles/PaymentStatus.css';
import { Row, Col, Card } from 'react-bootstrap';
import receipt from '../images/receipt.jpg';
import barcode from '../images/barcode.png';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// UPDATE STRIPE PUBLIC KEY IF REQUIRED.
const STRIPE_PUBLIC_KEY = 'pk_test_TwpxwIMEGHIr1gCLTNRuw8Wy'; // Not a secret!
const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

const PaymentStatus = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentStatusResult />
    </Elements>
  );
};

const PaymentStatusResult = () => {
  const stripe = useStripe();
  const [id, setId] = useState(null);
  const [amount, setAmount] = useState(null);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    // Retrieve the "payment_intent_client_secret" query parameter appended to
    // your return_url by Stripe.js
    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    // Retrieve the PaymentIntent
    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      console.log(paymentIntent);
      switch (paymentIntent.status) {
        case 'succeeded':
          toast.success('Success! Payment received.');
          break;

        case 'processing':
          toast.warn(
            "Payment processing. We'll update you when payment is received."
          );
          break;

        case 'requires_payment_method':
          toast.error('Payment failed. Please try another payment method.');
          this.props.navigate('/cart');
          break;

        default:
          toast.error('Something went wrong.');
          this.props.navigate('/cart');
          break;
      }

      setId(paymentIntent.id);
      setAmount(paymentIntent.amount);
    });
  }, [stripe]);

  return (
    <div id='payment-status'>
      <Row>
        <Col className='receipt-wrapper'>
          <Card className='receipt'>
            <Card.Body>
              <Card.Title className='text-center'>Thank you!</Card.Title>
              <Card.Subtitle className='mt-2 mb-5 text-muted text-center'>
                Invoice #{id}
              </Card.Subtitle>
              <Card.Text>John Doe</Card.Text>
              <Card.Text>{new Date().toDateString()}</Card.Text>
              <hr className='mt-4' />
              <Card.Text style={{ 'text-align': 'end' }}>
                Total: ${amount / 100}
              </Card.Text>
              <hr />
              <Card.Subtitle className='mt-2 mb-2 text-muted text-center'>
                An email receipt is on the way.
              </Card.Subtitle>
              <Col className='barcode-img-wrapper'>
                <img src={barcode} alt='' className='barcode-img' />
              </Col>
            </Card.Body>
          </Card>
        </Col>
        <Col className='receipt-img-wrapper'>
          <img src={receipt} alt='' className='receipt-img' />
        </Col>
      </Row>
    </div>
  );
};

export default withNavigate(PaymentStatus);
