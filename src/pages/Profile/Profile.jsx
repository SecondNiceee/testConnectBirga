import React, { useCallback, useEffect,  useRef,  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeMenuActive } from "../../store/menuSlice";
import { motion } from "framer-motion";

import { CSSTransition } from "react-transition-group";



import Subtract from "../../images/icons/SubtractWhite.svg";
import greyArrowRight from "../../images/icons/greyArrowRight.svg";
import Burger from "../../components/UI/Burger/Burger";
import { useNavigate } from "react-router-dom";
import BackButton from "../../constants/BackButton";


import SmallTextarea from "../../components/UI/SmallTextarea/SmallTextarea";
import Compact from "../../components/UI/Compact/Compact";
import SmallInput from "../../components/UI/SmallInput/SmallInput";
import AdCreateFunc from "../../components/UI/AdCreateFunc/AdCreateFunc";
import Case from "../../components/UI/Case/Case";
import MainButton from "../../constants/MainButton";
import Cards from "../Cards/Cards";
import Options from "./components/Options/Options";
import ChangeCards from "../ChangeCard/ChangeCard";
import { changeProfile, deleteCard, deleteServerCard, putUserInfo } from "../../store/telegramUserInfo";
import SliderMain from "../../components/UI/Swiper/SliderMain";
import Veryfication from "../../components/Profile/Veryfycation/Veryfication";


const variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.1 },
};

let index = 0
let aboutULocal = null

let userInfoLocal = null





const Profile = () => {



  const dispatch = useDispatch();


  const [isSliderAcitve , setSliderActive] = useState({
    isActive : false,
    index : 0,
    photos : []
  })
  
  const setMenuActive = (arg) => {
    dispatch(changeMenuActive(arg));
  };
  

  

  const userInfo = useSelector((state) => state.telegramUserInfo);

  const [errors , setErrors] = useState({
    stageError : false
  })

  const navigate = useNavigate();

  const [cardsActive , setCardsActive] = useState(false)

  const [changeActive , setChangeActive] = useState(false)


  
  const [aboutU, setAboutU] = useState({...userInfo.profile , 
    stage : userInfo.profile.stage,
    userId : userInfo.id 
  });
  

  const textRef = useRef(null)



  const cards = useSelector(state => state.telegramUserInfo.profile.cards)
  
  useEffect( () => {
    console.log(userInfo)
    textRef.current.value = userInfo.profile.about
  },[] )

  

  aboutULocal = aboutU
  userInfoLocal = userInfo







  useEffect(  () => {
    let stage = userInfoLocal.profile.stage
    let numb = String(stage).slice(stage.length - 1,stage.length)

    const numberInput = document.getElementById('numberInput')


    if ( Number(stage) > 10 && Number(stage) < 20){
      if (!numberInput.value.includes('лет')){
        numberInput.value += ' лет'
      }
    }
    else{

        if (numb > 1 && numb < 5){
          if (!numberInput.value.includes('года')){
            numberInput.value += ' года'
          }

        } 
        else{
          if(numb === 1){
            if (!numberInput.value.includes('год')){
              numberInput.value += ' год'
            }
          }
          else{
            if (!numberInput.value.includes('лет')){
              numberInput.value += ' лет'
            }
          }
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []  )


  

  const save = useCallback( () => {
    dispatch(changeProfile(aboutULocal))
    dispatch(putUserInfo([
      {'stage' : Number(aboutULocal.stage),
        'about' : textRef.current.value
      },
      userInfoLocal.id
    ]))

  } , [dispatch, textRef.current.value] )

  



  useEffect( () => {


    function compare2Objects (x, y) {
      if (x.about === y.about && x.stage === y.stage){
        return true
      }
      else{
        return false
      }
      // if (JSON.stringify(x) !== JSON.stringify(y)){
      //   return false
      // }
      // if (x.cards.length !== y.cards.length){
      //   return false
      // }
      // else{
      //   for (let xCard of x.cards){
      //     for (let yCard of y.cards){
      //       if (JSON.stringify(xCard) !== JSON.stringify(yCard)){
      //         return false
      //       }
      //     }
      //   }
      // }
      // return true;
    }



    if (!cardsActive && !changeActive){
      if ( compare2Objects(userInfoLocal.profile, aboutULocal) === false || textRef.current.value !== userInfoLocal.profile.about ){
          MainButton.setParams({
            text : 'Сохранить',
            is_visible : true
          })
          MainButton.onClick(save)
          if (!MainButton.isVisible){

            MainButton.show()
          }



          if (aboutU.stage >= 40){
            MainButton.disable()
            MainButton.setParams({
              
              color : '#2f2f2f',
              text_color : '#606060',
            })
            setErrors( value =>  ({...value , stageError : true} ) )
          }
          else{
            if (errors.stageError){
              MainButton.enable()
              setErrors(value => ({...value , stageError : false}))
            }
            MainButton.setParams({
    
              color : '#2ea5ff',
              text_color : '#ffffff'
              
            })
          }

      }
      else{
        MainButton.hide()
        MainButton.offClick(save)
      }

    }
    else{
      
      MainButton.offClick(save)
      MainButton.hide()
      // MainButton.setParams({
      //   color : '#2ea5ff',
      //   text_color : '#ffffff'
      // })

       
    }

  }, [aboutU , changeActive, cardsActive, save, errors.stageError , userInfo.profile,  textRef ]  )


  


  useEffect(() => {
    function goBack() {
      navigate(-1);
    }
    if (cardsActive || changeActive){
      BackButton.offClick(goBack)
      
    }
    else{

      BackButton.onClick(goBack);
    }
    return () => {
      BackButton.offClick(goBack);
    }; 
  });


  
  

  


  const onBlurFunc = useCallback( (e) => {
    let numb = Number(e.target.value.slice(e.target.value.length - 1 , e.target.value.length))

    if (e.target.value === ''){
      setAboutU(value => ({...value , stage : '0 лет'}))

    }

    if ( Number(e.target.value) > 10 && Number(e.target.value) < 20){
      e.target.value += ' лет'
    }
    else{

        if (numb > 1 && numb < 5){
          e.target.value += ' года'
        }
        else{
          if(numb === 1){
            e.target.value += ' год'
          }
          else{
            e.target.value += ' лет'  
          }
        }
      }
    
  } , [] )
  console.log(aboutULocal.stage)

  const onFocusFunc = useCallback( (e) => {
    e.target.value = String(aboutULocal.stage).split(' ')[0]
  } , [] )

  const setValueFunc = useCallback(  (e) => {
    if (!isNaN(e)){
        if (e.slice(0,1) !== '0'){
    
          setAboutU({ ...aboutULocal, stage: Number(e) });
        }
        else{
          if(e !== '00'){
            setAboutU({...aboutULocal , stage : Number(e.slice(1,2))})
          }
          else{
            setAboutU({...aboutULocal , stage : 0})
          }
        }
    }
  } , []  )


  function deleteFunction(index, e){

    window.Telegram.WebApp
    .showPopup({
      title: "Удалить?",
      message: "Вы хотите удалить этот кейс?",
      buttons: [
        { id: "save", type: "default", text: "Да" },
        { id: "delete", type: "destructive", text: "Нет" },
      ],
    } , (buttonId) => {

      if (buttonId === "delete" || buttonId === null) {
        
      }
      if (buttonId === "save") {
        dispatch(deleteServerCard(e.id))
        dispatch(deleteCard(index))
      }


    } )
    
  }


  return (
    <motion.div
      className="profile__container"
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition="transition"
    >

      

      <Burger onClick={() => setMenuActive(true)} />

      <img src={userInfo.photo} className="profile__icon icon" alt="" />

      <p
        className="urName"
        id="Name"
      >
        {userInfo.lastName
          ? userInfo.firstName + " " + userInfo.lastName
          : userInfo.firstName}
      </p>


      <Options />


      <Compact title={"О себе"} className={"compact-block"}>
        <SmallTextarea
           ref={textRef}
          // value={aboutULocal.about}
          // setValue={(e) => {
          //   setAboutU({ ...aboutULocal, about: e });
          // }}
        />
      </Compact>

      <Compact title={"Стаж работы"} className={"compact-block"}>
        <SmallInput
        mistakeText={'Стаж должен быть меньше 40 лет!'}
        mistake={errors.stageError}
         id = 'numberInput'
         maxLength = {2}
          onBlur = {onBlurFunc}
          onFocus = {onFocusFunc}
          inputMode = "numeric"
          // type = "number"
          value={aboutULocal.stage === null ? '0' : aboutULocal.stage}
          setValue={setValueFunc}
        />
      </Compact>


      <Compact title={"Примеры работ"} className={"compact-block"}>
        <AdCreateFunc
        func={(e) => {
          document.documentElement.style.overflow = 'hidden'
          setCardsActive(true)
        }}
         style = {{
          marginTop : '0px'
        }} text={'Добавить кейс'} />
      </Compact>

      {cards.length !== 0 ? cards.map((e, i) => {
        return (
          <Case 
          setSliderActive = {setSliderActive}
          deleteFunction = {() => {
            deleteFunction(i, e)

            // index = i
            // setAboutU({...aboutULocal , cards : [...aboutU.cards.filter((e , i) => {
            //   return i !== index
            // })]})
            // dispatch(deleteCard(index))
            // dispatch(deleteServerCard(e.id))
            
          }}

          changeFunction={() => {
            document.documentElement.sty
            .le.overflow = 'hidden'
            setChangeActive(true)
            index = i
          }}  key = {i} className={'profile-case'} title = {e.title} description = {e.description} photos = {e.photos}
          
          />
        )
      })
    :
    <></>
    }

      {/* <Case className={'profile-case'} /> */}


      {/* <Veryfication /> */}

        <CSSTransition
        mountOnEnter
        unmountOnExit
        classNames={'cardsModal'}
        in = {cardsActive}
        timeout={0}
        >

            <Cards   save = {save} aboutU={aboutU} setAboutU={setAboutU} setCardsOpen={setCardsActive} />
        </CSSTransition>



        <CSSTransition
        mountOnEnter
        unmountOnExit
        classNames={'cardsModal'}
        in = {changeActive}
        timeout={0}
        >

            <ChangeCards save={save} index={index}  card={aboutULocal.cards[index]}  aboutU={aboutU} setAboutU={setAboutU} setCardsOpen={setChangeActive} />
        </CSSTransition>

        <SliderMain sliderActive={isSliderAcitve} setSliderActive={setSliderActive} />



        
    </motion.div>
  );
};

export default Profile;
