import React, { Component } from 'react';
import '../styles/Success.css';
import { Row, Col } from 'react-bootstrap';
import receipt from '../images/receipt.jpg';

export default class Success extends Component {
  render() {
    return (
      <div id='success'>
        <Row>
          <Col className='text-center'>
            <h1>Successful payment!</h1>
            <p className='mb-4'>An email receipt is on the way.</p>
            <img src={receipt} alt='' className='receipt-img' />
          </Col>
        </Row>
      </div>
    )
  }
}
