import React, { memo, useCallback } from "react";

import Reaction from "./Reaction";
import ModalChoicer from "../../../components/UI/ModalChoicer/ModalChoicer";
import Responses from "./Responses";

const values = ["activity", "stage"];
const names = ["По дате", "По стажу работы"];

const ReactionBlock = ({
  setFilterBy,
  setOpen,
  responces,
  setSliderActive,
  openAboutReactionFunc,
}) => {
  return (
    <div className="reactions__block">
      <Responses
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
