import React from "react";
import icon from "../../../images/icons/icon.svg";
const AboutTop = () => {
  return (
    <div className="about__top">
      <div className="top__one">
        <p>4</p>
        <p>задания создано</p>
      </div>
      <img src={icon} alt="" className="topMiddle" />
      <div className="top__three">
        <p>153</p>
        <p>задания выполнено</p>
      </div>
    </div>
  );
};

export default AboutTop;
