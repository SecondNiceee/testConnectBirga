import React, { memo, useEffect, useRef } from "react";
import imageDescription from "../../../images/icons/fullDescription.svg";
import Text from "../../Text/Text";
const FullDescription = ({ fullDescription, ...props }) => {
  const textAreaRef = useRef(null)
  const refTwo = useRef(null)
  useEffect( () => {
    if (textAreaRef.current && refTwo.current) 
      textAreaRef.current.style.height = (refTwo.current.scrollHeight).toString() + 'px'
  } , [fullDescription] )
  return (
    <>
      <textarea style={{
        position : "absolute",
        opacity : 0,
        height : "17.66px",
        width : "calc(100vw - 32px)"
      }} ref={refTwo} readOnly value={fullDescription} className="FullDescriptionBottom"/>
      {fullDescription.length > 0 ? (
        <div  {...props}  className="FullDescription">
          <div className="FullDescription-top">
            <Text>Описание</Text>
            <img src={imageDescription} alt="" />
          </div>
          <textarea readOnly ref = {textAreaRef} value={fullDescription} className="FullDescriptionBottom"/>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default memo(FullDescription);
