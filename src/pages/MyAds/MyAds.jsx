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
let localDetailsActive;
let localAboutReaction;
let localSecondPage;
let localIsOpen;
const MyAds = () => {

  const isMenuActive = useSelector((state) => state.menu.value);


  const [details, setDetails] = useState({
    isActive : false,
    task : {
      
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
  });

  const [openAboutReaction , setOpenAboutReaction] = useState(false)

  const [secondPage , setSecondPage] = useState(false)

  const [isOpen , setOpen] = useState(false)


  localAboutReaction = openAboutReaction
  localIsOpen = isOpen
  localSecondPage = secondPage


  


  const myAdsArray =  useSelector((state) => state.information.myAdsArray)

  const [task, setTask] = useState(myAdsArray[0]);




  const navigate = useNavigate();

  const dispatch = useDispatch();






  useEffect( () => {
    document.documentElement.style.overflowY = 'clip'
    document.documentElement.style.marginTop = '8px'
    window.scrollTo(0 , 8)
  },[] )

  useEffect( () => {
    function goBack(){

      if (!localAboutReaction){
  
          if (localIsOpen){
            setOpen(false)
          }
          else{
            if (localSecondPage){
              setSecondPage(false)
            }
            else{
              navigate(-1)
            }
          }
      }
      else{
        setOpenAboutReaction(false)
      }
      
      
    }
    if (!localSecondPage){
      BackButton.hide()
    }
    else{
      BackButton.show()
    }
    BackButton.onClick(goBack)
    
  } )

  console.log(task)




  const setMenuActive = useCallback( (arg) => {
    dispatch(changeMenuActive(arg));
  } , [dispatch]  )

  function setDetailsActive(value){
    setDetails({...details, isActive : value})
  }


  useListner(
    {
    isMenuActive,
    setMenuActive,
    setDetailsActive,
    isDetailsActive : details.isActive,
    isOpen
  }
);  


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

      {/* <button style={{
        position : 'fixed',
        left : '50%',
        zIndex : 1500
      }} onClick={() => {
        goBack()
      }}>НАЗАД</button>
 */}




      <MyAdOne
                
                  
                  myAdsArray = {myAdsArray} 
                  setTask = {setTask}
                  setSecondPage = {setSecondPage} 
                  setOpenAboutReaction = {setOpenAboutReaction}
                  details = {details}
                  setDetails = {setDetails}
                  setMenuActive = {setMenuActive}
                
              />


        <CSSTransition classNames="aboutOne" in={secondPage} timeout={300}
        mountOnEnter unmountOnExit>
            <AboutOne setOpen = {setOpen}  task={task} setMenuActive={setMenuActive}  />
        </CSSTransition>


        <CSSTransition classNames="last-ads" in={isOpen} timeout={400}
        mountOnEnter unmountOnExit>
              <LastAds openAboutReactionFunc={setOpenAboutReaction} openAboutReaction = {openAboutReaction}  isOpen={isOpen} setOpen = {setOpen} aboutReaction={aboutReaction} />
        </CSSTransition>


        <CSSTransition classNames="aboutReaction" in={openAboutReaction} timeout={0}
        mountOnEnter unmountOnExit>
                    <AboutReaction
                        aboutReaction = {aboutReaction}
                    /> 
        </CSSTransition>


      
 










     

      

    </motion.div>
}
    </>
  );
};

export default MyAds;
