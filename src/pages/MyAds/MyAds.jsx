import React, { useCallback, useEffect, useMemo, useState } from "react";

// import myImage from '../../images/desccription.png'
import { useDispatch, useSelector } from "react-redux";
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
import SliderMain from "../../components/UI/Swiper/SliderMain";
import sortFiles from "../../functions/sortFiles";
import { putMyTask } from "../../store/information";
import AdCreatingOne from "../AdCreatingOne/AdCreatingOne/AdCreatingOne";
import { useButton } from "../../hooks/MyAds/useButton";
import { useSave } from "../../hooks/MyAds/useSave";
import pagesHistory from "../../constants/pagesHistory";
import CardPage from "../CardPage/CardPage";

// const LastAds = lazy( () => import ("./components/LastAds") )
// const MyAdOne = lazy( () => import ("./components/MyAdOne") )
// const AboutOne = lazy( () => import ("./components/AboutOne") )
// const AboutReaction = lazy( () => import ("./components/AboutReaction") )


let localAboutReaction;
let localSecondPage;
let localIsOpen;
let localDetails;
let detailsVar;
const MyAds = () => {
  const isMenuActive = useSelector((state) => state.menu.value);

  useEffect( () => {
    return () => {
      pagesHistory.push('/MyAds')
    }
  } , [] )
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

  detailsVar = details;
  
  const myAdsArray = useSelector((state) => state.information.myAdsArray);

  const filteredArray = useMemo( () => {
    let copy = [...myAdsArray]
    return copy.sort( (a , b) => {
      let order = {"inProcess" : 0 , "active" : 1, "completed" : 2 }
      return order[a.status] - order[b.status]
    } )
  } , [myAdsArray] )

  console.log(filteredArray)
  
  
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

  const [oneCards, setOneCard] = useState({
    isOpen : false,
    card : {}
  })


    useEffect( () => {
      document.documentElement.style.marginTop = '15px'
      window.scrollTo({
        top: 15,
        behavior: "auto",
      });
      document.documentElement.style.overflowY = 'hidden'
    return () => {
      document.documentElement.style.overflowY = 'unset'
      document.documentElement.style.marginTop = '15px'
      window.scrollTo({
        top: 15,
        behavior: "auto",
      });

    }
  },[] )

  function checkMistakes(changingTask) {
    let taskName = false;
    let timeError = false;
    if (changingTask.taskName.length < 5) {
      taskName = true;
    }

    if (changingTask.time.end.length > 0) {
      if (changingTask.time.end < changingTask.time.start) {
        timeError = true;
      }
    }
    let rezult = { taskName: taskName, timeError: timeError };


    setMistakes(rezult);
    return Object.values(rezult).every((value) => value === false);
  } 



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



  console.log(pagesHistory)

  const navigate = useNavigate();

  const [sliderActive , setSliderActive] = useState({
    isActive : false,
    photos : [],
    index : 0
  })
  console.log(details)
  const save = useSave({
    detailsVar,
    myAdsArray,
    secondPage,
    checkMistakes,
    sortFiles,
    dispatch,
    putMyTask,
    setDetails,
    details
  })// функция сохранения , а также модалка телеграма


  useButton({
    oneCards : oneCards,
    sliderActive : sliderActive,
    localDetails : localDetails,
    localAboutReaction : localAboutReaction,
    localIsOpen : localIsOpen,
    setOpen : setOpen,
    setSecondPage : setSecondPage,
    navigate : navigate,
    setOpenAboutReaction : setOpenAboutReaction,
    setSliderActive : setSliderActive,
    openAboutReaction : openAboutReaction,
    isOpen : isOpen,
    details : details,
    secondPage : secondPage,
    localSecondPage : localSecondPage,
    setDetails : setDetails,
    save : save,
    setOneCard : setOneCard
  })


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


  const [mistakes, setMistakes] = useState({
    taskName: false,
    timeError: false,
  }); // контролер ошибок

  



  const setChangingTask = useCallback( (e) => {
    setDetails( (value) =>  ({...value , task : e}))
  }, [setDetails] ) 









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
          <button  style={{
        position : 'fixed',
        left : '50%',
        zIndex : 1500
      }} onClick={() => {
       save()
      }}>SAVE</button>


          <MyAdOne
            
            setSliderActive = {setSliderActive}
            myAdsArray={filteredArray}
            setSecondPage={setSecondPage}
            setDetails={setDetails}
            setMenuActive={setMenuActive}
          />





        <CSSTransition classNames="details" in={details.isActive} timeout={300}
          mountOnEnter unmountOnExit>
            <AdCreatingOne
              mistakes={mistakes}
              className="AdCreatingMy"
              taskInformation={details.task}
              setTaskInformation={setChangingTask}
              MyInformation={true}
              isDetailsActive={details.isActive}
            />
          </CSSTransition>

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
              setSecondPage={setSecondPage}
              setOpen={setOpen}
              task={myAdsArray[secondPage.index]}
              setMenuActive={setMenuActive}
              openAboutReactionFunc={setOpenAboutReaction}
            />
          </CSSTransition>



          <CSSTransition
            classNames="left-right"
            in={isOpen.isActive}
            timeout={400}
            mountOnEnter
            unmountOnExit
          >
            <LastAds
            setSliderActive = {setSliderActive}
            responce = {isOpen.responce}
              openAboutReactionFunc={setOpenAboutReaction}

            />
          </CSSTransition>
          <CSSTransition
            classNames="left-right"
            in={oneCards.isOpen }
            timeout={400}
            mountOnEnter
            unmountOnExit
          >
           <CardPage card={oneCards.card} />
          </CSSTransition>


          <CSSTransition
            classNames="left-right"
            in={openAboutReaction.isActive}
            timeout={0}
            mountOnEnter
            unmountOnExit
          >
            <AboutReaction setOneCard = {setOneCard} setSliderActive={setSliderActive} responce = {openAboutReaction.responce}   />
          </CSSTransition>
          <SliderMain setSliderActive={setSliderActive} sliderActive={sliderActive} />
        </motion.div>
      )}
    </>
  );
};

export default MyAds;
