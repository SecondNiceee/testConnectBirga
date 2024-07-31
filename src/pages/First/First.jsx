import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

import BackButton from "../../constants/BackButton";
import "../MyAds/MyAds.css"
import MainButton from "../../constants/MainButton";
import useListner from "../../hooks/useListner";
import AllTasks from "./AllTasks";
import { useDispatch, useSelector } from "react-redux";
import { changeMenuActive } from "../../store/menuSlice";
import Responce from "./Responce";
import SliderMain from "../../components/UI/Swiper/SliderMain";
import { CSSTransition } from "react-transition-group";
import FirstDetails from "../../components/First/FirstDetails/FirstDetails";
import pagesHistory from "../../constants/pagesHistory";
import { addResponse } from "../../store/responses";
import { useFilteredArr } from "../../hooks/useFilteredArr";
import FirstChoiceCategory from "../AdCreatingOne/ChoiceCategory/FirstChoiceCategory";
import FirstChoiceSubCategory from "../AdCreatingOne/FirstChoiceSubCategory";
import AboutReaction from "../MyAds/components/AboutReaction";
import CardPage from "../CardPage/CardPage";

let isDetailsActiveVar = false;
let localResponce;
let localStep;
const First = () => {


  const [step , setStep] = useState(0)
  localStep = step
  console.log('Рендер ферста')
  


  console.warn(window.scrollY)

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

        if (ordersInformation[isDetailsActive.id].responces.find(e => e.user.id === 2144832745)){
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
    if (isDetailsActive.isOpen) {
      BackButton.show();
    }
  }, [isDetailsActive]);

  isDetailsActiveVar = isDetailsActive.isOpen;

  const [isProfile , setProfile] = useState(false)

  const [isCardOpen , setCardOpen] = useState({
    isOpen : false,
    card : {}
  })

  
  
  
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
                  MainButton.setParams({
                          is_active : true,
                          color : '#2ea5ff',
                          text_color : '#ffffff'})
                          
                  mainRef.current.classList.remove('secondStep')
                }
                else{
                  if (isCardOpen.isOpen){
                    setCardOpen((value) => ({...value, isOpen : false}))
                  }
                  else{
                    if (isProfile){
                      setProfile(false)
                    }
                    else{

                      if (step === 0) {
                        setResponce({
                          text: "",
                          photos: [],
                          name: "привет",
                          isShablonModalActive: false,
                          shablonIndex: 0,
                          isShablon: false,
                          shablonMaker : false,
                        })
                        closeDetails();
                      }
                    }
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
  } , [isDetailsActive.isOpen, step , gotIt, responce.isShablonModalActive, responce.shablonMaker, sliderActive.isActive, isProfile, isCardOpen.isOpen , setProfile. setCardOpen]);


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



//   useEffect( () => {
//        window.Telegram.WebApp.disableVerticalSwipes()
        

//         document.documentElement.style.marginTop = '40px'
//          document.documentElement.style.overflowY = 'clip'
//     return () => {


//     }

// },[] )


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

const [categoryOpen , setCategoryOpen] = useState(false)

const [subCategory, setSubCategory] = useState(false)



const [filters, setFilters] = useState({
  category : {id : -1 , category : "Все"},
  subCategory : {id : -1 , subCategory : "Все"},
  price : 0
})



console.log(filters)

const filteredArr = useFilteredArr(ordersInformation, filterBy);


const secFilteredArray = useMemo( () => {
    let copy = [...filteredArr]
    if (filters.category.id !== -1){
      if (filters.subCategory.id !== -1){
        return copy.filter((e) => {
          return e.category === filters.category.id && e.subCategory === filters.subCategory.id && (e.tonValue * tonConstant) >= filters.price
        })
      }
      else{
        return copy.filter((e) => {
          return e.category === filters.category.id && (e.tonValue * tonConstant) >= filters.price
        })
      }
    }
    else{
      return copy.filter((e) => {
        return (e.tonValue * tonConstant) >= filters.price
      })
    }
} , [filteredArr, filters, tonConstant] )

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
        setStep(0)
        setResponce({
          text: "",
          photos: [],
          name: "привет",
          isShablonModalActive: false,
          shablonIndex: 0,
          isShablon: false,
          shablonMaker : false,
        })
    } })
  }
}, [responce, step, ordersInformation, isDetailsActive.id, setDetailsActive, dispatch, setStep, me]);



const categorys = useSelector((state) => state.categorys.category);

const subCategorys = useSelector((state) => state.categorys.subCategory);

console.log(subCategorys)



const firstRef = useRef(null)

// useEffect( () => {

//   document.documentElement.style.overflowY = 'scroll'
//   document.documentElement.style.marginTop = "20px"
//   document.documentElement.scrollTop = 20
//   document.documentElement.style.overflowY = 'hidden'
//   return () => {
//     // window.Telegram.WebApp.offEvent("viewportChanged", hh)
//     // firstRef.current.removeEventListner("scroll" , hh)
//   }
// } , [] )


// 2144832745

// 2144832745

useEffect(() => {
  MainButton.onClick(forwardFunction);
  return () => {
    MainButton.offClick(forwardFunction);
  };
}, [responce, forwardFunction]);



  return (
    <div ref={mainRef} className="first-container">
    <motion.div
      // style={style}
      ref={firstRef}
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
        setFilters={setFilters}
        setSubCategory = {setSubCategory}
        filters = {filters}
        setCategoryOpen = {setCategoryOpen}
        filterBy = {filterBy}
        setFilterBy = {setFilterBy}
          setSliderActive = {setSliderActive}
          ordersInformation={secFilteredArray}
          setDetailsActive={setDetailsActive}
          setMenuActive={setMenuActive}
        />


      </div>




      <CSSTransition in = {categoryOpen} timeout={0} 
      mountOnEnter unmountOnExit
      >
        <FirstChoiceCategory subCategorys={subCategorys} categorys={categorys} setCatagoryChoiceOpen={setCategoryOpen} taskInformation={filters} setTaskInformation={setFilters}   />
      </CSSTransition>



      <CSSTransition in = {subCategory} timeout={0} 
      mountOnEnter unmountOnExit
      >
        <FirstChoiceSubCategory setSubcategoryChoiceOpen={setSubCategory} subCategorysPar={subCategorys}  taskInformation={filters} setTaskInformation={setFilters}   />
      </CSSTransition>

     <SliderMain setSliderActive={setSliderActive} sliderActive={sliderActive} />

    </motion.div>



    <CSSTransition
            classNames="left-right"
            in={isCardOpen.isOpen }
            timeout={400}
            mountOnEnter
            unmountOnExit
          >
           <CardPage card={isCardOpen.card} />
      </CSSTransition>


    <CSSTransition
            in={isProfile}
            timeout={400}
            classNames="left-right"
            mountOnEnter
            unmountOnExit
          >
            <AboutReaction setOneCard={setCardOpen} responce={filteredArr[isDetailsActive.id] ? { createNumber : filteredArr[isDetailsActive.id].createNumber  ,user : filteredArr[isDetailsActive.id].user} : {}}
            />
          </CSSTransition>

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

    <CSSTransition
            in={isDetailsActive.isOpen}
            timeout={400}
            classNames="left-right"
            mountOnEnter
            unmountOnExit
          >
            <FirstDetails
              setProfile={setProfile}
              // className={}
              orderInformation={ordersInformation === null ? "" : ordersInformation[isDetailsActive.id]  }

            />
          </CSSTransition>


        
    </div>
  );
};

export default First;
