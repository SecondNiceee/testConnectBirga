import React from "react";
import tie from "../../../images/icons/Tie.svg";
import share from "../../../images/icons/Share.svg";
import star from "../../../images/icons/Star.svg";

import photo from "../../../images/nonUsed/photo_2024-03-02 03.14.svg";
import icon from "../../../images/icons/icon.svg";
import "./../MyAds.css";
const Reaction = ({ goForward, setOpen, name, stage, photos, photo }) => {
    console.log(photos)
  return (
    <>
      <div className="reaction">
        {photos.length > 0 ? (
          <div className="reactions__images">
            {photos.map((e, i) => (
                
              <img
                style={photos.length === 1 ? { width: "100%" } : {}}
                src={URL.createObjectURL(e)}
                alt=""
                key={i}
              />
            ))}
          </div>
        ) : (
          <></>
        )}

        <div className="reaction__middle">
          <img className="icon" src={photo} alt="" />
          <div className="reaction__middle-midle">
            <p className="reaction__userName">{name}</p>
            <div className="reaction__rates">
              {/* <img src={star} alt="" /> */}
              <div className="rates__text">
                {/* <p><span>4</span></p>
                                  <p>◦</p>
                                  <p>158 отзывов</p>
                                  <p>◦</p> */}
                <p>Стаж {stage === null ? "0" : stage} лет</p>
              </div>
            </div>
          </div>
          <div className="circle">
            <img className="shareImage" src={share} alt="" />
          </div>
        </div>
        <div className="reactions__bottom">
          <button
            onClick={() => {
              setOpen();
            }}
            className="bottom__one"
          >
            подробнее
          </button>
          <button className="bottom__two">выбрать</button>
          <img className="tie" src={tie} alt="" />
        </div>
      </div>
    </>
  );
};

export default Reaction;
