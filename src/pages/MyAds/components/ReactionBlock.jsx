import React, { memo } from "react";
import Responses from "./Responses";

const values = ["all", "withCompletedTasks", "withCards"];
const names = ["Все", "С выполненными заданиями", "С примерами работ"];
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
