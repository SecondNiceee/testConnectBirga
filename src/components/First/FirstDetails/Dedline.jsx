import React from 'react';
import formatDate from '../../../functions/makeDate';

const Dedline = ({dedline}) => {
    


    return (
        <div className='DeadlineContainer'>
            <p>Дедлайн</p>
            <p>Начать : {formatDate(dedline.start)}</p> 
            {dedline.end !== "" ? 
            <p>Закончить : {formatDate(dedline.end)} </p>
            :
            ""
            }

        </div>
    );
};

export default Dedline;