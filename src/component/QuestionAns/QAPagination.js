import React from 'react';
import Pagination from "react-bootstrap/Pagination";
import "./QuestionAns.css";

export const QAPagination = (props) => {
    console.log("QAPagination start excuting");
    const pageNumber = [];
    for (let i = 1; i <= props.totalQuestion; i++) {
        pageNumber.push(<Pagination.Item key={i} active={i === props.activePage} onClick={() => props.paginate(i)} >
            {i}
        </Pagination.Item>
        )
    }
    return (
        <div className='topMargin'>
            <Pagination size="lg">
                {pageNumber}
            </Pagination>
        </div>
    )
};
