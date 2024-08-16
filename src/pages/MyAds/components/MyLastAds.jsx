import React, { memo, useCallback, useEffect } from "react";

import Reaction from "./Reaction";
import TextAboutMe from "../../../components/UI/AboutMeText/TextAboutMe";
import { useDispatch } from "react-redux";
import { changeMenuActive } from "../../../store/menuSlice";
import formatDate from "../../../functions/makeDate";
import { postResponse } from "../../../store/responses";
import Text from "../../../components/Text/Text";
const MyLastAds = ({

  openAboutReactionFunc,

  responce
}) => {
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

      {/* <LastTop name = {name} photo = {photo} stage = {stage} openAboutReactionFunc={openAboutReactionFunc} /> */}

      <Reaction writeButton = {false} blue = {true}   openAboutReactionFunc = {openAboutReactionFunc} put={true} responce={responce} />
      
      {/* <LastImages images = {images} /> */}
      

      {/* <LastSertificates /> */}
      <TextAboutMe textareaClassName={"new-textarea"} style = {
        {
          marginTop : "8px"
        }
      } aboutU={responce.information} />
      <div style={{marginTop : "8px"}} className="createdAt-block">
        <Text>Создано </Text>
        <p>{formatDate(new Date(responce.createdAt))}</p>
      </div>

      
{/* 
      <textarea className="last-textarea" name="" id="" value={text} /> */}
    </div>
  );
};

export default memo(MyLastAds);
