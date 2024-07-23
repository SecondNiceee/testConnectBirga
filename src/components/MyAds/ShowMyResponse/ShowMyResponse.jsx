import React, { memo, useCallback } from 'react';
import cl from './ShowMyResponse.module.css'
import Top from '../../UI/Top/Top';
import ResponseBlock from '../ResponseBlock';
import MyReaction from '../MyReaction';
import Customer from '../Customer/Customer';
import options from '../../../constants/options';
import formatDate from '../../../functions/makeDate';
import { useDispatch } from 'react-redux';
import { deleteResponce } from '../../../store/saves';
const ShowMyResponse = ({response , openDetails, index}) => {
    console.log(response)
    const dispatch = useDispatch()
    const deleteFunction = useCallback( (index) => {
        dispatch(deleteResponce(response.id))
    } , [])
    return (
        <div className={cl.wrapper}>
            <Top  name={"Мой отклик"}  />
            <ResponseBlock isWatched={response.isWatched} index={index} func={openDetails} className={cl.response} buttonText={"Подробнее"} {...response.advertisement} task={response.advertisement}   />
            <MyReaction deleteFunction={deleteFunction} responce={response} />
            <Customer fl={response.advertisement.user.fl} photo={response.advertisement.user.photo} link={response.advertisement.user.link}  />
            <p className={cl.dateObject}>Создано { formatDate(new Date(response.advertisement.creationTime))}</p>
        </div>
    );
};

export default  memo(ShowMyResponse);