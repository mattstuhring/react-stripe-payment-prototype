import React from 'react';
import '../styles/Home.css';
import { Link } from 'react-router-dom';
import { Button, Row, Col } from 'react-bootstrap';
import onlineBanking from '../images/online-banking.jpg';

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div id='home'>
        <Row>
          <Col>
            <h1>Welcome to PayFac</h1>
            <hr className='mt-4 mb-3' />
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <img src={onlineBanking} className='home-img' alt='' />
          </Col>
          <Col sm={6}>
            <div className='px-5 pt-4'>
              <h4>What is PayFac?</h4>
              <p>
                A payment facilitator (PayFac) processes electronic payments for
                business owners, allowing them to accept payments online or
                in-person. In this prototype we are using the Stripe PayFac
                solution.
              </p>
              <h4 className='mt-4'>What is Stripe's PayFac solution?</h4>
              <p>
                The{' '}
                <a
                  href='https://stripe.com/guides/payfacs#stripes-payfac-solution'
                  target='_blank'
                  rel='noreferrer'
                  style={{ textDecoration: 'none', color: '#484d91' }}
                >
                  Stripe PayFac solution
                </a>{' '}
                is designed to help platforms fully embed payments and
                additional financial services into their software. It helps
                platforms quickly enter the market, keep setup costs low, and
                grow their monetization potential.
              </p>
              <h4>What is next?</h4>
              <div className='mt-4'>
                <Button
                  className='btn btn-primary me-2'
                  href='https://stripe.com/docs/stripe-js/react'
                  target='_blank'
                >
                  Learn more
                </Button>{' '}
                <Link className='btn btn-success' to='/cart'>
                  Go shopping
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
