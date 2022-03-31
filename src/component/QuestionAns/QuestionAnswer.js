import React, { useEffect, useState } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Pagination from "react-bootstrap/Pagination";
import Result from "../result/Result";
import "./QuestionAns.css"

export const QuestionAnswer = (props) => {
  // const [activePage, setActivePage] = useState(1);
  const pageNumber = [];
  let counter = 1;
  let attemptQues=0;
  let time = 1000 * 60 * props.time;
  const changeResult = () => {
    let Ques = document.querySelector('input[name="Question"]').value;
    let finalAns = document.querySelector('input[name="FinalAns"]').value;
    let Opt = document.querySelector('input[name="Option"]:checked').value
    sessionStorage.setItem("Question" + Ques, Opt);
    sessionStorage.setItem('correctanswerforquestion' + Ques, finalAns);
  }

  useEffect(() => {
    setTimeout(
      () => handleSubmit(), time);
    if (counter === 1) { //&& activePage === 1
      document.getElementById("previous").disabled = true;
    }
  }
  )

  const handleSubmit = (event) => {
    sessionStorage.setItem('formSubmitted', true);
    document.getElementById('submit').click();
  }

  const goPreviousQuestion = (event) => {
    event.preventDefault();
    if (counter > 1) {
      counter = counter - 1;
      let var1 = props.question[counter - 1];
      let selectedOptionForQ = sessionStorage.getItem('Question' + counter);

      document.getElementById('questionlabel').innerHTML = "Q" + counter + ":" + var1.Ques;
      document.getElementsByClassName('form-check-label')[0].innerHTML = var1.Option1;
      document.getElementsByClassName('form-check-label')[1].innerHTML = var1.Option2;
      document.getElementsByClassName('form-check-label')[2].innerHTML = var1.Option3;
      document.getElementsByClassName('form-check-label')[3].innerHTML = var1.Option4;
      document.querySelector('input[name="Question"]').value = var1.Question;
      document.querySelector('input[name="FinalAns"]').value = var1.FinalAns;
      if (selectedOptionForQ !== null) {
        document.getElementById('Opt' + selectedOptionForQ).checked = true;
      }
    } if (counter < props.totalQuestion) {
      document.getElementById('submit').style.display = 'none';
      document.getElementById('next').style.display = 'inline';
    } if (counter === 1) {
      document.getElementById('previous').disabled = true;
    }
  }
  const goNextQuestion = (event) => {
    event.preventDefault();
    if (counter <= props.totalQuestion) {
      counter = counter + 1;
      let var1 = props.question[counter - 1];
      let prevButton = document.getElementById("previous");
      if (prevButton.disabled === true) {
        prevButton.disabled = false;
      }
      if(document.querySelector('input[name="Option"]:checked')){
        attemptQues= attemptQues+1;
      }
      let selectedOptionForQ = sessionStorage.getItem('Question' + counter);
      document.getElementById('questionlabel').innerHTML = "Q" + counter + ":" + var1.Ques;
      document.getElementsByClassName('form-check-label')[0].innerHTML = var1.Option1;
      document.getElementsByClassName('form-check-label')[1].innerHTML = var1.Option2;
      document.getElementsByClassName('form-check-label')[2].innerHTML = var1.Option3;
      document.getElementsByClassName('form-check-label')[3].innerHTML = var1.Option4;
      document.querySelector('input[name="Question"]').value = var1.Question;
      document.querySelector('input[name="FinalAns"]').value = var1.FinalAns;
      if (selectedOptionForQ != null) {
        document.getElementById('Opt' + selectedOptionForQ).checked = true;
      }
      else {
        let radioCheck = document.querySelector('input[name="Option"]:checked');
        if (radioCheck !== null && radioCheck.checked === true) {
          radioCheck.checked = false;
        }
      }
    } if (counter === props.totalQuestion) {
      document.getElementById('submit').style.display = 'inline';
      document.getElementById('next').style.display = 'none';

    }
  }
  const paginate = (pageNumber) => {
    console.log(pageNumber)
    let var1 = props.question[pageNumber - 1];
    counter = pageNumber;
    document.getElementById('questionlabel').innerHTML = "Q" + pageNumber + ":" + var1.Ques;
    document.getElementsByClassName('form-check-label')[0].innerHTML = var1.Option1;
    document.getElementsByClassName('form-check-label')[1].innerHTML = var1.Option2;
    document.getElementsByClassName('form-check-label')[2].innerHTML = var1.Option3;
    document.getElementsByClassName('form-check-label')[3].innerHTML = var1.Option4;
    document.querySelector('input[name="Question"]').value = var1.Question;
    document.querySelector('input[name="FinalAns"]').value = var1.FinalAns;
    let selectedOptionForQ = sessionStorage.getItem('Question' + pageNumber);
    if (selectedOptionForQ != null) {
      document.getElementById('Opt' + selectedOptionForQ).checked = true;
    } else {
      let checkRadio = document.querySelector('input[name="Option"]:checked');
      if (checkRadio !== null && checkRadio.checked === true) {
        checkRadio.checked = false;
      }
    }
    if (pageNumber === props.totalQuestion) {
      document.getElementById('submit').style.display = 'inline';
      document.getElementById('next').style.display = 'none';
    } else {
      document.getElementById('submit').style.display = 'none';
      document.getElementById('next').style.display = 'inline';
    } if (pageNumber === 1) {
      document.getElementById("previous").disabled = true;
    } else {
      document.getElementById("previous").disabled = false;
    }
  }
  for (let i = 1; i <= props.totalQuestion; i++) {//active={i === counter}
    pageNumber.push(<Pagination.Item key={i} onClick={() => paginate(i)} >
      {i}
    </Pagination.Item>
    )
  }
  return (
    //template string 
    <div key={`Question${1}`} >
      {/* <div>Question Attempted:{attemptQues}</div> */}
      <div className='topMargin'>
        <Pagination size="lg">
          {pageNumber}
        </Pagination>
      </div>
      <Form action='/result' onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Label key={props.QA[0].Ques} id='questionlabel'> {`Q${counter}.${props.QA[0].Ques}`}</Form.Label>
        </Form.Group>
        <Form.Group>
          <Form.Control type='hidden' value={props.QA[0].Question} name="Question" />
          <Form.Control type='hidden' value={props.QA[0].FinalAns} name="FinalAns" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="radio" label={props.QA[0].Option1} name="Option" id='Opt1' value={1} onChange={changeResult} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="radio" label={props.QA[0].Option2} name="Option" id='Opt2' value={2} onChange={changeResult} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="radio" label={props.QA[0].Option3} name="Option" id='Opt3' value={3} onChange={changeResult} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="radio" label={props.QA[0].Option4} name="Option" id='Opt4' value={4} onChange={changeResult} />
        </Form.Group>
        <div className='bottomMargin'>
          <Button variant="primary" onClick={goPreviousQuestion} id='previous'>Previous</Button>
          <Button variant="primary" onClick={goNextQuestion} id='next'>Next</Button>
          <Button variant="primary" id='submit' type="submit" style={{ display: 'none' }}>
            Submit
          </Button>
        </div>
      </Form>
    </div>
  )
}


