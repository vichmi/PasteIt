import React, {useState, useEffect} from 'react';
import axios from '../utils/axios';
export default function Raw({match}) {
    const [text, setText] = useState('');

    useEffect(() => {
        axios.get(`/paste/${match.params.id}`)
        .then(res => {
            console.log(res);
            setText(res.data.text);
            // console.log(res.data.text);
        });
    }, []);

  return <pre style={{wordWrap: 'break-word', whiteSpace: 'pre-wrap'}}>
      {text}
  </pre>;
}
