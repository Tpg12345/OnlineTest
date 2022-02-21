import React from 'react'
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
    sessionStorage.clear();
  }
  if(counter!=null){
  return (
    <div>Result: total answer correct {counter} out of 5 <a href='#' onClick={handleSaveToPC}>click here</a> to download result</div>
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