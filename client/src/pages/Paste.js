import React, {useState, useEffect} from 'react';
import axios from '../utils/axios';
import {Container, Button, Row, Col} from 'react-bootstrap';
import profileIMage from '../images/profile.jpg';
// import { ArrowRight } from 'react-bootstrap-icons';


export default function Paste({match}) {

    const [text, setText] = useState('');
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`/paste/${match.params.id}`)
        .then(res => {
            // console.log(res);
            setText(res.data.text.replace(/ /g, '\u00a0'));
            setData(res.data);
            // console.log(res.data.text);
            setLoading(false);
        });

    }, []);

  return !loading ? <div>
      <Container className='mt-3 d-flex flex-column'>
        <Container className='d-flex flex-row'>
            <img src={profileIMage} width={50} height={50} />
            <p className='p-2'>{data.name}</p>
        </Container>

        <Container className='d-flex flex-row'>
            <p className='p-2'>Expiring in: {data.expiration}</p>
            <p className='p-2'>Visible for: {data.visability}</p>
        </Container>
      </Container>
      <Container className='mt-1'>
        <Button variant='secondary' className='btn-sm' onClick={() => {
            window.location.href = '/paste/raw/'+match.params.id
        }}>Raw</Button>

        <Button variant='secondary' className='btn-sm ml-1' onClick={() => {
            navigator.clipboard.writeText(text);
        }}>Copy</Button>
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
  </div> : null;
}
