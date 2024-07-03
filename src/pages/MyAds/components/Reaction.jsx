import React from "react";
import tie from "../../../images/icons/Tie.svg";
import share from "../../../images/icons/Share.svg";
import star from "../../../images/icons/Star.svg";

import photo from "../../../images/nonUsed/photo_2024-03-02 03.14.svg";
import icon from "../../../images/icons/icon.svg";
import "./../MyAds.css";
const Reaction = ({ setOpen, put, openAboutReactionFunc, responce }) => {
  console.log(responce.photos);
  return (
    <>
      <div className="reaction">
        {responce.photos.length > 0 ? (
          <div className="reactions__images">
            {responce.photos.map((e, i) => (
              <img
                style={responce.photos.length === 1 ? { width: "100%" } : {}}
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
          <img onClick={() => {
            openAboutReactionFunc({isActive : true,
              responce : responce
            })
          }} className="icon" src={responce.user.photo} alt="" />
          <div onClick={() => {
            openAboutReactionFunc({isActive : true, 
              responce : responce
            })
          }} className="reaction__middle-midle">
            <p className="reaction__userName">{responce.user.fl}</p>
            <div className="reaction__rates">
              {/* <img src={star} alt="" /> */}
              <div className="rates__text">
                {/* <p><span>4</span></p>
                                  <p>◦</p>
                                  <p>158 отзывов</p>
                                  <p>◦</p> */}
                <p>Стаж {responce.user.stage === null ? "0" : responce.user.stage} лет</p>
              </div>
            </div>
          </div>
          {put ? (
            <div className="right">
              <div className="circle">
                <img className="shareImage" src={share} alt="" />
              </div>
              <img className="tie" src={tie} alt="" />
            </div>
          ) : (
            <div className="circle">
              <img className="shareImage" src={share} alt="" />
            </div>
          )}
        </div>
        {put ? 
        <div style={{
          marginBottom : "18px"
        }}></div>
      :
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
      }

      </div>
    </>
  );
};

export default Reaction;
