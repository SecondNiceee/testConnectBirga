import React, { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import MyAnimation from './MyAnimation';
import MyResponses from './MyResponses';
import MyLoader from '../../../components/UI/MyLoader/MyLoader';
import { useDispatch, useSelector } from 'react-redux';
import { clearResponses, fetchResponses } from '../../../store/responses';

const PickerOne = forwardRef(({responsesArr, buttonFunction,  oneValue} , ref) => {




    

    const interRef = useRef(null)
    console.log(interRef)

  
    const responsesStatus = useSelector(state => state.responses.status)
  
   

    const text = useMemo( () => {
        switch (oneValue){
            case "all":
                return "Вы не откликнулись ни на одно задание"
            case "watched":
                return "У вас нет просмотренных откликов"
            case "inProcess":
                return "У вас нет выполняемых заказов"
            case "unWatched":
                return "У вас нет непросмотренных задани"
            case "completed":
                return "У вас нет завершенных заказов"
        }
    }  , [oneValue])

    return (

        <>
        {responsesStatus === "pending" && responsesArr.length === 0 ? 
        <MyLoader />
        :

        <div ref={ref} style={{
            alignSelf : "flex-start"
        }} className="picker__block">
            {responsesArr.length === 0 ? 
                <MyAnimation text={text}/> 
            :
                <MyResponses   responsesArr = {responsesArr} buttonFunction = {buttonFunction} />
             }
             <div ref={interRef} className="intersection-block">

             </div>
      </div>
        }
        </>
    );
} );

export default PickerOne;