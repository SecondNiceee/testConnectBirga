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
import icon from '../../images/icons/icon.svg';
import subtruct from '../../images/icons/Subtract.svg';
import star from '../../images/icons/Star.svg';
import photo from '../../images/nonUsed/photo.svg' 

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


  const aboutReaction = `Доброго времени суток!
  Работа выполняется до полного согласования, пока результат Вас полностью не устроит.
  Фиксированная стоимость, независимо от количества предложенных вариантов.
  Гарантирую достойный результат!
    
  Опыт работы 8 лет в сфере типографического дизайна, без трудностей поможет мне выполнить Ваш заказ любой сложности с: растровыми изображениями и векторной графикой, разработкой макетов полиграфической продукции (визитки, листовки, буклеты, евробуклеты и т.д.), рекламной продукции (ручки, пакеты, футболки и т.д.), наружной рекламы, разработкой логотипов и фирменого стиля`
  

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

  const userInfo = useSelector(state => state.telegramUserInfo)

  return (
    <div
      style={{
        transform: "translateX(" + stationNow.toString() + "%)",
        transition: "0.3s",
      }}
      className="MyAdsContainer"
    >

      <AboutReaction  aboutReaction = {aboutReaction} />

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



      <div className="last-ads">
        <div className="white-block">

        </div>
        <div className="last-top">
          <img src={icon} alt="" className="icon" />
          <div className="last-top-center">
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
          </div>
          <svg className="last-left-arr" width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.77344 7.37638C8.7655 7.09846 8.66227 6.86024 8.44787 6.64584L2.27003 0.602991C2.0874 0.428296 1.873 0.333008 1.61096 0.333008C1.07893 0.333008 0.666016 0.745923 0.666016 1.27795C0.666016 1.53205 0.769244 1.77027 0.95188 1.9529L6.51035 7.37638L0.95188 12.7999C0.769244 12.9825 0.666016 13.2128 0.666016 13.4748C0.666016 14.0068 1.07893 14.4198 1.61096 14.4198C1.86506 14.4198 2.0874 14.3245 2.27003 14.1498L8.44787 8.09898C8.67021 7.89252 8.77344 7.6543 8.77344 7.37638Z" fill="white" />
              <path d="M8.77344 7.37638C8.7655 7.09846 8.66227 6.86024 8.44787 6.64584L2.27003 0.602991C2.0874 0.428296 1.873 0.333008 1.61096 0.333008C1.07893 0.333008 0.666016 0.745923 0.666016 1.27795C0.666016 1.53205 0.769244 1.77027 0.95188 1.9529L6.51035 7.37638L0.95188 12.7999C0.769244 12.9825 0.666016 13.2128 0.666016 13.4748C0.666016 14.0068 1.07893 14.4198 1.61096 14.4198C1.86506 14.4198 2.0874 14.3245 2.27003 14.1498L8.44787 8.09898C8.67021 7.89252 8.77344 7.6543 8.77344 7.37638Z" stroke="white" />
        </svg>
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
          <div className="user-agree">
            <img src="" alt="" />
            <p>Проверенный пользователь</p>
          </div>
        </div>
        <textarea className="" name="" id="" value={aboutReaction}/>
      </div>
      

      

    </div>
  );
};

export default MyAds;
