import React, { useMemo } from "react";
import FirstBlock from "../FirstMain/FirstBlock";
import FullDescription from "./FullDescription"
import Dedline from './Dedline'
import Status from './Status'
import Customer from './Customer'
import Block from "../Block";

const TaskDetailsContainer = ({orderInformation , setProfile, end = false}) => {
  const text = useMemo(() => {
    if (end){
      return "Вы еще не создали задание, поэтому оно неактивно"
    }
    switch (orderInformation.status){
      case "active":
        return "Заказчик еще не выбрал исполнителя, вы можете им стать"
      case "inProcess":
        return "Заказчик уже выбрал исполнителя"
      case "completed":
        return "Задание уже выполнено"
      default :

    }
  }, [end , orderInformation.status])
  console.log(orderInformation)
  return (
    <div className="Task__container-one">
      <Block end = {end} task={orderInformation} {...orderInformation} isButton = {false} />
      <FullDescription fullDescription={orderInformation.taskDescription} />
      <Dedline dedline={orderInformation.time} />
      <div className="TaskDetails-row">
        <Customer setProfile = {setProfile} userPhoto = {orderInformation.userPhoto} rate={orderInformation.rate} customerName={orderInformation.customerName} />
        <Status text={text} isActive={!end && orderInformation.status === "active"} />
      </div>
    </div>
  );
};

export default TaskDetailsContainer;
