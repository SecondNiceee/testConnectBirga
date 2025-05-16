import React, { useMemo, useRef } from "react";
import FullDescription from "./FullDescription"
import Dedline from './Dedline'
import Status from './Status'
import Customer from './Customer'
import Block from "../Block";
import translation from "../../../functions/translate";

const TaskDetailsContainer = ({orderInformation, end = false, setPhotoIndex,
  setPhotos,
  setSliderOpened, setBaidge, setBaidgeUserId}) => {
  const text = useMemo(() => {
    if (end){
      return translation("Вы еще не создали задание, поэтому оно неактивно.")
    }
    switch (orderInformation.status){
      case "active":
        return translation("Заказчик еще не выбрал исполнителя, вы можете им стать. \n   ")
      case "inProcess":
        return translation("Заказчик уже выбрал исполнителя.")
      case "completed":
        return translation("Задание уже выполнено.")
      default :

    }
  }, [end , orderInformation.status])
  const dedline = useMemo( () => {
    if (!end){
      return orderInformation.time
    }
    else{
      if (orderInformation.whichOne === "startOnly"){
        return {start : new Date(0) , end : orderInformation.singleTime}
      }
      else{
        return {start : orderInformation.startTime , end : orderInformation.endTime }
      }
    }
  } , [orderInformation, end] )

  const areaRef = useRef(null);
  
  return (
    <div ref={areaRef} className="Task__container-one" onClick={() => {
      areaRef.current.scrollIntoView();
    }}>
      <Block   setPhotoIndex={setPhotoIndex}
              setPhotos={setPhotos}
              setSliderOpened={setSliderOpened} sliderLeftPosition="0" sliderPreviousText="ОТКЛИКНУТЬСЯ"  sliderBlockId="First"  sliderBlockerAll = {true} sliderHideButton = {false} end = {end} task={orderInformation} {...orderInformation} isButton = {false} />
      <FullDescription fullDescription={orderInformation.taskDescription} />
      <Dedline dedline={dedline} />
      <div className="TaskDetails-row">
        <Customer id={orderInformation.user ? orderInformation.user.id : ""} setBaidge = {setBaidge} setBaidgeUserId = {setBaidgeUserId} userPhoto = {orderInformation.user ? orderInformation.user.photo : orderInformation.userPhoto} rate={orderInformation.rate} customerName={orderInformation.user ? orderInformation.user.fl : orderInformation.customerName} />
        <Status text={text} isActive={!end && orderInformation.status === "active"} />
      </div>
    </div>
  );
};

export default TaskDetailsContainer;
