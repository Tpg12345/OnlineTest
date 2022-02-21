import React, { useEffect } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import  Result  from "../result/Result";

export const QuestionAnswer = (props) => {

  let counter = 1;
  const changeResult = () => {
    let Ques = document.querySelector('input[name="Question"]').value;
    let finalAns = document.querySelector('input[name="FinalAns"]').value;
    let Opt = document.querySelector('input[name="Option"]:checked').value
    sessionStorage.setItem("Question" + Ques, Opt);
    sessionStorage.setItem('correctanswerforquestion' + Ques, finalAns);
  }
  let time = 1000 * 60 * props.time;
  useEffect(() => {
    setTimeout(
      () => handleSubmit(), time);
  }

  )

  const handleSubmit = (event) => {
    if (event != null) {
      // event.preventDefault();
      if(sessionStorage.getItem('formSubmitted') ===null && sessionStorage.getItem('formSubmitted') !== true){
      sessionStorage.setItem('formSubmitted',true);
      }
    } else {
      if(sessionStorage.getItem('formSubmitted') ===null && sessionStorage.getItem('formSubmitted') !== true){
        sessionStorage.setItem('formSubmitted',true);
        }
      document.getElementById('submit').click();
  }
}
  const goPreviousQuestion = (event) => {
    event.preventDefault();
    if (counter > 1) {

      counter = counter - 1;
      let var1 = props.question[counter - 1];
      let selectedOptionForQ = sessionStorage.getItem('Question'+counter);
     
      // if(selectedOptionForQ!=null){
      //   document.getElementsByName('Option')
      // }
      document.getElementById('questionlabel').innerHTML = "Q" + counter + ":" + var1.Ques;
      document.getElementsByClassName('form-check-label')[0].innerHTML = var1.Option1;
      document.getElementsByClassName('form-check-label')[1].innerHTML = var1.Option2;
      document.getElementsByClassName('form-check-label')[2].innerHTML = var1.Option3;
      document.getElementsByClassName('form-check-label')[3].innerHTML = var1.Option4;
      document.querySelector('input[name="Question"]').value = var1.Question;
      document.querySelector('input[name="FinalAns"]').value = var1.FinalAns;
      document.getElementById('Opt'+selectedOptionForQ).checked =true;
    }if(counter<props.totalQuestion){
      document.getElementById('submit').style.display='none';
      document.getElementById('next').style.display='inline';
    }if(counter === 1){
      document.getElementById('previous').disabled = true;
    }
  }
  const goNextQuestion = (event) => {
    event.preventDefault();
    if (counter <= props.totalQuestion - 1) {
      counter = counter + 1;
      let var1 = props.question[counter - 1];
      let selectedOptionForQ = sessionStorage.getItem('Question'+counter);
      document.getElementById('previous').disabled = false;
      document.getElementById('questionlabel').innerHTML = "Q" + counter + ":" + var1.Ques;
      document.getElementsByClassName('form-check-label')[0].innerHTML = var1.Option1;
      document.getElementsByClassName('form-check-label')[1].innerHTML = var1.Option2;
      document.getElementsByClassName('form-check-label')[2].innerHTML = var1.Option3;
      document.getElementsByClassName('form-check-label')[3].innerHTML = var1.Option4;
      document.querySelector('input[name="Question"]').value = var1.Question;
      document.querySelector('input[name="FinalAns"]').value = var1.FinalAns;
      if(selectedOptionForQ!=null){
        document.getElementById('Opt'+selectedOptionForQ).checked =true;
      }else{
      document.querySelector('input[name="Option"]:checked').checked =false;
      }
    }if(counter === props.totalQuestion){
      document.getElementById('submit').style.display='inline';
      document.getElementById('next').style.display='none';

    }
  }
    return (
          //template string 
          <div key={`Question${1}`} className='QuesAns'>
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

              <Button variant="primary" onClick={goPreviousQuestion} id='previous'>Previous</Button>
              <Button  variant="primary" onClick={goNextQuestion} id='next'>Next</Button>
              <Button variant="primary" id='submit' type="submit" style={{display:'none'}}>
                Submit
              </Button>
            </Form>
          </div>
    )
  }


