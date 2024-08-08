import React, { useCallback, useEffect,  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeMenuActive } from "../../store/menuSlice";
import { motion } from "framer-motion";

import { CSSTransition } from "react-transition-group";



import Burger from "../../components/UI/Burger/Burger";
import { useNavigate } from "react-router-dom";
import BackButton from "../../constants/BackButton";
import userPhoto from "../../images/userPhoto/user.png"


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
import pagesHistory from "../../constants/pagesHistory";
import MyLoader from "../../components/UI/MyLoader/MyLoader";
import CardsArray from "./components/CardsArray/CardsArray";


const variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.1 },
};

let index = 0
let aboutULocal = null

let userInfoLocal = null





const Profile = () => {

  useEffect( () => {
    return () => {
      pagesHistory.push('/Profile')
    }
  } , [] )

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


  
  const [aboutU, setAboutU] = useState({...userInfo.profile , 
    stage : userInfo.profile.stage,
    userId : userInfo.id 
  });

  const cards = useSelector(state => state.telegramUserInfo.profile.cards)

  
  aboutULocal = aboutU
  userInfoLocal = userInfo







  useEffect(  () => {
    let stage = String(userInfoLocal.profile.stage)
    let numb = String(stage).slice(stage.length - 1,stage.length)

    const numberInput = document.getElementById('numberInput')

    if (numberInput){

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
    }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []  )


  

  const save = useCallback( () => {
    dispatch(changeProfile(aboutULocal))
    dispatch(putUserInfo([
      {'stage' : Number(aboutULocal.stage),
        'about' : aboutULocal.about
      },
      userInfoLocal.id
    ]))

  } , [dispatch] )

  



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
      if ( compare2Objects(userInfoLocal.profile, aboutULocal) === false ){
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
      // MainButton.hide()
      // MainButton.setParams({
      //   color : '#2ea5ff',
      //   text_color : '#ffffff'
      // })

       
    }

  }, [aboutU , changeActive, cardsActive, save, errors.stageError , userInfo.profile ]  )


  


  useEffect(() => {
    BackButton.show()
    function goBack() {
      navigate("/");
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


  
  const postStatus = useSelector( state => state.telegramUserInfo.postState )
  const putStatus = useSelector(state => state.telegramUserInfo.putState)

  return (
    <>
    {userInfo.state !== "yes" ? <MyLoader/> :

    
    <motion.div
      className="profile__container"
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition="transition"
    >


      

      <Burger onClick={() => setMenuActive(true)} />

      <img style={{objectFit : "cover"}} src={userInfo.photo.length > 0 ? userInfo.photo : userPhoto} className="profile__icon icon" alt="" />

      <p
        className="urName"
        id="Name"
      >
        { userInfo.firstName.length > 22 ? userInfo.firstName.slice(0, 22) + ".." : userInfo.firstName }
      </p>


      <Options />


      <Compact title={"О себе"} className={"compact-block"}>
        <SmallTextarea
          
          value={aboutULocal.about}
          setValue={(e) => {
            setAboutU({ ...aboutULocal, about: e });
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
          value={aboutULocal.stage === null ? '0' : aboutULocal.stage}
          setValue={setValueFunc}
        />
      </Compact>


      <Compact title={"Примеры работ"} className={"compact-block"}>
        <AdCreateFunc
        func={(e) => {
        
          setCardsActive(true)
        }}
         style = {{
          marginTop : '0px'
        }} text={'Добавить кейс'} />
      </Compact>
      

      {postStatus === "pending" || putStatus === "pending" ? 
      <MyLoader style = { {transform : "translateX(-8px)"} }/> 
      :
      <CardsArray deleteFunction={deleteFunction} cards={cards} setChangeActive={setChangeActive} index={index} />
      }



        <CSSTransition
        mountOnEnter
        unmountOnExit
        classNames={'cardsModal'}
        in = {cardsActive}
        timeout={300}
        >

            <Cards   save = {save} aboutU={aboutU} setAboutU={setAboutU} setCardsOpen={setCardsActive} />
        </CSSTransition>



        <CSSTransition
        mountOnEnter
        unmountOnExit
        classNames={'cardsModal'}
        in = {changeActive}
        timeout={300}
        >

            <ChangeCards save={save} index={index}  card={cards[index]}  aboutU={aboutU} setAboutU={setAboutU} setCardsOpen={setChangeActive} />
        </CSSTransition>





        
    </motion.div>
}

    </>
  );
};

export default Profile;
