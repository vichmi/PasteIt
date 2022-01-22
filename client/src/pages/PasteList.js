import React, {useState, useEffect} from 'react';
import axios from '../utils/axios';
import {Container, Button} from 'react-bootstrap';

export default function PasteList() {

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('/allPastes')
        .then(res => {
            console.log(res.data);
            setData(res.data);
        })
    }, []);

  return <div>
      <h1 className='text-center'>Last 20 Pastes</h1>
      <Container className='bg-light mt-3 h-5'>
        <ul>
            {data.map((paste, index) => {
                if(index > 20) return;

                return (
                    <li key={index} ><a href={`/paste/${paste.id}`}>{paste.name}</a></li>
                )
            })}
        </ul>
      </Container>
  </div>;
}
