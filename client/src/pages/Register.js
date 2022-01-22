import React, {useRef, useState} from 'react';
import {Form, Button, Container} from 'react-bootstrap';
// import {auth} from '../utils/firebase';
import axios from '../utils/axios'
import {useCookies} from 'react-cookie';
import Cookies from 'js-cookie'

export default function Login() {

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [passworC, setPasswordC] = useState(null);
    const [cookie, setCookie] = useCookies(['']);


  return <div style={{height: '100vh'}}>
      <Container className='d-flex align-items-center justify-content-center h-75'>
        <Form className='bg-light p-5 border'>
            <Form.Group className="mb-3" controlId="formBasicusername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter username" onChange={e => setUsername(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Confirm Password" onChange={e => setPasswordC(e.target.value)} />
            </Form.Group>

            <label>Having account? <a href='/login'>Login here</a></label><br />

            <Container className='text-center mt-3'>
                <Button variant="secondary" type="submit" onClick={(e) => {
                    e.preventDefault();
                    if(password != passworC) return;
                    axios.post('/auth/register', {
                        username, password
                    })
                    .then(res => {
                        if(res.status == 200) {
                            Cookies.set('jwt', res.data);
                            localStorage.setItem('jwt', res.data);
                            window.location.href = '/';
                        }
                    })
                    .catch(err => console.log(err));
                }}>Submit</Button>
            </Container>
        </Form>
    </Container>
  </div>;
}
