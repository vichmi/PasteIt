import React, {useEffect, useState} from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import {useLocation} from "react-router-dom";
import axios from '../utils/axios';
import token from '../utils/authenticated';

export default function NavBar() {

    const [isLoged, setIsLoged] = useState(false);
    const [jwtToken, setJwtToken] = useState({});
    
    useEffect(() => {
        if(token) {
            axios.get('/auth/verifyToken?token='+token)
            .then(res => {
                if(res.status == 200) {
                    setJwtToken(res.data);
                    setIsLoged(true);
                }
            });
        }
        setIsLoged(false);
    }, []);

    const location = useLocation();
    if(location.pathname.includes('/raw/')) return <> </>

  return <div>
      <Navbar className='py-0 navbar-expand-md' bg="light" expand="lg">
        <Container>
            <Navbar.Brand href="/">PasteIt</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/pastes">Pastes list</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                <Nav>
                    {!isLoged ? 
                        <>
                            <Nav.Link href="/login">Login</Nav.Link>
                            <Nav.Link href="/register">Register</Nav.Link>
                        </> : 
                        <>
                            <Navbar.Text>Signed in as: <a href='/profile'>{jwtToken.username}</a></Navbar.Text>
                        </>
                    }
                </Nav>
            </Navbar.Collapse>
        </Container>
      </Navbar>
  </div>;
}
