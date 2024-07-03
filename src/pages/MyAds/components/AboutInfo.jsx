import React from "react";
import submit from "../../../images/icons/Subtract.svg";
import star from "../../../images/icons/Star.svg";
const AboutInfo = ({responce}) => {
  return (
    <div className="aboutInfo">
      <div className="name">
        <p>{responce.user.fl}</p>
      </div>

      <div onClick={() => {
        window.Telegram.WebApp.openTelegramLink("https://t.me/" + responce.user.link)
      }} className="userLink">
        <p className="telegramLink"> Открыть в телеграме </p>
        
        <div className="blueLine"></div>
        
      </div>
      <div className="aboutDown">
        <div className="block">
          <p>0</p>
          <p>Заданий создано</p>
        </div>
        <div className="block">
          <p>0</p>
          <p>Заданий выполено</p>
        </div>
      </div>

    </div>
  );
};

export default AboutInfo;
