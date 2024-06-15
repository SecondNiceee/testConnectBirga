import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeMenuActive } from "../../store/menuSlice";
import { motion } from "framer-motion";

import Dimond from "../../images/icons/Dimond.svg";
import ArrowRight from "../../images/icons/rightArrow.svg";
import Pencel from "../../components/UI/Pencel/Pencel";

import orangeWallet from "../../images/icons/OrangeWallet.svg";
import Subtract from "../../images/icons/SubtractWhite.svg";
import greyArrowRight from "../../images/icons/greyArrowRight.svg";
import Burger from "../../components/UI/Burger/Burger";
import { Link, useNavigate } from "react-router-dom";
import BackButton from "../../constants/BackButton";
import AboutMe from "../../components/UI/AboutMe/AboutMe";
import TextAboutMe from "../../components/UI/AboutMeText/TextAboutMe";

import balanceIcon from "../../images/profileIcons/balance.svg";
import notificationIcon from "../../images/profileIcons/notifications.svg";
import shablonsIcon from "../../images/profileIcons/shablons.svg";
import subsctibeIcon from "../../images/profileIcons/subscribe.svg";
import tarifIconIcon from "../../images/profileIcons/tarif.svg";
import workExamplesIcon from "../../images/profileIcons/workExamples.svg";
import SmallTextarea from "../../components/UI/SmallTextarea/SmallTextarea";
import Compact from "../../components/UI/Compact/Compact";
import SmallInput from "../../components/UI/SmallInput/SmallInput";
import AdCreateFunc from "../../components/UI/AdCreateFunc/AdCreateFunc";
import Case from "./components/Case/Case";

let scrollTo = 0;
const variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.1 },
};

const Profile = () => {
  const dispatch = useDispatch();

  const setMenuActive = (arg) => {
    dispatch(changeMenuActive(arg));
  };

  const [name, setName] = useState("Твое имя");

  
  const [aboutU, setAboutU] = useState({
    about: "Просто чувачок",
    stage: "87",
  });

  useEffect( () => {
    let numb = aboutU.stage.slice(0,1)

    if ( Number(aboutU.stage) > 10 && Number(aboutU.stage) < 20){
      setAboutU({...aboutU , stage : aboutU.stage + ' лет'})
    }
    else{

        if (numb > 1 && numb < 5){
          setAboutU({...aboutU , stage : aboutU.stage + ' года'})
        }
        else{
          if(numb === 1){
            setAboutU({...aboutU , stage : aboutU.stage + ' год'})
          }
          else{
            setAboutU({...aboutU , stage : aboutU.stage + ' лет'}) 
          }
        }
      }
  },[] )

  const navigate = useNavigate();

  const inputRef = useRef(null);

  const [aboutMeModal, setAboutMeModal] = useState(false);

  // useEffect(  () => {
  //   if (inputRef.current){
  //     inputRef.current.setSelectionRange(inputRef.current.value.length, inputRef.current.value.length);
  //   }
  // }, [isReadOnly]  )

  useEffect(() => {
    function goBack() {
      navigate(-1);
    }
    BackButton.onClick(goBack);
    return () => {
      BackButton.offClick(goBack);
    };
  });
  // setTimeout(window.scrollTo(0,0),100);

  const zInd = useMemo(() => {
    return aboutMeModal ? "2" : "-1";
  }, [aboutMeModal]);
  const opac = useMemo(() => {
    return aboutMeModal ? "0.8" : "0";
  }, [aboutMeModal]);

  const userInfo = useSelector((state) => state.telegramUserInfo);
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
        ref={inputRef}
        onChange={(e) => setName(e.target.value)}
        className="urName"
        id="Name"
      >
        {userInfo.lastName
          ? userInfo.firstName + " " + userInfo.lastName
          : userInfo.firstName}
      </p>
      <div className="profile__options">
        <Link to="/Balance" className="option__balance">
          <div className="option__left">
            <img src={balanceIcon} className="orangeWallet" alt="" />
            <p>Баланс</p>
          </div>

          <div className="option__balance-block">
            <p className="tonPrice">1 TON</p>
            <img className="Dymond" src={Dimond} alt="" />
            <div className="option__money">
              <p>~</p>
              <p>250₽</p>
            </div>
          </div>
          <img className="arrowRight" src={ArrowRight} alt="" />
        </Link>
        <div className="option">
          <div className="option__left">
            <img src={tarifIconIcon} className="orangeWallet" alt="" />
            <p>Тарифы</p>
          </div>
          <img src={ArrowRight} className="arrowRight" alt="" />
        </div>
        <div className="option">
          <div className="option__left">
            <img src={notificationIcon} className="orangeWallet" alt="" />
            <p>Уведомления</p>
          </div>
          <img className="arrowRight" src={ArrowRight} alt="" />
        </div>
        <div className="option">
          <div className="option__left">
            <img src={workExamplesIcon} className="orangeWallet" alt="" />
            <p>О себе и примеры работ</p>
          </div>
          <img className="arrowRight" src={ArrowRight} alt="" />
        </div>
        <div className="option">
          <div className="option__left">
            <img src={subsctibeIcon} className="orangeWallet" alt="" />
            <p>Подписка за задания</p>
          </div>
          <img className="arrowRight" src={ArrowRight} alt="" />
        </div>
        <div className="option">
          <div className="option__left">
            <img src={shablonsIcon} className="orangeWallet" alt="" />
            <p>Шаблоны откликов</p>
          </div>
          <img className="arrowRight" src={ArrowRight} alt="" />
        </div>
      </div>

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
         maxLength = {2}
          onBlur = {(e) => {
            let numb = Number(e.target.value.slice(e.target.value.length - 1 , e.target.value.length))
            console.log(numb)
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
            
          }}
          onFocus = {(e) => {
            e.target.value = aboutU.stage.slice(0,2)
          }}
          inputMode = "numeric"
          // type = "number"
          value={aboutU.stage}
          setValue={(e) => {
            if (e.slice(0,1) !== '0'){

              setAboutU({ ...aboutU, stage: e });
            }
            else{
              if(e !== '00'){
                setAboutU({...aboutU , stage : e.slice(1,2)})
              }
              else{
                setAboutU({...aboutU , stage : '0'})
              }
            }
          }}
        />
      </Compact>


      <Compact title={"Примеры работ"} className={"compact-block"}>
        <AdCreateFunc style = {{
          marginTop : '0px'
        }} text={'Добавить кейс'} />
      </Compact>

      <Case className={'profile-case'} />


      

      

      {/* <div className="profile__about-me">
        <div className="aboutMeTitle">
          <p>О себе</p>

          <label htmlFor="aboutYou">
            <div
              className="pencel__wrapper"
              onClick={() => {
                setAboutMeModal(true);
                document.documentElement.style.overflow = "clip";
                if (window.scrollY >= 0 && window.scrollY <= 50) {
                  scrollTo = window.scrollY;
                  document.documentElement.style.overflow = "clip";
                  document.documentElement.style.marginTop = "200px";
                  window.scrollTo({
                    top: 200 + scrollTo,
                    behavior: "auto",
                  });
                }
              }}
            >
              <Pencel className="pencel" />
            </div>
          </label>
        </div>

        <TextAboutMe aboutU={aboutU} />
      </div> */}

      {/* <div className="profile__works">
        <p>Выполняемые работы</p>
        <p>Дизайн</p>
        <p>Пока нет выполненых работ</p>
      </div> */}

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
      <div
        className="black"
        style={{
          position: "absolute",
          zIndex: zInd,
          background: "black",
          width: "100%",
          height: "100%",
          left: "0",
          top: "0",
          opacity: opac,
        }}
      ></div>
      <AboutMe
        scrollTo={scrollTo}
        aboutMeModal={aboutMeModal}
        setAboutMeModal={setAboutMeModal}
        aboutU={aboutU}
        setAboutU={setAboutU}
      />
    </motion.div>
  );
};

export default Profile;
