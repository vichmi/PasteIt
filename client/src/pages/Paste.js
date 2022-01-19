import React, {useState, useEffect} from 'react';
import axios from '../utils/axios';
import {Container, Button} from 'react-bootstrap';

export default function Paste({match}) {

    const [text, setText] = useState('');

    useEffect(() => {
        axios.get(`/paste/${match.params.id}`)
        .then(res => {
            // console.log(res);
            setText(res.data.text.replace(/ /g, '\u00a0'));
            // console.log(res.data.text);
        });
    }, []);

  return <div>
      <Container className='mt-5'>
        <Button variant='secondary' className='btn-sm' onClick={() => {
            window.location.href = '/paste/raw/'+match.params.id
        }}>Raw</Button>

        <Button variant='secondary' className='btn-sm ml-1' onClick={() => {
            navigator.clipboard.writeText(text);
        }}>Copy</Button>
        
        <Button variant='secondary' className='btn-sm ml-1' onClick={() => {
            axios.post('/paste/'+match.params.id+'/download')
            .then(res => {
                console.log(res);
            }); 
        }}>Download</Button>
        </Container>
      <Container className='bg-light border p-3'>
        <ol>
            {text.split('\n').map((value, index) => {
                return (
                    <li className='text-black' key={index}>{value}</li>
                )
            })}
        </ol>
      </Container>
  </div>;
}
