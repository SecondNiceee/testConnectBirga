import React, { memo } from "react";
import Responses from "./Responses";
import translation from "../../../functions/translate";

const values = ["all", "withCompletedTasks", "withCards"];
const names = ["Все", "С выполненными заданиями", "С примерами работ"].map(e => translation(e));
const ReactionBlock = ({
  setFilterBy,
  setOpen,
  responces,
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
        openAboutReactionFunc={openAboutReactionFunc}
        setOpen={setOpen}
      />
      
    </div>
  );
};

export default memo(ReactionBlock);
