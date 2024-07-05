import React from "react";
import upDown from "../../../images/icons/UpDown.svg";
import Reaction from './Reaction';

const ReactionBlock = ({goForward , setOpen, responces,setSliderActive,openAboutReactionFunc }) => {

  return (
    <div className="reactions__block">

        <div className="reactions__top">
            <p className="sortBy">сортировка</p>
            <div className="reaction__choice">
            <p>по рейтингу</p>
            <img src={upDown} alt="" />
            </div>
        </div>

        {responces.map((e, i) => {
          return (
            <Reaction 
            openAboutReactionFunc={openAboutReactionFunc}
            setSliderActive = {setSliderActive}
            responce = {e}
             setOpen={() => {
              
                  setOpen({
                    isActive : true, 
                    responce : e
                  })              
            }} goForward = {goForward} /> 
          )
        })}
    </div>
  );
};

export default ReactionBlock;
