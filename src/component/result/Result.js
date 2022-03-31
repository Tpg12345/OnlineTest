import React from 'react'
import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/esm/Container';
import { Link } from "react-router-dom";
import { Header } from "../Header";


const Result = (props) => {
 
  let counter = 0;
  let email = sessionStorage.getItem('email');
   console.log(sessionStorage);
  for(let i =1;i<=5;i++){
    let ques = sessionStorage.getItem('Question'+i);
    let correctAns = sessionStorage.getItem('correctanswerforquestion'+i);
     if(ques !=null && ques === correctAns){
      counter = counter+1;
      console.log(counter)
     }
   }
   const fileData = JSON.stringify(sessionStorage);

   const handleSaveToPC = () => {
    const blob = new Blob([fileData], {type: "text/plain"});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `${'result'}.json`;
    link.href = url;
    link.click();
    // sessionStorage.clear();
  }
  if(counter!=null){
  return (
    <>
    <Header />
    <Container className='border border-primary w-25 mt-5'>
      <div className='row mt-2'>
      <div className='fs-1 text-md-center text-success'>
        Result Here:
      </div>
      <div className='fs-1 text-center'>
        {counter}/5
      </div>
      <div className='col-md-3'></div>
      <div className='col-md-6'>
      <Button className='btn btn-primary downloadBtn' onClick={handleSaveToPC}>Download Result</Button> 
      </div>
      <div className='col-md-3 downloadBtn'>
        <a href='/'onClick={sessionStorage.clear()}>Retry Test</a>
        </div>
      </div>
    </Container>
    </>
  )
  }else{
    return(
      <>
      <Header/>
      < div className='container' style={{ textAlign: 'center' }}>
        <Link to='/register'>Please Register To Start test</Link>
      </div>
      </>
    )
  }
}

export default Result