import React from "react";
const AboutTop = ({responce}) => {
  return (
    <div className="about__top">
      <img src={responce.user.photo} alt="" className="topMiddle" />

    </div>
  );
};

export default AboutTop;
