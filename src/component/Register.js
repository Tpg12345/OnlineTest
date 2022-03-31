import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import { Header } from "./Header";
import "./css/register.css"
import Result from './result/Result';

export const Register = (props) => {

  const [validated, setValidated] = useState(false);
  const handleSubmit = (event) => {
  const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      if (sessionStorage.getItem('email') === event.target[1].value) {
        alert("you are already registered!!");
        event.preventDefault();
      } else {
        sessionStorage.clear();
        sessionStorage.setItem('name', event.target[0].value);
        sessionStorage.setItem('email', event.target[1].value);
        sessionStorage.setItem('level', event.target[2].value);
      }
    }

    setValidated(true);

  };
  if (sessionStorage.getItem('formSubmitted') === "true") {
    return (
      <Result />
    )
  }
  if (sessionStorage.getItem("email") !== null && sessionStorage.getItem("testpage") !== null) {
    return (
      <>
        <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title>User Already Registered!! Please Complete Test</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button href='/main' variant="primary">Complete Test</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </>
    )
  }
  else {
    return (
      <>
        <Header />
        <Container className='border w-50 mt-2 '>
          <Form noValidate className="form" action='/main' validated={validated} onSubmit={handleSubmit}>
            <Row>
              <p className='h5 text-center'>Register Here To Start Test</p>
            </Row>
            <Row className="mb-3 mt-4 justify-content-center">
              <Form.Group as={Col} md="6" controlId="validationCustomUsername">
                {/* <Form.Label>Name</Form.Label> */}
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    aria-describedby="inputGroupPrepend"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please choose a username.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>
            <Row className="mb-3 justify-content-center">
              <Form.Group as={Col} md="6" controlId="validationCustom03">
                {/* <Form.Label>Email</Form.Label> */}
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                  <Form.Control type="Email" placeholder="Email" required />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid Email .
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>
            <Row className="mb-3 justify-content-center">
              <Form.Group as={Col} md="6" controlId="validationCustom03">
                {/* <Form.Label>Level</Form.Label> */}
                <Form.Control type='Select' required as="select">
                  <option value="" >Select Level</option>
                  <option value="One">Level One</option>
                  <option value="Two">Level Two</option>
                  <option value="Three">Level Three</option>
                </Form.Control>
                <Form.Control.Feedback type='invalid'>
                  Please provide a valid Level .
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3 justify-content-center">
              <Form.Group as={Col} md="6" className="mb-3 justify-content-center">
                <Form.Check
                  required
                  label="Agree to terms and conditions"
                  feedback="You must agree before submitting."
                  feedbackType="invalid"
                />
              </Form.Group>
            </Row>
            <Row>
              <Col className="col col-sm-12 col-md-12">
                <Button className="btn btn-primary button" type="submit">Start Test</Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </>
    )
  }
};
