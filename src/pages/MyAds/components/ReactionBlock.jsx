import React, { memo } from "react";
import Responses from "./Responses";
import MyAnimation from "./MyAnimation";

const values = ["all", "withCompletedTasks", "withInformation"];
const names = ["Все", "С выполненными заданиями", "С информацией о себе"];
const height = {height : 'calc(100vh - 330px)'}
const ReactionBlock = ({
  setFilterBy,
  setOpen,
  responces,
  setSliderActive,
  openAboutReactionFunc,
  getMore
}) => {
  //451
  return (
    <div className="reactions__block">
       

      <Responses
        getMore = {getMore}
        setFilterBy={setFilterBy}
        values={values}
        names={names}
        responces={responces}
        setSliderActive={setSliderActive}
        openAboutReactionFunc={openAboutReactionFunc}
        setOpen={setOpen}
      />
      
    </div>
  );
};

export default memo(ReactionBlock);
