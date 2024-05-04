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
      

      

    </div>
  );
};

export default MyAds;
