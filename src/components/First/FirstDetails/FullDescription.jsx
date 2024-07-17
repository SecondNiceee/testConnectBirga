import React from "react";
import imageDescription from "../../../images/icons/fullDescription.svg";
const FullDescription = ({ fullDescription, ...props }) => {
  return (
    <>
      {fullDescription.length > 0 ? (
        <div {...props}  className="FullDescription">
          <div className="FullDescription-top">
            <p>Описание</p>
            <img src={imageDescription} alt="" />
          </div>
          <p className="FullDescriptionBottom">{fullDescription}</p>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default FullDescription;
