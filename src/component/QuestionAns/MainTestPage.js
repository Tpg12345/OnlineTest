import React, { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import Beg from "../../constant/QAnsJson/QAnsBeg.json";
import Med from "../../constant/QAnsJson/QAnsIntM.json";
import Hard from "../../constant/QAnsJson/QAnsHard.json";
import { QuestionAnswer } from './QuestionAnswer';
import { CountDownTimer } from './CountDownTimer';
import { Header } from '../Header';
import './QuestionAns.css';
import Result from "../result/Result";
import { QAPagination } from './QAPagination';
import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';

export const MainTestPage = (props) => {
  let Question = [];
  let Time = 0;
  let level = sessionStorage.getItem('level');
  if (level === "One") {
    Question = Beg.Question;
    Time = Beg.Time;
  } else if (level === "Two") {
    Question = Med.Question;
    Time = Med.Time
  } else if (level === "Three") {
    Question = Hard.Question;
    Time = Hard.Time;
  }
  const [currrentPage, setCurrentPage] = useState(1);
  const [QAPerPage, setQAPerPage] = useState(1);
  const indexOfLastQuestion = currrentPage * QAPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - QAPerPage;
  const currentQuestion = Question.slice(indexOfFirstQuestion, indexOfLastQuestion);

  console.log(Question);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  }
  if (sessionStorage.getItem('email') === null) {
    return (
      <>
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Please Register First</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button href='/register' variant="primary">Register</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </>
    )
  }
  if (sessionStorage.getItem('formSubmitted') !== "true" && sessionStorage.getItem('email') !== null) {
    sessionStorage.setItem("testpage", true);
    return (
      <>
      <div className='root'>
        <Header />
        <Container className='border w-50'>
          <div className='mr-3'>
            <Row className='d-flex justify-content-center'>
              <Col className='col-lg-8 col-md-10' >
                <QuestionAnswer QA={currentQuestion} totalQuestion={Question.length} paginate={paginate} time={Time} question={Question} />
              </Col>
              <Col className='col-lg-3 col-md-2'>
                <CountDownTimer time={Time} />
              </Col>
            </Row>
          </div>
        </Container>
        </div>
      </>
    )
  } else if (sessionStorage.getItem('formSubmitted') === "true") {
    return (
      <Result />

    )
  }
}
