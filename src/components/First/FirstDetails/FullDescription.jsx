import React, { useEffect, useRef } from "react";
import imageDescription from "../../../images/icons/fullDescription.svg";
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
        opacity : 0
      }} ref={refTwo} value={fullDescription} className="FullDescriptionBottom"/>
      {fullDescription.length > 0 ? (
        <div  {...props}  className="FullDescription">
          <div className="FullDescription-top">
            <p>Описание</p>
            <img src={imageDescription} alt="" />
          </div>
          <textarea ref = {textAreaRef} value={fullDescription} className="FullDescriptionBottom"/>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default FullDescription;
