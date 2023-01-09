import React, { Component } from 'react';
import { withNavigate } from '../withNavigate';
import '../styles/Cart.css';
import { Row, Col, Card, Table, Form, Button } from 'react-bootstrap';
import cart from '../images/cart.jpg';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      myProducts: [],
      total: 0
    };
  }

  handleOnChange = (event) => {
    const { myProducts, products } = this.state;
    const productId = event.target.value;

    const product = products.find((p) => p.id === productId);

    if (!product) {
      console.log('Product is not available');
      toast.warn('Product is not available');
      return;
    }

    const myProduct = myProducts.find((mp) => mp.id === product.id);

    if (myProduct) {
      const filteredMyProducts = myProducts.filter((mp) => {
        return mp.id !== product.id;
      });

      if (filteredMyProducts.length === 0) {
        return this.setState(() => ({
          myProducts: [],
          total: 0
        }));
      } else {
        const filteredTotal = filteredMyProducts.reduce((acc, currVal) => {
          return acc + currVal.price;
        }, 0);

        return this.setState(() => ({
          myProducts: filteredMyProducts,
          total: filteredTotal
        }));
      }
    } else {
      const updatedMyProducts = [...myProducts, product];

      const updatedTotal = updatedMyProducts.reduce((acc, currVal) => {
        return acc + currVal.price;
      }, 0);

      this.setState(() => ({
        myProducts: updatedMyProducts,
        total: updatedTotal
      }));
    }
  };

  componentDidMount = async () => {
    const response = await fetch('/api/products', {
      headers: { 'Content-Type': 'application/json' }
    });

    const { products } = await response.json();

    this.setState({
      products
    });
  };

  handleSubmit = async (event) => {
    const { myProducts, total } = this.state;
    event.preventDefault();
    
    if (myProducts.length === 0) {
      console.log('Shopping cart is empty');
      toast.warn('Shopping cart is empty');
      return;
    }

    this.props.navigate('/payment', { state: { myProducts, total } });
  };

  render() {
    const { products, myProducts, total } = this.state;

    return (
      <div id='cart'>
        <Row>
          <Col>
            <h1>Store</h1>
            <hr className='mt-4 mb-3' />
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <img src={cart} alt='' className='cart-img' />
          </Col>
          <Col sm={6} className='cart-container'>
            <Card className='mt-4 cart-card'>
              <Card.Header as='h5'>Shopping Cart</Card.Header>
              <Card.Body className='m-2'>
                <Form onSubmit={this.handleSubmit}>
                  <h6>
                    <b>Products</b>
                  </h6>
                  <hr className='mt-2 mb-4' />
                  {products.map((product) => (
                    <Form.Check
                      key={product.id}
                      inline
                      label={product.id}
                      name={product.id}
                      value={product.id}
                      type='checkbox'
                      onChange={this.handleOnChange}
                    />
                  ))}
                  <h6 className='mt-4'>Summary</h6>
                  <hr className='mt-2 mb-4' />
                  <Table hover className='mb-4'>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                      </tr>
                    </thead>

                    <tbody>
                      {myProducts.map((mp, index) => {
                        return (
                          <tr key={mp.id}>
                            <td>{index + 1}</td>
                            <td>{mp.id}</td>
                            <td>{mp.qty}</td>
                            <td>{mp.price / 100}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td>Total:</td>
                        <td></td>
                        <td></td>
                        <td>${total / 100}</td>
                      </tr>
                    </tfoot>
                  </Table>

                  <div className='d-grid'>
                    <Button id='submit' type='submit' variant='success'>
                      Pay now
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withNavigate(Cart);
