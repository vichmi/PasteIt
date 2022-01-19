import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import {useLocation} from "react-router-dom";

export default function NavBar() {
    const location = useLocation();
    console.log(location)
    if(location.pathname.includes('/raw/')) return <> </>
  return <div>
      <Navbar className='py-0' bg="light" expand="lg">
        <Container>
            <Navbar.Brand href="/">PasteIt</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                    <Nav.Link href="/">Home</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                <Nav>
                    <Nav.Link href="/login">Login</Nav.Link>
                    <Nav.Link href="/register">Register</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
      </Navbar>
  </div>;
}
