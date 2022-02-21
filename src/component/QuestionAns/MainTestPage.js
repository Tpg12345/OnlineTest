import React, { useState } from 'react';
import Beg from "../../constant/QAnsJson/QAnsBeg.json";
import Med from "../../constant/QAnsJson/QAnsIntM.json";
import Hard from "../../constant/QAnsJson/QAnsHard.json";
import { QuestionAnswer } from './QuestionAnswer';
import { CountDownTimer } from './CountDownTimer';
import { Header } from '../Header';
import './QuestionAns.css';
import Result from "../result/Result";

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
  if (sessionStorage.getItem('formSubmitted') !== "true") {
    return (
      <>
        <Header />
        <div className='container'>
          <CountDownTimer time={Time} />
          <QuestionAnswer QA={currentQuestion} totalQuestion={Question.length} paginate={paginate} time={Time} question={Question} />

        </div>
      </>
    )
  } else {
    return (
      <Result />

    )
  }
}
