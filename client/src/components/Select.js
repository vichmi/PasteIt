import React, {useState} from 'react';

export default function Select({name, options, onChange}) {
  return <div>
      <select onChange={val => onChange(val.target.value)}>
          <option value=''>Select {name}</option>
          {options.map((option, index) => {
              return (
                  <option key={index} value={option}>{option}</option>
              )
          })}
      </select>
  </div>;
}
