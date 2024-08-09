import React from 'react';
import formatDate from '../../../functions/makeDate';

const Dedline = ({dedline}) => {
    


    return (
        <div className='DeadlineContainer'>
            <p>Дедлайн</p>
            <p>Начать : {formatDate(dedline.start , true)}</p> 
            {dedline.end !== "" ? 
            <p>Закончить : {formatDate(dedline.end , true)} </p>
            :
            ""
            }

        </div>
    );
};

export default Dedline;