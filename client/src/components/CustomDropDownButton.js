import React from 'react';
import {Row, Col, Dropdown, DropdownButton, Container} from 'react-bootstrap';

export default function CustomDropDownButton({name, options}) {
    return <Container className='mb-3'><Row>
    <Col sm={2}><label>{name}: </label></Col>
    <Col><DropdownButton variant="outline-secondary" title={'Select '+name} id="input-group-dropdown-1">
        {options.map((option, index) => {
            return <Dropdown.Item key={index} href='#'>{option}</Dropdown.Item>
        })}
      </DropdownButton></Col>
      </Row></Container>;
}
