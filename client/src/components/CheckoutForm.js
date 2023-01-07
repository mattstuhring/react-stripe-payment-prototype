import React from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import {
  PaymentElement,
  LinkAuthenticationElement
} from '@stripe/react-stripe-js';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      message: null
    };
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onChangeStripeEmail = (event) => {
    const { email } = event.value;
    this.setState({
      email
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { stripe, elements } = this.props;
    const { email } = this.state;

    if (!stripe || !elements) {
      console.log('Stripe.js has not loaded yet');
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
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
  };

  render() {
    const { stripe, elements } = this.props;
    const { message } = this.state;

    const paymentElementOptions = {
      layout: 'tabs'
    };

    return (
      <Card id='checkout-form'>
        <Card.Header as='h5'>Payment Details</Card.Header>
        <Card.Body>
          <Form onSubmit={this.handleSubmit}>

            <LinkAuthenticationElement
              id='link-authentication-element'
              onChange={(e) => this.onChangeStripeEmail(e)}
            />
            <p>
              <small>
                We'll send an email receipt, and never share email with anyone
                else.
              </small>
            </p>

            <div className='mt-2'>
              <PaymentElement
                id='payment-element'
                options={paymentElementOptions}
              />
            </div>

            <div className='d-grid mt-4'>
              <Button
                disabled={!stripe || !elements}
                id='submit'
                type='submit'
                variant='success'
              >
                Pay now
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}
