import React, { Suspense, lazy, useCallback, useEffect, useMemo, useState } from "react";


// import myImage from '../../images/desccription.png'
import { useDispatch, useSelector } from "react-redux";
import BackButton from "../../constants/BackButton";
import {  useNavigate } from "react-router-dom";
import { changeMyAds, fetchMyOrders, fetchTasksInformation } from "../../store/information";
import { changeMenuActive } from "../../store/menuSlice";
import useListner from "../../hooks/useListner";
import "./MyAds.css";

import { motion } from "framer-motion";
import LastAds from "./components/LastAds";
import MyAdOne from "./components/MyAdOne";
import AboutReaction from "./components/AboutReaction";
import AboutOne from "./components/AboutOne";


// const LastAds = lazy( () => import ("./components/LastAds") )
// const MyAdOne = lazy( () => import ("./components/MyAdOne") )
// const AboutOne = lazy( () => import ("./components/AboutOne") )
// const AboutReaction = lazy( () => import ("./components/AboutReaction") )


let spet = 2;
const aboutReaction = `Доброго времени суток!
  Работа выполняется до полного согласования, пока результат Вас полностью не устроит.
  Фиксированная стоимость, независимо от количества предложенных вариантов.
  Гарантирую достойный результат!
    
  Опыт работы 8 лет в сфере типографического дизайна, без трудностей поможет мне выполнить Ваш заказ любой сложности с: растровыми изображениями и векторной графикой, разработкой макетов полиграфической продукции (визитки, листовки, буклеты, евробуклеты и т.д.), рекламной продукции (ручки, пакеты, футболки и т.д.), наружной рекламы, разработкой логотипов и фирменого стиля`

const MyAds = () => {

    useEffect(() => {
      if (spet != 2){
        BackButton.hide()
      }
      else{
        BackButton.show()
      }
      BackButton.onClick(goBack);
      return () => {
        BackButton.offClick(goBack);
      };  
    });  
  


  const [reactionVisibility , setReactionVisibility] = useState('hidden')

  const [isDetailsActive, setDetailsActive] = useState(false);

  const isMenuActive = useSelector((state) => state.menu.value);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const myAdsArray =  useSelector((state) => state.information.myAdsArray)

  function setMyAdsArray(arr){
    
  }

  const [task, setTask] = useState(myAdsArray[0]);


  const [stationNow, setStationNow] = useState(-200);
  
  const [openAboutReaction , setOpenAboutReaction] = useState(false)

  const [isClosed , setClosed] = useState(true)
  
  useEffect( () => {
    
    dispatch(fetchMyOrders())
  }, [])

  useEffect( () => {
   
    setClosed(false)
    setTimeout( () => {
      setClosed(true)
    } , 400 )

    setClosed(false)
    setTimeout( () => {
      setClosed(true)
    } , 400 )

    document.documentElement.style.marginTop = '150px'

    window.scrollTo({
      top : 150,
      behavior : 'auto'
    })

     document.documentElement.style.overflow = 'clip'
    document.querySelector('.MainContainer').style.overflowY = 'hidden'

    
  

    return () => {
      // document.documentElement.scrollTo({
      //   top : 0,
      //   behavior : 'auto'
      // })
      document.documentElement.style.overflowY = 'unset'
      document.documentElement.style.marginTop = '0px'
      document.querySelector('.MainContainer').style.overflowY = 'unset'
    }


  } , [] )



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
            setReactionVisibility('hidden')
            spet += 1
            animte()
          }
        }
      }
    }
  }
  
  const goForward = useCallback( () => {
    
    spet -= 1;
    if (spet === 1){
      setTimeout(() => {
        setReactionVisibility('visible')
      } , 320)
    }

    animte();
  } , [] )
  
  function animte() {
    setStationNow(spet * -100);
  }



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

  const openAboutReactionFunc = useCallback( () => {
   
    spet += 1
    animte()
    setOpenAboutReaction(true)
  } , [] )

  
  const stylesAboutReaction = useMemo( () => {
    if (openAboutReaction || spet === 1){
      return {
        zIndex : 100,
        visibility : reactionVisibility
      }
    }
    else{
      return{
        zIndex : -1,
        visibility : reactionVisibility
      }
    }
  } , [openAboutReaction , spet] )

  const blackStyle = useMemo(() => {
    if (!isClosed){
      return {
        bottom : 0,
        top : 0,
        left : '100%',
        right : 0,
        backgroundColor : 'black',
        zIndex : 200,
        position : 'fixed',
        width : '100vw',
        height : '100vh',
        opacity : '0.8',
        transition : '0.4s',
      }
    }
    return {
      opacity : '0',
      left : '100%',
      top : 0,
      width : '100vw',
      height : '100vh',
      backgroundColor : 'black',
      zIndex : -1,
      position : 'fixed',
      transition : '0.4s'

    }
  } , [isClosed] )

  // alert(myAdsArray.photos)

  return (
    <motion.div
      style={{
        transform: "translate3d(" + stationNow.toString() + "% , 0 , 0)",
        
      }}
      initial={{ opacity: 0,  }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1 }}
      className="MyAdsContainer"
    >


      <div className="blackBack" style={blackStyle}>

      </div>

  

        <AboutReaction
            
            aboutReaction = {aboutReaction}
            style = {
              stylesAboutReaction
            }

        />




          <AboutOne setClosed = {setClosed} goForward={goForward} task={task} setMenuActive={setMenuActive}  />





        <LastAds openAboutReaction = {openAboutReaction} openAboutReactionFunc = {openAboutReactionFunc} isClosed={isClosed} setClosed = {setClosed} aboutReaction={aboutReaction} />
 





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




     

      

    </motion.div>
  );
};

export default MyAds;
