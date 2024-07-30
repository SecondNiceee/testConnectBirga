import React, { memo, useEffect } from 'react';
import cl from './ShowMyResponse.module.css'
import Top from '../../UI/Top/Top';
import ResponseBlock from '../ResponseBlock';
import MyReaction from '../MyReaction';
import Customer from '../Customer/Customer';
import formatDate from '../../../functions/makeDate';
import { useDispatch } from 'react-redux';
import MyLoader from '../../UI/MyLoader/MyLoader';
import MainButton from '../../../constants/MainButton';
import axios from 'axios';
const ShowMyResponse = ({response , openDetails, index, deleteFunction}) => {
    console.log(response)
    const dispatch = useDispatch()
    useEffect( () => {
        async function clickHandler(){
            try{

                console.warn(response.user.id , response.advertisement.id, response.id, response.advertisement.user.chatId, response.advertisement.id)
                await axios.get("https://back-birga.ywa.su/bot/notification" , {
                    params : {
                        "executorId" : String(response.user.id),
                        "consumerId" : String(response.advertisement.user.id),
                        "responseId" : String(response.id),
                        "chatId" : String(response.advertisement.user.chatId),
                        "advertisementId" : String(response.advertisement.id)
                    }
                })
            }
            catch(e){
                alert("Баг")
                console.log(e)
            }
        }
        if (response.isWatched === "inProcess"){
            MainButton.show()
            MainButton.setText("ВЫПОЛНИЛ")
            MainButton.onClick(clickHandler)
        }
        return () => {
            MainButton.hide()
            MainButton.offClick(clickHandler)
        }
        
    } , [] )
    return (
        <>
        { !response ? <MyLoader style = {{width : "100vw" , height : "100vh" }}/> :
        <div className={cl.wrapper}>
            <Top  name={"Мой отклик"}  />
            <ResponseBlock isWatched={response.isWatched} index={index} func={openDetails} className={cl.response} buttonText={"Подробнее"} {...response.advertisement} task={response.advertisement}   />
            <MyReaction deleteFunction={deleteFunction} responce={response} />
            <Customer fl={response.advertisement.user.fl} photo={response.advertisement.user.photo} link={response.advertisement.user.link}  />
            <p className={cl.dateObject}>Создано { formatDate(new Date(response.advertisement.creationTime))}</p>
        </div>
}
        </>
    );
};

export default  memo(ShowMyResponse);