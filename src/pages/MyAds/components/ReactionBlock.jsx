import React from "react";

import Reaction from './Reaction';
import ModalChoicer from '../../../components/UI/ModalChoicer/ModalChoicer'


const values = ["activity", "stage"]
const names = ["По дате" , "По стажу работы"]

const ReactionBlock = ({ setFilterBy, setOpen, responces,setSliderActive,openAboutReactionFunc }) => {

  return (
    <div className="reactions__block">

        {/* <div className="reactions__top">
            <p className="sortBy">сортировка</p>
            <div className="reaction__choice">
            <p>по рейтингу</p>
            <img src={upDown} alt="" />
            </div>
        </div> */}

        <ModalChoicer setValue={(value) => {
          setFilterBy(value)
        }}  className={"MyAds-choicer"}  values={values} names={names} defaultValue={values[0]} />

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
            }}  /> 
          )
        })}
    </div>
  );
};

export default ReactionBlock;
