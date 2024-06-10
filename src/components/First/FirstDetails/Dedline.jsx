import React from 'react';

const Dedline = ({dedline}) => {
    
  var options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour : 'numeric',
    minute : 'numeric',
    timezone: 'UTC'
  };


    return (
        <div className='DeadlineContainer'>
            <p>Дедлайн</p>
            <p>Начать : {dedline.start.toLocaleString("ru", options)}</p> 
            {dedline.end !== "" ? 
            <p>Закончить : {dedline.end.toLocaleString("ru", options)} </p>
            :
            ""
            }

        </div>
    );
};

export default Dedline;