import React from 'react';
import Pagination from "react-bootstrap/Pagination";

export const QAPagination = (props) => {
    console.log("QAPagination start excuting");
    const pageNumber = [];
    for (let i = 1; i <=props.totalQuestion ; i++) {
        pageNumber.push( <Pagination.Item key={i}  onClick={()=>props.paginate(i)} >
            {i}
          </Pagination.Item>
           
        )
    }

    return (
        <div>
        <Pagination>
            {pageNumber}
       </Pagination>
                </div>
    )
};
