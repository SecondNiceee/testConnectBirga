import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

import BackButton from "../../constants/BackButton";

import MainButton from "../../constants/MainButton";
import useListner from "../../hooks/useListner";
import AllTasks from "./AllTasks";
import { useDispatch, useSelector } from "react-redux";
import { changeMenuActive } from "../../store/menuSlice";
import Responce from "./Responce";
import SliderMain from "../../components/UI/Swiper/SliderMain";
import { CSSTransition } from "react-transition-group";
import FirstDetails from "../../components/First/FirstDetails/FirstDetails";

let step = 0;
let isDetailsActiveVar = false;

const First = () => {

  console.log('Рендер ферста')


  const dispatch = useDispatch();




  const [isDetailsActive, setDetailsActive] = useState({
    id: 0,
    isOpen: isDetailsActiveVar,
  });
  

  const [responce, setResponce] = useState({
    text: "",
    photos: [],
    name: "привет",
    isShablonModalActive: false,
    shablonIndex: 0,
    isShablon: false,
    shablonMaker : false,
  });

  const ordersInformation = useSelector(
    (state) => state.information.orderInformations
  );


  const isMenuActive = useSelector((state) => state.menu.value);


  const [sliderActive , setSliderActive ] = useState({
    isActive : false,
    index : 0,
    photos : []
  })

  const mainRef = useRef(null)

  const gotIt = useMemo( () => {
    if (ordersInformation !== null && ordersInformation.length > 0 && ordersInformation[isDetailsActive.id]){

      if (ordersInformation[isDetailsActive.id].responces){

        if (ordersInformation[isDetailsActive.id].responces.find(e => e.user.id === "2144832745")){
          return true
        }
        else{
          return false
        }
      }
    }
    return false
  },[ordersInformation, isDetailsActive.id] )

  useEffect(() => {
    // setStep(varStep)
    // setDetailsActive({...isDetailsActive , isOpen : isDetailsActiveVar})
    if (isDetailsActive.isOpen) {
      BackButton.show();
    }
  }, [isDetailsActive]);

  isDetailsActiveVar = isDetailsActive.isOpen;

  function closeDetails() {
    setDetailsActive({ ...isDetailsActive, isOpen: false });
  }

  function forward() {
    if (gotIt){
      window.Telegram.WebApp.showPopup({
        title : "Ошибка",
        message : "Вы уже откликнулись на это задание. Заказчик обязательно увидит ваш отклик."
      })
    }
    else{
      if (step === 0) {
        mainRef.current.classList.add('secondStep')
        step += 1
      }
    }
  }

  useEffect(() => {
    function back() {
      if (sliderActive.isActive){
        setSliderActive({...sliderActive, isActive : false})
      }
      else{

        if (responce.isShablonModalActive){
          setResponce({...responce, isShablonModalActive : false})
        }
        else{
          if (responce.shablonMaker){
            setResponce({...responce , shablonMaker : false})
          }
          else{
  
            if (step === 1) {
              step -= 1
              mainRef.current.classList.remove('secondStep')
            }
            else{
              if (step === 0) {
                closeDetails();
              }
            }
          }
        }

      }
    }

    MainButton.onClick(forward);
    BackButton.onClick(back);
    if (isDetailsActive.isOpen) {
      BackButton.show();
      if (gotIt){
        MainButton.setParams({//неизвесетно
          color : '#2f2f2f',
          text_color : '#606060',
        })
      }
    } else {
      BackButton.hide();
      MainButton.hide();
      MainButton.setParams({
        is_active : true,
        color : '#2ea5ff',
        text_color : '#ffffff'
        
      })
    }
    return () => {
      MainButton.offClick(forward);
      BackButton.offClick(back);
    };
  });


  useEffect( () => {
    if (isDetailsActive.isOpen) {
      if (step === 0){
        MainButton.setParams({
          is_active : true,
          color : '#2ea5ff',
          text_color : '#ffffff'
          
        })
      }
      BackButton.show();
      MainButton.show();
    }
    if (step === 0) {
      MainButton.setText("ОТКЛИКНУТЬСЯ");
    }
    if (step === 1) {
      MainButton.setText("ОТКЛИКНУТЬСЯ");
      
    }
  
  } , [step , isDetailsActive.isOpen]   )





  



  const setMenuActive = useCallback(
    (set) => {
      dispatch(changeMenuActive(set));
    },
    [dispatch]
  );



  useListner({
    isMenuActive,
    setMenuActive,
    setDetailsActive,
    isDetailsActive,
  });


  const closeMenu = useCallback( () => {
    if (isMenuActive) {
      setMenuActive(false);
    }
  } , [isMenuActive, setMenuActive] )
  
  const tonConstant = useSelector((state) => state.ton.value);
  return (
    <motion.div
      // style={style}
      ref={mainRef}
      className="First"
      onClick={closeMenu}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1 }}
    >
      <div className="first-wrapper" >
        <button
          onClick={forward}
          style={{
            zIndex: "10000",
            position: "fixed",
            left: 20,
            top: 20,
          }}
        >
          ДАЛЕЕ
        </button>
        <AllTasks
          setSliderActive = {setSliderActive}

          setDetailsActive={setDetailsActive}
          setMenuActive={setMenuActive}
        />

        {ordersInformation !== null && tonConstant !== 0   ? 
        <Responce
          mainRef={mainRef}
          setDetailsActive = {setDetailsActive}
          step={step}
          responce = {responce}
          setResponce = {setResponce}
          MainButton={MainButton}
          orderInformation={ordersInformation[isDetailsActive.id] ? ordersInformation[isDetailsActive.id] : "he"}
        />
        // <>
        // </>
        :                                     
        <></>
        }
      </div>

      <CSSTransition
            in={isDetailsActive.isOpen}
            timeout={400}
            classNames="left-right"
            mountOnEnter
            unmountOnExit
          >
            <FirstDetails
              // className={}
              orderInformation={ordersInformation === null ? "" : ordersInformation[isDetailsActive.id]  }

            />
          </CSSTransition>

     <SliderMain setSliderActive={setSliderActive} sliderActive={sliderActive} />

    </motion.div>
  );
};

export default First;
