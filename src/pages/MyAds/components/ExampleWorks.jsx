import React from "react";
import photo from "../../../images/nonUsed/photo_2024-03-02 03.14.svg";

const ExampleWorks = () => {
  return (
    <div className="examplesWork">
      <p>Примеры работ</p>
      <div className="imagesContainer">
        <img src={photo} alt="" />
        <img src={photo} alt="" />
      </div>
      <div className="also">
        <p>Смотреть все работы</p>
      </div>
    </div>
  );
};

export default ExampleWorks;
