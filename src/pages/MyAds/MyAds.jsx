import React, { useCallback, useEffect, useMemo, useState } from "react";


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

import LastAds from "./components/LastAds";
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
  
  const [openAboutReaction , setOpenAboutReaction] = useState(false)

  const [isClosed , setClosed] = useState(true)

  const aboutReaction = `Доброго времени суток!
  Работа выполняется до полного согласования, пока результат Вас полностью не устроит.
  Фиксированная стоимость, независимо от количества предложенных вариантов.
  Гарантирую достойный результат!
    
  Опыт работы 8 лет в сфере типографического дизайна, без трудностей поможет мне выполнить Ваш заказ любой сложности с: растровыми изображениями и векторной графикой, разработкой макетов полиграфической продукции (визитки, листовки, буклеты, евробуклеты и т.д.), рекламной продукции (ручки, пакеты, футболки и т.д.), наружной рекламы, разработкой логотипов и фирменого стиля`


  useEffect( () => {
   


    if (spet === 1 || openAboutReaction){
          document.documentElement.style.overflowY = 'hidden'
          document.documentElement.style.marginTop = '150px'
          window.scrollTo( {
            top :  150
          
    }
        )
    }
    else{
      document.documentElement.style.overflowY = 'visible'
      document.documentElement.style.marginTop = '0px'
      window.scrollTo( {
        top :  0
      
}
    )
    }



  


    // document.querySelector('.MainContainer').style.overflowY = 'hidden'
    BackButton.show();

    return () => {
      document.querySelector('.MainContainer').style.overflowY = 'unset'
    }


  } , [ aboutReaction, openAboutReaction , spet] )



  const setMenuActive = useCallback( (arg) => {
    dispatch(changeMenuActive(arg));
  } , [dispatch]  )



  function goBack() {
    if (isDetailsActive) {
      setDetailsActive(false);
      dispatch(changeMyAds(myAdsArray));
    } else {
      if (openAboutReaction){
        closeAboutReactionFunc()
      }
      else{
        if (spet === 2){
          navigate(-1);
        }
        else{
          if(!isClosed){
            setClosed(true)
          }
          else{
            spet += 1
            animte()
          }
        }
      }
    }
  }
  
  function goForward() {
    spet -= 1;
    animte();
  }
  
  function animte() {
    setStationNow(spet * -100);
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
    isClosed
  });  


  // const userInfo = useSelector(state => state.telegramUserInfo)




  function closeAboutReactionFunc(){
    spet -= 1
    animte()
    setOpenAboutReaction(false)
  }

  function openAboutReactionFunc(){
      spet += 1
      animte()
      setOpenAboutReaction(true)
  }

  const stylesAboutReaction = useMemo( () => {
    if (openAboutReaction){
      return {
        zIndex : 100,
        visibility : 'unset'
      }
    }
    else{
      return{
        zIndex : -1,
        visibility : 'hidden'
      }
    }
  } , [openAboutReaction] )

  return (
    <div
      style={{
        transform: "translateX(" + stationNow.toString() + "%)",
        transition: "0.3s",
      }}
      className="MyAdsContainer"
    >




          <AboutReaction
          
          aboutReaction = {aboutReaction}
          style = {
            stylesAboutReaction
          }

          />


      <AboutOne setClosed = {setClosed} goForward={goForward} task={task} setMenuActive={setMenuActive} />
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


      <LastAds openAboutReaction = {openAboutReaction} openAboutReactionFunc = {openAboutReactionFunc} isClosed={isClosed} setClosed = {setClosed} aboutReaction={aboutReaction} />

      

    </div>
  );
};

export default MyAds;
