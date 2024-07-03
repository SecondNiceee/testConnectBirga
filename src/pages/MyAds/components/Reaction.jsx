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
              <svg style={{
                strokeWidth : "1.67px",
                stroke : "#2ea5ff"
              }} width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M14.0978 1.80176C15.8171 1.80176 16.247 3.18964 16.247 3.88358V19.2571C16.247 20.2179 15.4204 19.8976 14.0978 19.2571L9.46867 17.1752C9.46867 17.1752 9.08075 17.0151 8.64205 17.0151C8.20335 17.0151 7.81542 17.1752 7.81542 17.1752L3.18633 19.2571C1.86373 19.8976 1.03711 20.2179 1.03711 19.2571V3.88358C1.03711 2.21812 2.46992 1.80176 3.18633 1.80176H14.0978Z" stroke="#2EA5FF" stroke-width="1.66667" />
</svg>
              <div className="circle">
                <img className="shareImage" src={share} alt="" />
              </div>
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
      <button className="bottom__two" onClick = {() => {
        window.Telegram.WebApp.openTelegramLink("@" + responce.user.link)
        console.log("@" + responce.user.link)
      }}>Написать</button>
      <svg style={{
                strokeWidth : "1.67px",
                stroke : "#2ea5ff"
              }} width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M14.0978 1.80176C15.8171 1.80176 16.247 3.18964 16.247 3.88358V19.2571C16.247 20.2179 15.4204 19.8976 14.0978 19.2571L9.46867 17.1752C9.46867 17.1752 9.08075 17.0151 8.64205 17.0151C8.20335 17.0151 7.81542 17.1752 7.81542 17.1752L3.18633 19.2571C1.86373 19.8976 1.03711 20.2179 1.03711 19.2571V3.88358C1.03711 2.21812 2.46992 1.80176 3.18633 1.80176H14.0978Z" stroke="#2EA5FF" stroke-width="1.66667" />
</svg>
    </div>
      }

      </div>
    </>
  );
};

export default Reaction;
