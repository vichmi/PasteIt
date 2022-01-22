import React, {useState, useEffect} from 'react';
import axios from '../utils/axios';
import {Container, Button} from 'react-bootstrap';


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
      <Container className='text-center mt-3'>
        <h2>Paste: {data.name}</h2>
        <p>Expiring in: {data.expiration}</p>
        <p>Visible for: {data.visability}</p>
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
