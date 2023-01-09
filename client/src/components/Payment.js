import React from 'react';
import { withNavigate } from '../withNavigate';
import '../styles/Payment.css';
import wallet from '../images/wallet.jpg';
import { Row, Col } from 'react-bootstrap';
import CheckoutForm from './CheckoutForm';
import { Elements, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// UPDATE STRIPE PUBLIC KEY IF REQUIRED.
const STRIPE_PUBLIC_KEY = 'pk_test_TwpxwIMEGHIr1gCLTNRuw8Wy'; // Not a secret!

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

class Payment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      clientSecret: '',
      total: 0
    };
  }

  componentDidMount = async () => {
    const { myProducts } = this.props.location.state;

    const response = await fetch('/api/payments/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: myProducts
      })
    });
    const result = await response.json();

    this.setState({
      clientSecret: result.clientSecret,
      total: result.total
    });
  };

  render() {
    const { clientSecret, total } = this.state;
    const appearance = {
      theme: 'stripe'
    };
    const options = {
      clientSecret,
      appearance
    };

    return (
      <div id='payment'>
        <Row>
          <Col>
            <div>
              <h1>Payment</h1>
            </div>
            <hr className='mt-4 mb-4' />
          </Col>
        </Row>

        <Row>
          <Col sm={6} className='element-container'>
            {clientSecret && stripePromise && (
              <Elements stripe={stripePromise} options={options}>
                <ElementsConsumer>
                  {({ stripe, elements }) => (
                    <CheckoutForm
                      stripe={stripe}
                      elements={elements}
                      clientSecret={clientSecret}
                      total={total}
                    />
                  )}
                </ElementsConsumer>
              </Elements>
            )}
          </Col>
          <Col sm={6} className='wallet-container'>
            <img src={wallet} alt='' className='wallet-img' />
          </Col>
        </Row>
      </div>
    );
  }
}

export default withNavigate(Payment);
