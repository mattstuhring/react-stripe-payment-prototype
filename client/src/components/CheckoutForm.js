import React from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { PaymentElement } from '@stripe/react-stripe-js';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      message: null,
      isLoading: false
    };
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  componentDidMount = async () => {
    const { stripe, clientSecret } = this.props;

    if (!stripe || !clientSecret) {
      return;
    }

    let message;
    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case 'succeeded':
          message = 'Payment succeeded!';
          break;
        case 'processing':
          message = 'Your payment is processing.';
          break;
        case 'requires_payment_method':
          message = 'Your payment was not successful, please try again.';
          break;
        default:
          message = 'Something went wrong.';
          break;
      }
    });

    console.log('Did mount message: ' + message);

    this.setState({
      message
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { stripe, elements } = this.props;
    const { email } = this.state;

    if (!stripe || !elements) {
      console.log('Stripe.js has not loaeded yet');
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    this.setState({ isLoading: true });

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: 'http://localhost:3000/payment/success',
        receipt_email: email
      }
    });

    if (error.type === 'card_error' || error.type === 'validation_error') {
      this.setState({
        message: error.message
      });
    } else {
      console.error(error);
      this.setState({
        message: 'An unexpected error occured'
      });
    }

    this.setState({ isLoading: false });
  };

  render() {
    const { stripe, elements } = this.props;
    const { isLoading, message, email } = this.state;

    const paymentElementOptions = {
      layout: 'tabs'
    };

    return (
      <Card id='checkout-form'>
        <Card.Header as='h5'>Payment Details</Card.Header>
        <Card.Body>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                name='email'
                type='email'
                placeholder='Enter email'
                onChange={this.onChange}
                value={email}
              />
              <Form.Text className='text-muted'>
                We'll send you an email receipt, and never share your email with
                anyone else.
              </Form.Text>
            </Form.Group>

            <div className='mt-2'>
              <PaymentElement
                id='payment-element'
                options={paymentElementOptions}
              />
            </div>

            <div className='d-grid mt-4'>
              <Button
                disabled={isLoading || !stripe || !elements}
                id='submit'
                type='submit'
                variant='success'
              >
                <span id='button-text'>
                  {isLoading ? (
                    <div className='spinner' id='spinner'></div>
                  ) : (
                    'Pay now'
                  )}
                </span>
              </Button>
            </div>

            {/* Show any error or success messages */}
            {message && <div id='payment-message'>{message}</div>}
          </Form>
        </Card.Body>
      </Card>
    );
  }
}
