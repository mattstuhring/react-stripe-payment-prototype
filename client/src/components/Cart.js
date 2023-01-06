import React, { Component } from 'react';
import '../styles/Cart.css';
import { Row, Col, Card, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import cart from '../images/cart.jpg';

export default class Cart extends Component {
  render() {
    return (
      <div id='cart'>
        <Row>
          <Col>
            <h1>Shopping Cart</h1>
            <hr className='mt-4 mb-5' />
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <img src={cart} alt='' className='cart-img' />
          </Col>
          <Col sm={6} className='cart-container'>
            <Card className='mt-4 cart-card'>
              <Card.Header as='h5'>Summary</Card.Header>
              <Card.Body className='m-2'>
                <Table hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Product</th>
                      <th>Description</th>
                      <th>Quantity</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Product 1</td>
                      <td>test</td>
                      <td>1</td>
                      <td>$1.00</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Product 2</td>
                      <td>test</td>
                      <td>1</td>
                      <td>$2.00</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Product 3</td>
                      <td>test</td>
                      <td>1</td>
                      <td>$3.00</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td>Total:</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>$6.00</td>
                    </tr>
                  </tfoot>
                </Table>

                <Link className='btn btn-success mt-3' to='/payment'>
                  Go to checkout
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
