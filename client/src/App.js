import logo from './images/stripe.png';
import './styles/App.css';
import Home from './components/Home';
import { Navbar, Container } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import Payment from './components/Payment';
import Success from './components/Success';
import Cart from './components/Cart';
import poweredByStripe from './images/powered-by-stripe.png';

function App() {
  return (
    <div id='app'>
      <Navbar sticky='top' bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand href='/'>
            <img
              alt=''
              src={logo}
              width='8%'
              className='d-inline-block align-top me-2'
            />{' '}
            PayFac
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className='justify-content-end'>
            <Navbar.Text className='powered-by-stripe-img-container'>
              <img
                src={poweredByStripe}
                alt=''
                className='powered-by-stripe-img'
              />
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/payment' element={<Payment />} />
          <Route path='/payment/success' element={<Success />} />
        </Routes>
      </Container>

      <Navbar fixed='bottom' bg='dark' variant='dark' className='footer-nav' >
        <Container className='footer-container'>
          <Navbar.Text>
            Developed by: <a href='/'>Matt Stuhring</a>
          </Navbar.Text>
        </Container>
      </Navbar>
    </div>
  );
}

export default App;
