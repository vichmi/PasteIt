import React from 'react';
import { FloatingLabel, Form, Container, Button, Row, Col, InputGroup, Dropdown, FormControl, DropdownButton, Label } from 'react-bootstrap';

import CustomDropDownButton from '../components/CustomDropDownButton';

import axios from '../utils/axios'

export default function Home() {
  return <div>
    <Container className='mt-5 bg-light p-5 border'>
      <FloatingLabel label="New Paste">
        <Form.Control
          as="textarea"
          placeholder="Leave a comment here"
          style={{ height: '400px' }}
          id='textarea'
        />
      </FloatingLabel>

      <Container className='mt-2'>
        
        <Container className='mb-3'>
          <Row>
            <Col sm={2}><label>Paste Name: </label></Col>
            <Col><input type='text' placeholder='Enter Name' /></Col>
          </Row>     
        </Container>

        <CustomDropDownButton name='Programming Languages' options={['C', 'C#']} />
        <CustomDropDownButton name='Expiration' options={['Never', '1 minute']} />
        <CustomDropDownButton name='Visability' options={['Public', 'Unlisted']} />

        <Button variant='secondary' onClick={() => {
          const text = document.getElementById('textarea').value;

          console.log(text);
          
          axios.post('/paste', {
            headers: {'Content-Type': 'application/json'},
            text: text
          })
          .then(res => {
            console.log(res);
            if(res.status == 200) {
              window.location.href = '/paste/'+res.data.id;
            }
          })
        }}>Create New Paste</Button>
      </Container>      

    </Container>
  </div>;
}
