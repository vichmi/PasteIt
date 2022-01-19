import React from 'react';
import {Form, Button, Container} from 'react-bootstrap';

export default function Login() {
  return <div style={{height: '100vh'}}>
      <Container className='d-flex align-items-center justify-content-center h-75'>
        <Form className='bg-light p-5 border'>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            
            <label>Don't have an account? <a href='/register'>Create here</a></label><br />

            <Container className='text-center mt-3'>
                <Button variant="secondary" type="submit">Submit</Button>
            </Container>
        </Form>
    </Container>
  </div>;
}
