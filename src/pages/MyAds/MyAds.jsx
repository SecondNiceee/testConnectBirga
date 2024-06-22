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
import { CSSTransition } from "react-transition-group";


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

  const isMenuActive = useSelector((state) => state.menu.value);


  const [isDetailsActive, setDetailsActive] = useState(false);

  const [openAboutReaction , setOpenAboutReaction] = useState(false)

  const [secondPage , setSecondPage] = useState(false)

  const [isOpen , setOpen] = useState(false)





  const [changingTask , setChangingTask] = useState(
    {
      id : '',
      taskName : '',
      taskDescription : '',
      deadline : 1,
      category : 1,
      subCategory : 1,
      price : 2000,
      time : {start : '' , end : ''},
      photos : [],
      photosNames : []
    }
  )

  const myAdsArray =  useSelector((state) => state.information.myAdsArray)

  const [task, setTask] = useState(myAdsArray[0]);



  console.log(changingTask)

  const navigate = useNavigate();

  const dispatch = useDispatch();






  useEffect( () => {
    document.documentElement.style.overflowY = 'clip'
    document.documentElement.style.marginTop = '25px'
    window.scrollTo(0 , 25)
  },[] )

  useEffect( () => {
    function goBack(){
      if (isOpen){
        setOpen(false)
      }
      else{
        if (secondPage){
          setSecondPage(false)
        }
        else{
          navigate(-1)
        }
      }
      
    }
    BackButton.show()
    
  } )




  const setMenuActive = useCallback( (arg) => {
    dispatch(changeMenuActive(arg));
  } , [dispatch]  )


  useListner({
    isMenuActive,
    setMenuActive,
    setDetailsActive,
    isDetailsActive,
    isOpen
  });  


  return (
    <>
    {myAdsArray[0] === null ? 
      <>
      </>
      :
    <motion.div
      initial={{ opacity: 0,  }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1 }}
      className="MyAdsContainer"
    >

      <button style={{
        position : 'fixed',
        left : '200%',
        zIndex : 999
      }} onClick={() => {
      }}>НАЗАД</button>





      <MyAdOne
                {...{
                  myAdsArray,
                  setTask,
                  setSecondPage,
                  setOpenAboutReaction,
                  setDetailsActive,
                  isDetailsActive,
                  setMenuActive,
                  changingTask,
                  setChangingTask
                }}
              />


        <CSSTransition classNames="aboutOne" in={secondPage} timeout={300}
        mountOnEnter unmountOnExit>
            <AboutOne setOpen = {setOpen}  task={task} setMenuActive={setMenuActive}  />
        </CSSTransition>


        <CSSTransition classNames="last-ads" in={isOpen} timeout={400}
        mountOnEnter unmountOnExit>
              <LastAds openAboutReaction = {openAboutReaction}  isOpen={isOpen} setOpen = {setOpen} aboutReaction={aboutReaction} />
        </CSSTransition>


          {/* 
                    <AboutReaction
                        aboutReaction = {aboutReaction}
                    />  */}
      
 










     

      

    </motion.div>
}
    </>
  );
};

export default MyAds;
