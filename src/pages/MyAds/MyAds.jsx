import React, { useCallback, useEffect, useState } from "react";

// import myImage from '../../images/desccription.png'
import { useDispatch, useSelector } from "react-redux";
import BackButton from "../../constants/BackButton";
import { useNavigate } from "react-router-dom";
import { changeMenuActive } from "../../store/menuSlice";
import useListner from "../../hooks/useListner";
import "./MyAds.css";

import { motion } from "framer-motion";
import LastAds from "./components/LastAds";
import MyAdOne from "./components/MyAdOne";
import AboutReaction from "./components/AboutReaction";
import AboutOne from "./components/AboutOne";
import { CSSTransition } from "react-transition-group";
import MainButton from "../../constants/MainButton";
import SliderMain from "../../components/UI/Swiper/SliderMain";

// const LastAds = lazy( () => import ("./components/LastAds") )
// const MyAdOne = lazy( () => import ("./components/MyAdOne") )
// const AboutOne = lazy( () => import ("./components/AboutOne") )
// const AboutReaction = lazy( () => import ("./components/AboutReaction") )

const aboutReaction = `Доброго времени суток!
  Работа выполняется до полного согласования, пока результат Вас полностью не устроит.
  Фиксированная стоимость, независимо от количества предложенных вариантов.
  Гарантирую достойный результат!
    
  Опыт работы 8 лет в сфере типографического дизайна, без трудностей поможет мне выполнить Ваш заказ любой сложности с: растровыми изображениями и векторной графикой, разработкой макетов полиграфической продукции (визитки, листовки, буклеты, евробуклеты и т.д.), рекламной продукции (ручки, пакеты, футболки и т.д.), наружной рекламы, разработкой логотипов и фирменого стиля`;
let localAboutReaction;
let localSecondPage;
let localIsOpen;
let localDetails;
const MyAds = () => {
  const isMenuActive = useSelector((state) => state.menu.value);

  const dispatch = useDispatch()

  const setMenuActive = useCallback(
    (arg) => {
      dispatch(changeMenuActive(arg));
    },
    [dispatch]
  );

  const [details, setDetails] = useState({
    isActive: false,
    task: {
      id: "",
      taskName: "",
      taskDescription: "",
      deadline: 1,
      category: 1,
      subCategory: 1,
      price: 2000,
      time: { start: "", end: "" },
      photos: [],
      photosNames: [],
    },
  });
  
  const myAdsArray = useSelector((state) => state.information.myAdsArray);
  

  
  const [secondPage, setSecondPage] = useState({
    isActive : false,
    task : myAdsArray[0],
    index : 0
  }
  );
  const [openAboutReaction, setOpenAboutReaction] = useState({
    isActive : false,
    responce : null
  });



    useEffect( () => {
    document.documentElement.style.overflowY = 'hidden'
    document.documentElement.style.marginTop = '15px'
    window.scrollTo(0 , 15)
    return () => {
      document.documentElement.style.overflowY = 'unset'
      document.documentElement.style.marginTop = '0px'
      window.scrollTo(0 , 0)
    }
  },[] )


  const [isOpen, setOpen] = useState({ isActive: false, responce: {
    information: "",
    photos: [],
    user: {
        id: 0,
        fl: "",
        photo: "",
        about: "",
        stage: null,
    }
  } });

  localAboutReaction = openAboutReaction;
  localIsOpen = isOpen;
  localSecondPage = secondPage;
  localDetails = details





  const navigate = useNavigate();

  const [sliderActive , setSliderActive] = useState({
    isActive : false,
    photos : [],
    index : 0
  })

  


  useEffect(() => {
    function writeFucntion(){
      window.Telegram.WebApp.openTelegramLink("https://t.me/" + isOpen.responce.user.link)
    }
    function goBack() {

      if (!sliderActive.isActive){

        if (!localDetails.isActive){
  
          if (!localAboutReaction.isActive) {
            if (localIsOpen.isActive) {
              setOpen({...isOpen, isActive : false});
            } else {
              if (localSecondPage.isActive) {
                setSecondPage({...secondPage , isActive : false});
              } else {
                navigate(-1);
              }
            }
          } else {
            setOpenAboutReaction({...openAboutReaction , isActive : false});
          }
        }
        else{
          
        }
      }
      else{
        setSliderActive({...sliderActive , isActive : false})
      }

    }
    if (!localSecondPage.isActive && !details.isActive) {
      BackButton.hide();
    } else {
      BackButton.show();
    }

    if (isOpen.isActive){
      MainButton.show()
      MainButton.setParams({
        color : '#2ea5ff',
        text_color : '#ffffff'
      })
      MainButton.setText("Написать")
      MainButton.onClick(writeFucntion)
    }
    else{
      MainButton.hide()
      MainButton.offClick(writeFucntion)
    
    }
    BackButton.onClick(goBack);
    return () => {
      BackButton.offClick(goBack);
      MainButton.offClick(writeFucntion)
    }

    // eslint-disable-next-line
  }, [isOpen.isActive , sliderActive.isActive, openAboutReaction.isActive, sliderActive.isActive, details.isActive, isOpen, navigate] );



  function setDetailsActive(value) {
    setDetails({ ...details, isActive: value });
  }

  useListner({
    isMenuActive,
    setMenuActive,
    setDetailsActive,
    isDetailsActive: details.isActive,
    isOpen,
  });

  

  



  return (
    <>
      {myAdsArray[0] === null ? (
        <></>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
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
            setSliderActive = {setSliderActive}
            myAdsArray={myAdsArray}
            setSecondPage={setSecondPage}
            setOpenAboutReaction={setOpenAboutReaction}
            details={details}
            setDetails={setDetails}
            setMenuActive={setMenuActive}
            secondPage={secondPage}
          />

          <CSSTransition
            classNames="aboutOne"
            in={secondPage.isActive}
            timeout={300}
            mountOnEnter
            unmountOnExit
          >
            <AboutOne
            setSliderAcitve={setSliderActive}
            setDetails={setDetails}
              secondPage = {secondPage}
              setSecondPage={setSecondPage}
            setDetailsActive={setDetailsActive}
              setOpen={setOpen}
              task={myAdsArray[secondPage.index]}
              setMenuActive={setMenuActive}
              openAboutReactionFunc={setOpenAboutReaction}
            />
          </CSSTransition>

          <CSSTransition
            classNames="last-ads"
            in={isOpen.isActive}
            timeout={400}
            mountOnEnter
            unmountOnExit
          >
            <LastAds
            setSliderActive = {setSliderActive}
            sliderActive = {sliderActive}
            responce = {isOpen.responce}
              openAboutReactionFunc={setOpenAboutReaction}
              openAboutReaction={openAboutReaction}
              isOpen={isOpen}
              setOpen={setOpen}
              aboutReaction={aboutReaction}
            />
          </CSSTransition>

          <CSSTransition
            classNames="aboutReaction"
            in={openAboutReaction.isActive}
            timeout={0}
            mountOnEnter
            unmountOnExit
          >
            <AboutReaction setSliderActive={setSliderActive} responce = {openAboutReaction.responce}   />
          </CSSTransition>
          <SliderMain setSliderActive={setSliderActive} sliderActive={sliderActive} />
        </motion.div>
      )}
    </>
  );
};

export default MyAds;
