import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeMenuActive } from "../../store/menuSlice";
import { motion } from "framer-motion";

import { CSSTransition } from "react-transition-group";



import orangeWallet from "../../images/icons/OrangeWallet.svg";
import Subtract from "../../images/icons/SubtractWhite.svg";
import greyArrowRight from "../../images/icons/greyArrowRight.svg";
import Burger from "../../components/UI/Burger/Burger";
import { Link, json, useNavigate } from "react-router-dom";
import BackButton from "../../constants/BackButton";
import AboutMe from "../../components/UI/AboutMe/AboutMe";
import TextAboutMe from "../../components/UI/AboutMeText/TextAboutMe";


import SmallTextarea from "../../components/UI/SmallTextarea/SmallTextarea";
import Compact from "../../components/UI/Compact/Compact";
import SmallInput from "../../components/UI/SmallInput/SmallInput";
import AdCreateFunc from "../../components/UI/AdCreateFunc/AdCreateFunc";
import Case from "./components/Case/Case";
import MainButton from "../../constants/MainButton";
import { changeProfile, deleteCard } from "../../store/profile";
import Cards from "../Cards/Cards";
import Options from "./components/Options/Options";
import ChangeCards from "../ChangeCard/ChangeCard";

let scrollTo = 0;
const variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.1 },
};

let index = 0
let aboutMeLocal = null



function deepCompare () {
  var i, l, leftChain, rightChain;

  function compare2Objects (x, y) {
    var p;

    // remember that NaN === NaN returns false
    // and isNaN(undefined) returns true
    if (isNaN(x) && isNaN(y) && typeof x === 'number' && typeof y === 'number') {
         return true;
    }

    // Compare primitives and functions.     
    // Check if both arguments link to the same object.
    // Especially useful on the step where we compare prototypes
    if (x === y) {
        return true;
    }

    // Works in case when functions are created in constructor.
    // Comparing dates is a common scenario. Another built-ins?
    // We can even handle functions passed across iframes
    if ((typeof x === 'function' && typeof y === 'function') ||
       (x instanceof Date && y instanceof Date) ||
       (x instanceof RegExp && y instanceof RegExp) ||
       (x instanceof String && y instanceof String) ||
       (x instanceof Number && y instanceof Number)) {
        return x.toString() === y.toString();
    }

    // At last checking prototypes as good as we can
    if (!(x instanceof Object && y instanceof Object)) {
        return false;
    }

    if (x.isPrototypeOf(y) || y.isPrototypeOf(x)) {
        return false;
    }

    if (x.constructor !== y.constructor) {
        return false;
    }

    if (x.prototype !== y.prototype) {
        return false;
    }

    // Check for infinitive linking loops
    if (leftChain.indexOf(x) > -1 || rightChain.indexOf(y) > -1) {
         return false;
    }

    // Quick checking of one object being a subset of another.
    // todo: cache the structure of arguments[0] for performance
    for (p in y) {
        if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
            return false;
        }
        else if (typeof y[p] !== typeof x[p]) {
            return false;
        }
    }

    for (p in x) {
        if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
            return false;
        }
        else if (typeof y[p] !== typeof x[p]) {
            return false;
        }

        switch (typeof (x[p])) {
            case 'object':
            case 'function':

                leftChain.push(x);
                rightChain.push(y);

                if (!compare2Objects (x[p], y[p])) {
                    return false;
                }

                leftChain.pop();
                rightChain.pop();
                break;

            default:
                if (x[p] !== y[p]) {
                    return false;
                }
                break;
        }
    }

    return true;
  }

  if (arguments.length < 1) {
    return true; //Die silently? Don't know how to handle such case, please help...
    // throw "Need two or more arguments to compare";
  }

  for (i = 1, l = arguments.length; i < l; i++) {

      leftChain = []; //Todo: this can be cached
      rightChain = [];

      if (!compare2Objects(arguments[0], arguments[i])) {
          return false;
      }
  }

  return true;
}





const Profile = () => {
  const aboutMe = useSelector( state => state.profile.profile  )

  const dispatch = useDispatch();
  
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

  
  const [aboutU, setAboutU] = useState({
    about: "Просто чувачок",
    stage: 0,
    cards : []
  });
  aboutMeLocal = aboutU



  useEffect(  () => {
    console.log(aboutMe)
    setAboutU(aboutMe)

    let numb = String(aboutMe.stage).slice(1,2)

    const numberInput = document.getElementById('numberInput')

    if ( Number(aboutMe.stage) > 10 && Number(aboutMe.stage) < 20){
      numberInput.value += ' лет'
    }
    else{

        if (numb > 1 && numb < 5){
          numberInput.value += ' года'
        } 
        else{
          if(numb === 1){
            numberInput.value += ' год'
          }
          else{
            numberInput.value += ' лет'
          }
        }
      }


  }, []  )


  

  const save = useCallback( () => {
    console.log(aboutMeLocal)
    dispatch(changeProfile(aboutMeLocal))
    MainButton.hide()
  } , [aboutU] )



  useEffect( () => {
    if (!cardsActive){
        console.log(aboutMe.cards.join(''))
        console.log(aboutU.cards.join(''))
        console.log(aboutU.cards.join('') === aboutMe.cards.join(''))
        let isIt = require('lodash')

      if ( !isIt.isEqual(aboutMe, aboutU) ){
          console.log('я тут')
          MainButton.setParams({
            text : 'Сохранить'
          })
          MainButton.show()
      }
      else{
        MainButton.hide()
        MainButton.offClick(save)
      }
      if (aboutU.stage >= 40){
        MainButton.disable()
        MainButton.setParams({
          
          color : '#2f2f2f',
          text_color : '#606060'
        })
        setErrors({...errors , stageError : true})
      }
      else{
        if (errors.stageError){
          MainButton.enable()
          setErrors({...errors , stageError : false})
        }
        MainButton.setParams({
          color : '#2ea5ff',
          text_color : '#000000'
          
        })
      }

    }
    else{
      MainButton.offClick(save)
      MainButton.setParams({
        color : '#2ea5ff',
        text_color : '#000000'
      })
    }
  }, [aboutU , changeActive]  )


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
      setAboutU({...aboutU , stage : '0 лет'})

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
    
  } , [aboutU.stage] )

  const onFocusFunc = useCallback( (e) => {
    e.target.value = String(aboutU.stage).split(' ')[0]
  } , [aboutU.stage] )

  const setValueFunc = useCallback(  (e) => {
    if (e.slice(0,1) !== '0'){

      setAboutU({ ...aboutU, stage: Number(e) });
    }
    else{
      if(e !== '00'){
        setAboutU({...aboutU , stage : Number(e.slice(1,2))})
      }
      else{
        setAboutU({...aboutU , stage : 0})
      }
    }
  } , [aboutU.stage]  )



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
          
          value={aboutU.about}
          setValue={(e) => {
            setAboutU({ ...aboutU, about: e });
          }}
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
          value={aboutU.stage}
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

      {aboutU.cards.length !== 0 ? aboutU.cards.map((e, i) => {
        return (
          <Case 

          deleteFunction = {() => {
            index = i
            setAboutU({...aboutU , cards : [...aboutU.cards.filter((e , i) => {
              return i !== index
            })]})
            // dispatch(deleteCard(index))
            
          }}

          changeFunction={() => {
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


      <div className="profile__veryfication">
        <p className="veryfication">Верификация</p>
        <div className="veryfication__block">
          <div className="Okey">
            <img className="Subtract" src={Subtract} alt="" />
          </div>

          <div className="veryfication__block-text">
            <p>Пройти KYC верификацию</p>
            <p>
              Подтвердите свою личность <br />и получайте на 20% больше откликов
            </p>
          </div>
          <img src={greyArrowRight} className="greyArrow" alt="" />
        </div>
      </div>


        <CSSTransition
        mountOnEnter
        unmountOnExit
        classNames={'cardsModal'}
        in = {cardsActive}
        timeout={0}
        >

            <Cards save = {save} aboutU={aboutU} setAboutU={setAboutU} setCardsOpen={setCardsActive} />
        </CSSTransition>



        <CSSTransition
        mountOnEnter
        unmountOnExit
        classNames={'cardsModal'}
        in = {changeActive}
        timeout={0}
        >

            <ChangeCards index={index}  card={aboutU.cards[index]}  aboutU={aboutU} setAboutU={setAboutU} setCardsOpen={setChangeActive} />
        </CSSTransition>
        
    </motion.div>
  );
};

export default Profile;
