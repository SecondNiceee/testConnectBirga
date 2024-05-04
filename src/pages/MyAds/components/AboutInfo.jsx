import React from "react";
import submit from "../../../images/icons/Subtract.svg";
import star from "../../../images/icons/Star.svg";
const AboutInfo = () => {
  return (
    <div className="aboutInfo">
      <div className="name">
        <p>Александр.П</p>
        <img src={submit} alt="" />
      </div>
      <div className="rates">
        <div className="rates__block">
          <img src={star} alt="" />
          <p>4</p>
        </div>
        <p>◦</p>
        <p>158 отзывов</p>
      </div>
      <div className="documentAccess">
        <img src={submit} alt="" />
        <p>Документы подтвержены</p>
      </div>
    </div>
  );
};

export default AboutInfo;
