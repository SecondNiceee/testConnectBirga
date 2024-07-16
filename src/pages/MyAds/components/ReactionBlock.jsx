import React, { memo } from "react";
import Responses from "./Responses";
import MyAnimation from "./MyAnimation";

const values = ["activity", "stage"];
const names = ["По дате", "По стажу работы"];
const height = {height : 'calc(100vh - 330px)'}
const ReactionBlock = ({
  setFilterBy,
  setOpen,
  responces,
  setSliderActive,
  openAboutReactionFunc,
}) => {
  //451
  return (
    <div className="reactions__block">
      {responces.length === 0 ?
      <MyAnimation style = {height} text="Нету откликов на задание" /> : 

      <Responses
        setFilterBy={setFilterBy}
        values={values}
        names={names}
        responces={responces}
        setSliderActive={setSliderActive}
        openAboutReactionFunc={openAboutReactionFunc}
        setOpen={setOpen}
      />
      }
    </div>
  );
};

export default memo(ReactionBlock);
