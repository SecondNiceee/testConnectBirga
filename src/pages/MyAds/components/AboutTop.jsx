import React from "react";
import icon from "../../../images/icons/icon.svg";
import { useSelector } from "react-redux";
const AboutTop = ({responce}) => {
  const userInfo = useSelector(state => state.telegramUserInfo)
  return (
    <div className="about__top">
      <img src={responce.user.photo} alt="" className="topMiddle" />

    </div>
  );
};

export default AboutTop;
