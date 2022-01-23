import React, {useEffect, useState} from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import {useLocation} from "react-router-dom";
import axios from '../utils/axios';
import token from '../utils/authenticated';
import profileImage from '../images/profile.jpg';

export default function NavBar() {

    const [isLoged, setIsLoged] = useState(false);
    const [jwtToken, setJwtToken] = useState({});
    
    useEffect(() => {
        if(token == null) {
            return setIsLoged(false);
        }
        if(token) {
            axios.get('/auth/verifyToken?token='+token)
            .then(res => {
                if(res.data == 'Unauthorized') return setIsLoged(false);
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
                            <Navbar.Text>{jwtToken.username}</Navbar.Text>
                            <NavDropdown title={<img src={profileImage} width='30' height='30' />} id="navbarScrollingDropdown">
                                <NavDropdown.Item href="#action3">Stats</NavDropdown.Item>
                                <NavDropdown.Item href="#action4">Profile Settings</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={() => {
                                    localStorage.removeItem('jwt');
                                    setIsLoged(false);
                                    window.location.reload(false);
                                }}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        </>
                    }
                </Nav>
            </Navbar.Collapse>
        </Container>
      </Navbar>
  </div>;
}
