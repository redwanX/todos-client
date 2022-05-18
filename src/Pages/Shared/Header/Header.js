import { signOut } from 'firebase/auth';
import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../../firebase.init';
const Header = () => {
  const [user] = useAuthState(auth);
  const logOut=()=>{
    signOut(auth);
  }

  return (
   <Navbar className='py-3 fw-bold secondery-bg' sticky='top'  collapseOnSelect expand="lg">
  <Container>
  <Navbar.Brand as = {Link} to='/' className="primary-text">TODOS</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className='ms-auto'>
      {
        user?
        <>
        <Nav.Link as={Link} to='/todos' >Todos</Nav.Link>
        <Nav.Link onClick={logOut} >Logout</Nav.Link>
        </>
        :
        <Nav.Link  as={Link} to='/login'>Login</Nav.Link>
        
      }
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>
  )
}

export default Header