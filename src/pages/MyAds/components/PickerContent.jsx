import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";

import { deleteAd } from "../../../store/information";
import { useDispatch, useSelector } from "react-redux";
import ShowMyResponse from "../../../components/MyAds/ShowMyResponse/ShowMyResponse";
import { CSSTransition } from "react-transition-group";
import BackButton from "../../../constants/BackButton";
import FirstDetails from "../../../components/First/FirstDetails/FirstDetails";
import PickerTwo from "./PickerTwo";
import PickerOne from "./PickerOne";
import { clearResponses, fetchResponses } from "../../../store/responses";
const PickerContent = ({
  myAdsArray,
  nowValue,
  setSecondPage,
  setSliderAcitve,
  valueTwo,
  valueOne,
  myResponse,
  setMyResponse,
  details,
  setDetails,
  responsesArr
}) => {
  const dispatch = useDispatch();
  console.log("рендер ферста");
  const deleteFunction = useCallback(
    (e) => {
      window.Telegram.WebApp.showPopup(
        {
          title: "Удалить?",
          message: "Вы хотите удалить это задание?",
          buttons: [
            { id: "save", type: "default", text: "Да" },
            { id: "delete", type: "destructive", text: "Нет" },
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


  
  console.log(responsesArr)

  const buttonFunction = useCallback( (index) => {
      setMyResponse({isOpen : true , id : index})
  } , []  )


  useEffect( () => {
    function goBack(){
      if (details.isOpen){
        setDetails( (value) => ({...value , isOpen : false}) )
      }
      else{
        if (myResponse.isOpen){
          setMyResponse( (value) => ({...value , isOpen : false}) )
        }
      }
    }
    if (myResponse.isOpen){
      BackButton.onClick(goBack)
      BackButton.show()
    }
    else{
      BackButton.hide()
      BackButton.offClick(goBack)
    }
  
  } , [myResponse.isOpen, details.isOpen] )



  const containerOne = useRef(null)
  const containerTwo = useRef(null)
  const pickerRef = useRef(null)
  
  useEffect( () => {
    if (containerOne.current && containerTwo.current){
      console.warn("Я здесь")
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
      

      <PickerOne ref={containerOne} oneValue = {valueOne} nowValue = {nowValue}  responsesArr = {responsesArr} buttonFunction = {buttonFunction} />

      <PickerTwo ref={containerTwo} valueTwo = {valueTwo} myAdsArray={myAdsArray} setSecondPage = {setSecondPage} setSliderAcitve = {setSliderAcitve} deleteFunction = {deleteFunction} />





    </div>
  );
};

export default memo(PickerContent);
