import React from "react";
import FirstBlock from "../FirstMain/FirstBlock";
import FullDescription from "./FullDescription"
import Dedline from './Dedline'
import Status from './Status'
import Customer from './Customer'

const TaskDetailsContainer = ({orderInformation}) => {
  return (
    <div className="Task__container-one">
      <FirstBlock task={orderInformation} {...orderInformation} isButton = {false} />
      <FullDescription fullDescription={orderInformation.taskDescription} />
      <Dedline dedline={orderInformation.time} />
      <div className="TaskDetails-row">
        <Customer userPhoto = {orderInformation.userPhoto} rate={orderInformation.rate} customerName={orderInformation.customerName} />
        <Status isActive={orderInformation.isActive} />
      </div>
    </div>
  );
};

export default TaskDetailsContainer;
