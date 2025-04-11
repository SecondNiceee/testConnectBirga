import React from "react";
import MyLoader from "../../../components/UI/MyLoader/MyLoader";
import ReactionBlock from "./ReactionBlock";
import { useSelector } from "react-redux";
import useSlider from "../../../hooks/useSlider";
import CssTransitionSlider from "../../../components/UI/PhotosSlider/CssTransitionSlider";

const AllReactions = ({
  setFilterBy,
  openAboutReactionFunc,
  responces,
  setOpen,
  filteredArray,
  getMore,
  setPhotos,
  setPhotoIndex,
  setSliderOpened
}) => {
  const status = useSelector( state => state.responses.responsesByAStatus )

  return (
    <>
      {status === "pending" ? (
        <MyLoader
          style={{
            height: "calc(calc(100vh) - 456px)",
            position: "fixed",
            left: 0,
          }}
        />
      ) : (
        <ReactionBlock
          setPhotoIndex={setPhotoIndex}
          setPhotos={setPhotos}
          setSlideOpened={setSliderOpened}
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
