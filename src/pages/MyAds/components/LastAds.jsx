import React, { memo, useCallback } from "react";

import Top from "../../../components/UI/Top/Top";
import Reaction from "./Reaction";
import TextAboutMe from "../../../components/UI/AboutMeText/TextAboutMe";
import { useDispatch } from "react-redux";
import { changeMenuActive } from "../../../store/menuSlice";
import options from "../../../constants/options";
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

      <p className="creationTime">{ "Создано " + new Date(responce.createdAt).toLocaleString("ru", options)}</p>

      
{/* 
      <textarea className="last-textarea" name="" id="" value={text} /> */}
    </div>
  );
};

export default memo(LastAds);
