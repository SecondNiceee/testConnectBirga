import React from "react";
import icon from "../../../images/icons/icon.svg";
import { useSelector } from "react-redux";
const AboutTop = () => {
  const userInfo = useSelector(state => state.telegramUserInfo)
  return (
    <div className="about__top">
      <div className="top__one">
        <p>4</p>
        <p>задания создано</p>
      </div>
      <img src={userInfo.photo} alt="" className="topMiddle" />
      <div className="top__three">
        <p>153</p>
        <p>задания выполнено</p>
      </div>
    </div>
  );
};

export default AboutTop;
