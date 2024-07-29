import React, { memo, useCallback, useEffect } from "react";

import Top from "../../../components/UI/Top/Top";
import Reaction from "./Reaction";
import TextAboutMe from "../../../components/UI/AboutMeText/TextAboutMe";
import { useDispatch } from "react-redux";
import { changeMenuActive } from "../../../store/menuSlice";
import formatDate from "../../../functions/makeDate";
import { postResponse } from "../../../store/responses";
const LastAds = ({
  setSliderActive,

  openAboutReactionFunc,

  responce
}) => {
  console.log('рендер LastAds')
  const dispatch = useDispatch()

  const setMenuActive = useCallback(
    (arg) => {
      dispatch(changeMenuActive(arg));
    },
    [dispatch]
  );
  useEffect( () => {
    if (responce.isWatched !== "watched" && responce.isWatched !== "inProcess"){
      dispatch(postResponse(responce.id))
    }
    // eslint-disable-next-line
  } , [] )




  return (
    <div
      className={"last-ads"}
    >
      <Top setMenuActive={setMenuActive} className={"last-top"} name={"Отклики"} />

      {/* <LastTop name = {name} photo = {photo} stage = {stage} openAboutReactionFunc={openAboutReactionFunc} /> */}

      <Reaction blue = {true} setSliderActive={setSliderActive}  openAboutReactionFunc = {openAboutReactionFunc} put={true} responce={responce} />
      
      {/* <LastImages images = {images} /> */}
      

      {/* <LastSertificates /> */}
      <TextAboutMe textareaClassName={"new-textarea"} style = {
        {
          marginTop : "8px"
        }
      } aboutU={responce.information} />

      <p className="creationTime">{ "Создано " + formatDate(new Date(responce.createdAt)) }</p>

      
{/* 
      <textarea className="last-textarea" name="" id="" value={text} /> */}
    </div>
  );
};

export default memo(LastAds);
