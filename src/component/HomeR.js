import React from 'react';
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom';
import { Header } from './Header';
import { Register } from "./Register";


export const HomeR = () => {
  return (
    <><Header /><Card>
      {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
      <Card.Body style={{ textAlign: 'center' }}>
        <Card.Text>
          To start test, Please click <Link to="/register"> Here </Link> to register
        </Card.Text>
      </Card.Body>
    </Card></>
  )
};
