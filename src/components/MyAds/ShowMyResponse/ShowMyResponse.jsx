import React from 'react';
import cl from './ShowMyResponse.module.css'
import Top from '../../UI/Top/Top';
import ResponseBlock from '../ResponseBlock';
import MyReaction from '../MyReaction';
import Customer from '../Customer/Customer';
import options from '../../../constants/options';
import formatDate from '../../../functions/makeDate';
const ShowMyResponse = ({response , openDetails, index}) => {
    console.log(response)
    return (
        <div className={cl.wrapper}>
            <Top  name={"Мой отклик"}  />
            <ResponseBlock index={index} func={openDetails} className={cl.response} buttonText={"Подробнее"} {...response.advertisement} task={response.advertisement}   />
            <MyReaction responce={response} />
            <Customer fl={response.advertisement.user.fl} photo={response.advertisement.user.photo} link={response.advertisement.user.link}  />
            <p className={cl.dateObject}>Создано { formatDate(new Date(response.advertisement.creationTime))}</p>
        </div>
    );
};

export default ShowMyResponse;