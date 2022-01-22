import React, {useState, useEffect, useRef} from 'react';
import { FloatingLabel, Form, Container, Button, Row, Col, InputGroup, Dropdown, FormControl, DropdownButton, Label } from 'react-bootstrap';
import Select from '../components/Select';

import CustomDropDownButton from '../components/CustomDropDownButton';

import axios from '../utils/axios';

import token from '../utils/authenticated';

const languages = ['Bash', 'C', 'C#', 'C++', 'CSS', 'HTML', 'JavaScript', 'Json', 'Java', 'Lua', 'Objective C', 'PHP', 'Perl', 'Python', 'Ruby', 'Swift'];

export default function Home() {

  const [name, setName] = useState(null);
  const [language, setLanguage] = useState(null);
  const [expiration, setExpiration] = useState(null);
  const [visability, setVisability] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    
}, []);

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
            <Col><input type='text' placeholder='Enter Name' onChange={e => setName(e.target.value)}/></Col>
          </Row>     
        </Container>

        <Container className='mb-3'>
          <Row>
            <Col sm={2}><label>Programming Language: </label></Col>
            <Col><Select onChange={e => setLanguage(e)} name='Language' options={languages} /></Col>
          </Row>
        </Container>

        <Container className='mb-3'>
          <Row>
            <Col sm={2}><label>Expired in: </label></Col>
            <Col><Select onChange={e => setExpiration(e)} name='Expiration' options={['Never', '1 Minute', '5 Minutes', '10 Minutes', '30 Minutes', '1 Hour', '12 Hours', '1 Day', '1 Week', '1 Month', '6 Months', '1 Year']} /></Col>
          </Row>
        </Container>

        <Container className='mb-3'>
          <Row>
            <Col sm={2}><label>Visability: </label></Col>
            <Col><Select onChange={e => setVisability(e)} name='Visability' options={['Public', 'Unlisted']} /></Col>
          </Row>
        </Container>

        <Button variant='secondary' onClick={() => {
          const text = document.getElementById('textarea').value;

          console.log(text);
          
          axios.post('/paste', {
            headers: {'Content-Type': 'application/json'},
            text: text,
            name,
            visability,
            expiration,
            language,
            token
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
