import React from 'react';
import cl from './ShowMyResponse.module.css'
import Top from '../../UI/Top/Top';
import ResponseBlock from '../ResponseBlock';
import MyReaction from '../MyReaction';
import Customer from '../Customer/Customer';
const ShowMyResponse = ({response}) => {
    return (
        <div className={cl.wrapper}>
            <Top  name={"Мой отклик"}  />
            <ResponseBlock className={cl.response} buttonText={"Подробнее"} {...response.advertisement} task={response.advertisement}   />
            <MyReaction responce={response} />
            <Customer  />
            <p className={cl.dateObject}>Создано когда - то</p>
        </div>
    );
};

export default ShowMyResponse;