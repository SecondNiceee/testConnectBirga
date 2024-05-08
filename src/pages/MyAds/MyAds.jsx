import React, { useEffect, useMemo, useState } from "react";


// import myImage from '../../images/desccription.png'
import { useDispatch, useSelector } from "react-redux";
import BackButton from "../../constants/BackButton";
import {  useNavigate } from "react-router-dom";
import { changeMyAds } from "../../store/information";
import { changeMenuActive } from "../../store/menuSlice";
import useListner from "../../hooks/useListner";
import "./MyAds.css";
import MyAdOne from "./components/MyAdOne";
import AboutOne from "./components/AboutOne";
import AboutReaction from "./components/AboutReaction";

let spet = 2;
const MyAds = () => {
  const [isDetailsActive, setDetailsActive] = useState(false);

  const isMenuActive = useSelector((state) => state.menu.value);

  const [myAdsArray, setMyAdsArray] = useState(
    useSelector((state) => state.information.myAdsArray)
  );

  const [task, setTask] = useState(myAdsArray[0]);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [stationNow, setStationNow] = useState(-200);

  function setMenuActive(arg) {
    dispatch(changeMenuActive(arg));
  }

  useEffect(() => {
    BackButton.show();
  }, []);

  function goBack() {
    if (isDetailsActive) {
      setDetailsActive(false);
      dispatch(changeMyAds(myAdsArray));
    } else {
      navigate(-1);
    }
  }

  useEffect(() => {
    BackButton.onClick(goBack);
    return () => {
      BackButton.offClick(goBack);
    };
  });


  useListner({
    isMenuActive,
    setMenuActive,
    setDetailsActive,
    isDetailsActive,
  });

  function animte() {
    let localSpet = spet;
    setStationNow(spet * -100 + 3);
    setTimeout(() => {
      if (localSpet === spet) {
        setStationNow(spet * -100);
      }
    }, 310);
  }

  function goForward() {
    spet -= 1;
    animte();
  }

  return (
    <div
      style={{
        transform: "translateX(" + stationNow.toString() + "%)",
        transition: "0.3s",
      }}
      className="MyAdsContainer"
    >

      <AboutReaction  />

      <AboutOne goForward={goForward} task={task} setMenuActive={setMenuActive} />

      <MyAdOne
        {...{
          myAdsArray,
          setTask,
          goForward,
          setMyAdsArray,
          setDetailsActive,
          isDetailsActive,
          setMenuActive,
        }}
      />

{/* 

      <div className="last-ads">
        <div className="white-block">

        </div>
        <div className="last-top">
          <img src={icon} alt="" className="icon" />
          <div className="top-name-bl">
            <p>Александр П.</p>
            <img src={subtruct} className="last-subtruct" alt="" />
          </div>
          <div className="top-characters">
            <img src={star} className="last-star" alt="" />
            <div className="characters-bl">
              <p>4 ◦ 158 отзывов ◦ Стаж 8 лет</p>
            </div>
          </div>
          <img className="last-left-arr" src = {leftArr}></img>
        </div>
        <div className="last-images">
          <img src={photo} alt="" />
          <img src={photo} alt="" />
        </div>
        <div className="last-sertificates">
          <div className="documents-agree">
            <img src="" alt="" />
            <p>Документы подтвержены</p>
          </div>
          .documents-
        </div>
      </div>
       */}

      

    </div>
  );
};

export default MyAds;
