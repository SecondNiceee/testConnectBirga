import React from "react";
import MyLoader from "../../../components/UI/MyLoader/MyLoader";
import ReactionBlock from "./ReactionBlock";

const AllReactions = ({
  setFilterBy,
  openAboutReactionFunc,
  setSliderAcitve,
  responces,
  setOpen,
  filteredArray
}) => {
  return (
    <>
      {filteredArray === null ? (
        <MyLoader
          style={{
            height: "calc(100vh - 456px)",
            position: "fixed",
            left: 0,
          }}
        />
      ) : (
        <ReactionBlock
          setFilterBy={setFilterBy}
          openAboutReactionFunc={openAboutReactionFunc}
          setSliderActive={setSliderAcitve}
          responces={filteredArray}
          setOpen={setOpen}
        />
      )}
    </>
  );
};

export default AllReactions;
