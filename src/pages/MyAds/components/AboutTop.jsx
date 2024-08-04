import React from "react";
import userPhoto from  "../../../images/userPhoto/user.png"
const AboutTop = ({responce}) => {
  return (
    <div className="about__top">
      <img style={{objectFit : "cover"}} src={responce.user.photo.length > 0 ? responce.user.photo  : userPhoto} alt="" className="topMiddle" />

    </div>
  );
};

export default AboutTop;
