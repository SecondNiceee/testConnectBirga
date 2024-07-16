import React, { memo } from "react";
import Reaction from "./Reaction";
import ModalChoicer from "../../../components/UI/ModalChoicer/ModalChoicer";

const Responses = ({
  setFilterBy,
  responces,
  values,
  names,
  openAboutReactionFunc,
  setSliderActive,
  setOpen
}) => {
  return (
    <>
      <ModalChoicer
        setValue={(value) => {
          setFilterBy(value);
        }}
        className={"MyAds-choicer"}
        values={values}
        names={names}
        defaultValue={values[0]}
      />

      {responces.map((e, i) => {
        return (
          <Reaction
            openAboutReactionFunc={openAboutReactionFunc}
            setSliderActive={setSliderActive}
            responce={e}
            setOpen={setOpen}
          />
        );
      })}
    </>
  );
};

export default memo(Responses);
