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
import { addResponce } from "../../store/information";

let isDetailsActiveVar = false;
let localResponce;
let localStep;
const First = () => {


  const [step , setStep] = useState(0)
  localStep = step
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



  useEffect(() => {


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
  } , [isDetailsActive.isOpen]);


  useEffect( () => {
    console.log('Вызов этого useEffect')
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
      if (step === 0){
        console.warn('я тут')
        MainButton.setParams({
          color : '#2ea5ff',
          text_color : '#ffffff',
          is_active : true
          
        })
      }
    }
} , [responce.text, step, MainButton]) 

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
      let im = await axios.post(
        "https://back-birga.ywa.su/response",
        myFormData,
        {
          params: {
            userId: userId,
            advertisementId: advertismetId,
          },
        }
      );
      await axios.get("https://back-birga.ywa.su/user/sendMessage" , {
        params : {
          "chatId" : im.data.user.chatId,
          "text" : '📣 Вы получили отклик на задачу "' + ordersInformation[isDetailsActive.id].taskName.bold() + '" от' +  im.data.user.fl 
        }
      })
      dispatch(addResponce([ordersInformation[isDetailsActive.id].id , im.data]))  
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
}, [responce, step, ordersInformation, setDetailsActive, dispatch]);

useEffect(() => {
  MainButton.onClick(forwardFunction);
  return () => {
    MainButton.offClick(forwardFunction);
  };
}, [responce, MainButton, forwardFunction]);

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
          setSliderActive = {setSliderActive}

          setDetailsActive={setDetailsActive}
          setMenuActive={setMenuActive}
        />

        {ordersInformation !== null && tonConstant !== 0   ? 
        <Responce
          responce = {responce}
          setResponce = {setResponce}

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
