import React, { memo, useCallback, useEffect,  useRef, useState,  } from "react";

import { deleteAd } from "../../../store/information";
import { useDispatch,  } from "react-redux";
import BackButton from "../../../constants/BackButton";
import PickerTwo from "./PickerTwo";
import PickerOne from "./PickerOne";
const PickerContent = ({
  myAdsArray,
  nowValue,
  setSecondPage,
  valueTwo,
  valueOne,
  myResponse,
  setMyResponse,
  details,
  setDetails,
  responsesArr
}) => {
  const dispatch = useDispatch();
  const deleteFunction = useCallback(
    (e) => {
      window.Telegram.WebApp.showPopup(
        {
          title: "Удалить?",
          message: "Вы хотите удалить это задание?",
          buttons: [
            { id: "save", type: "default", text: "Yes" },
            { id: "delete", type: "destructive", text: "No" },
          ],
        },
        (buttonId) => {
          if (buttonId === "delete" || buttonId === null) {
          }
          if (buttonId === "save") {
            dispatch(deleteAd(e.id));
          }
        }
      );
    },
    [dispatch]
  );


  

  const buttonFunction = useCallback( (index) => {
      setMyResponse({isOpen : true , id : index})
  } , [setMyResponse]  )





  const containerOne = useRef(null)
  const containerTwo = useRef(null)
  const pickerRef = useRef(null)

  const [viewsNumber, setViewsNumber] = useState(0)
  
  useEffect( () => {
    if (containerOne.current && containerTwo.current){
      if (containerOne.current.offsetHeight < containerTwo.current.offsetHeight){
        if (nowValue === "freelancer"){
          pickerRef.current.style.overflowY = "hidden"
          pickerRef.current.style.minHeight = String(containerOne.current.offsetHeight) + "px"
          
        }
        else{
          pickerRef.current.style.overflowY = "hidden"
          pickerRef.current.style.minHeight = String(containerTwo.current.offsetHeight) + "px"
        }
      }
      else{
        if (nowValue === "customer"){
            pickerRef.current.style.overflowY = "hidden"
            pickerRef.current.style.minHeight = String(containerTwo.current.offsetHeight) + "px"
          
        }
        else{
            pickerRef.current.style.overflowY = "hidden"
            pickerRef.current.style.minHeight = String(containerOne.current.offsetHeight) + "px"
        }
      }
    }

    

    return () => {

    }
  }  , [nowValue, responsesArr, myAdsArray] )
  





  return (
    <div
    ref={pickerRef}
      className="PickerContent"
      style={
        nowValue === "customer"
          ? { transform: "translateX(-50%)" }
          : { transform: "translateX(0%)" }
      }
    >
      

      <PickerOne viewsNumber = {viewsNumber} setViewsNumber = {setViewsNumber} ref={containerOne} oneValue = {valueOne} nowValue = {nowValue}  responsesArr = {responsesArr} buttonFunction = {buttonFunction} />

      <PickerTwo  viewsNumber = {viewsNumber} setViewsNumber = {setViewsNumber} ref={containerTwo} valueTwo = {valueTwo} myAdsArray={myAdsArray} setSecondPage = {setSecondPage}  deleteFunction = {deleteFunction} />





    </div>
  );
};

export default memo(PickerContent);
