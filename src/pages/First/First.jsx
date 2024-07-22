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
import axios from "axios";
import pagesHistory from "../../constants/pagesHistory";
import { addResponse } from "../../store/responses";
import { useFilteredArr } from "../../hooks/useFilteredArr";

let isDetailsActiveVar = false;
let localResponce;
let localStep;
const First = () => {


  const [step , setStep] = useState(0)
  localStep = step
  console.log('Рендер ферста')
  

  useEffect( () => {
    document.documentElement.style.marginTop = '40px'
    while(window.scrollY !== 40){
      console.warn("Попытка")
      window.scrollTo({
        top: 40,
        behavior: "auto",
      });
    }
    document.documentElement.style.overflowY = 'hidden'
  return () => {
    document.documentElement.style.overflowY = 'unset'
    document.documentElement.style.marginTop = '40px'
    window.scrollTo({
      top: 40,
      behavior: "auto",
    });

  }
},[] )

  const dispatch = useDispatch();

  useEffect( () => {
    return () => {
      pagesHistory.push('/')
    }
  } , [] )

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

  
  
  
  useEffect(() => {
    
    function closeDetails() {
      setDetailsActive( (value) => ({ ...value, isOpen: false }));
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
          setStep(1)
        }
      }
    }


    function back() {
      if (sliderActive.isActive){
        setSliderActive((value) => ({...value, isActive : false}))
      }
      else{

        if (responce.isShablonModalActive){
          setResponce( (value) =>  ({...value, isShablonModalActive : false}))
        }
        else{
          if (responce.shablonMaker){
            setResponce( (value) => ({...value , shablonMaker : false}))
          }
          else{
  
            if (step === 1) {
              setStep(0)
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
    if (isDetailsActiveVar) {
      BackButton.show();
      MainButton.show()
      if (gotIt){
        MainButton.setParams({//неизвесетно
          color : '#2f2f2f',
          text_color : '#606060',
        })
      }
      else{
        if (localStep === 0){
          MainButton.setParams({
            is_active : true,
            color : '#2ea5ff',
            text_color : '#ffffff'
            
          })
        }
      }
    } else {
      console.log('Я даун')
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
  } , [isDetailsActive.isOpen, step , gotIt, responce.isShablonModalActive, responce.shablonMaker, sliderActive.isActive]);


  useEffect( () => {
    console.log('Вызов этого useEffect')
    // if (isDetailsActive.isOpen) {
    //   if (localStep === 0){
    //     MainButton.setParams({
    //       is_active : true,
    //       color : '#2ea5ff',
    //       text_color : '#ffffff'
          
    //     })
    //   }
    //   BackButton.show();
    //   MainButton.show();
    // }
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
  localResponce = responce


  useEffect(() => {
    console.log(localResponce.text)
    console.log(localStep)
    if (localResponce.text.length < 3 && localStep === 1){
      MainButton.setParams({
        is_active : false, //неизвесетно
        color : '#2f2f2f',
        text_color : '#606060',
      })
    }
    else{
      if (localStep === 1){

        console.warn('я тут')
        MainButton.setParams({
          color : '#2ea5ff',
          text_color : '#ffffff',
          is_active : true
          
        })
      }
      
    }
} , [responce.text, step]) 

const me = useSelector(state => state.telegramUserInfo)

const [filterBy, setFilterBy] = useState("");

const filteredArr = useFilteredArr(ordersInformation, filterBy);

const forwardFunction = useCallback(() => {
  async function postResponce(advertismetId, userId) {
       
    let myFormData = new FormData();
    myFormData.append("information", responce.text);

    myFormData.append("userId", userId);
    myFormData.append("advertismentId", advertismetId);

    responce.photos.forEach((e, i) => {
      myFormData.append(`photos`, e);
    });
    try {

      let gibrid = {...responce}
      gibrid.isWatched = ""
      gibrid.advertisement = ordersInformation[isDetailsActive.id]
      gibrid.user = {
        "id" : me.id,
        "fl" : me.firstName,
        "link" : me.link,
        "photo" : me.photo,
        "about" : me.profile.about,
        "stage" : me.profile.stage,
      }
      dispatch(addResponse([myFormData, gibrid]))  
    } catch (e) {
      alert("ничего не вышло");
      console.warn(e);
    } 
  
  }



  if (step !== 0 && !responce.shablonMaker){
    window.Telegram.WebApp
    .showPopup({
      title: "Откликнуться?",
      message: "Вы действительно хотите откликнуться?",
      buttons: [
        { id: "save", type: "default", text: "Да" },
        { id: "delete", type: "destructive", text: "Нет" },
      ],
    } , (buttonId) => {

      if (buttonId === "delete" || buttonId === null) {
        // setShablon({...shablon , isActive : false})
      }
      if (buttonId === "save") {
        postResponce(ordersInformation[isDetailsActive.id].id, 2144832745 );
        mainRef.current.classList.remove('secondStep')
        setDetailsActive((value) => ({...value , isOpen : false}))
    } })
  }
}, [responce, step, ordersInformation, isDetailsActive.id, setDetailsActive, dispatch]);

useEffect(() => {
  MainButton.onClick(forwardFunction);
  return () => {
    MainButton.offClick(forwardFunction);
  };
}, [responce, forwardFunction]);

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
        {/* <button
          onClick={forward}
          style={{
            zIndex: "10000",
            position: "fixed",
            left: 20,
            top: 20,
          }}
        >
          ДАЛЕЕ
        </button> */}
        <AllTasks
        filterBy = {filterBy}
        setFilterBy = {setFilterBy}
          setSliderActive = {setSliderActive}
          ordersInformation={filteredArr}
          setDetailsActive={setDetailsActive}
          setMenuActive={setMenuActive}
        />

        {ordersInformation !== null && tonConstant !== 0   ? 
        <Responce
          responce = {responce}
          setResponce = {setResponce}

          orderInformation={filteredArr[isDetailsActive.id] ? filteredArr[isDetailsActive.id] : "he"}
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
