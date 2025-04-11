import React, { memo, useEffect } from "react";

import Reaction from "./Reaction";
import TextAboutMe from "../../../components/UI/AboutMeText/TextAboutMe";
import { useDispatch } from "react-redux";
import formatDate from "../../../functions/makeDate";
import { postResponse } from "../../../store/responses";
import Text from "../../../components/Text/Text";
import MainButton from "../../../constants/MainButton";
import CssTransitionSlider from "../../../components/UI/PhotosSlider/CssTransitionSlider";
import useSlider from "../../../hooks/useSlider";
const LastAds = ({
  openAboutReactionFunc,

  responce,
  ...props
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      responce.isWatched !== "watched" &&
      responce.isWatched !== "inProcess"
      && responce.isWatched !== "completed"
    ) {
      dispatch(postResponse(responce.id));
    }
    // eslint-disable-next-line
  }, []);

  const {isSliderOpened,photoIndex, photos, setPhotoIndex, setPhotos, setSlideOpened} = useSlider()

  return (
    <>
    
      <div style={MainButton.isVisible ? {paddingBottom : "74px"} : {paddingBottom : "97px"} }  className={"last-ads"} {...props}>
        {/* <LastTop name = {name} photo = {photo} stage = {stage} openAboutReactionFunc={openAboutReactionFunc} /> */}

        <Reaction
          setPhotoIndex={setPhotoIndex}
          setPhotos={setPhotos}
          setSlideOpened={setSlideOpened}
          lastAds={true}
          blue={true}
          openAboutReactionFunc={openAboutReactionFunc}
          put={true}
          responce={responce}
        />

        {/* <LastImages images = {images} /> */}

        {/* <LastSertificates /> */}
        <TextAboutMe
          textareaClassName={"new-textarea"}
          style={{
            marginTop: "8px",
          }}
          aboutU={responce.information}
        />

        <div className="creationTimeBlock">
          <Text>Создано</Text>
          <p>{formatDate(new Date(responce.createdAt))}</p>
        </div>

        {/* 
        <textarea className="last-textarea" name="" id="" value={text} /> */}
      </div>
      <CssTransitionSlider blockerAll={true} blockerId={""} isSliderOpened={isSliderOpened} leftPosition={0} renderMap={photos} setSliderOpened={setSlideOpened} sliderIndex={photoIndex} swiperId={"1"} top={0} />
    </>
  );

  
};

export default memo(LastAds);
