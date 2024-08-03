import React from "react";
import MyLoader from "../../../components/UI/MyLoader/MyLoader";
import ReactionBlock from "./ReactionBlock";
import { useSelector } from "react-redux";

const AllReactions = ({
  setFilterBy,
  openAboutReactionFunc,
  responces,
  setOpen,
  filteredArray,
  getMore
}) => {
  const status = useSelector( state => state.responses.responsesByAStatus )
  return (
    <>
      {status === "pending" ? (
        <MyLoader
          style={{
            height: "calc(100vh - 456px)",
            position: "fixed",
            left: 0,
          }}
        />
      ) : (
        <ReactionBlock
          getMore = {getMore}
          setFilterBy={setFilterBy}
          openAboutReactionFunc={openAboutReactionFunc}
          responces={filteredArray}
          setOpen={setOpen}
        />
      )}
    </>
  );
};

export default AllReactions;
