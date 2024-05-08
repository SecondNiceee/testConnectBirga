import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeMenuActive } from "../../store/menuSlice";
import { motion } from "framer-motion";

import Dimond from "../../images/icons/Dimond.svg";
import ArrowRight from "../../images/icons/rightArrow.svg";
import Pencel from "../../components/UI/Pencel/Pencel";
import icon from "../../images/icons/icon.svg";
import orangeWallet from "../../images/icons/OrangeWallet.svg";
import Subtract from "../../images/icons/SubtractWhite.svg";
import greyArrowRight from "../../images/icons/greyArrowRight.svg";
import Burger from "../../components/UI/Burger/Burger";
import { Link, useNavigate } from "react-router-dom";
import BackButton from "../../constants/BackButton";
import AboutMe from "../../components/UI/AboutMe/AboutMe";
import TextAboutMe from "../../components/UI/AboutMeText/TextAboutMe";

let scrollTo = 0;
const variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.4 },
};

const Profile = () => {
  const dispatch = useDispatch();

  const setMenuActive = (arg) => {
    dispatch(changeMenuActive(arg));
  };

  const [name, setName] = useState("Твое имя");

  const [aboutU, setAboutU] = useState("18,Москва");

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

  const userInfo = useSelector(state => state.telegramUserInfo)
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

      <img src={userInfo.photo} className="profile__icon" alt="" />

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
            <img src={orangeWallet} className="orangeWallet" alt="" />
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
            <img src={orangeWallet} className="orangeWallet" alt="" />
            <p>Тарифы</p>
          </div>
          <img src={ArrowRight} className="arrowRight" alt="" />
        </div>
        <div className="option">
          <div className="option__left">
            <img src={orangeWallet} className="orangeWallet" alt="" />
            <p>Уведомления</p>
          </div>
          <img className="arrowRight" src={ArrowRight} alt="" />
        </div>
        <div className="option">
          <div className="option__left">
            <img src={orangeWallet} className="orangeWallet" alt="" />
            <p>О себе и примеры работ</p>
          </div>
          <img className="arrowRight" src={ArrowRight} alt="" />
        </div>
        <div className="option">
          <div className="option__left">
            <img src={orangeWallet} className="orangeWallet" alt="" />
            <p>Подписка за задания</p>
          </div>
          <img className="arrowRight" src={ArrowRight} alt="" />
        </div>
        <div className="option">
          <div className="option__left">
            <img src={orangeWallet} className="orangeWallet" alt="" />
            <p>Шаблоны откликов</p>
          </div>
          <img className="arrowRight" src={ArrowRight} alt="" />
        </div>
      </div>

      <div className="profile__about-me">
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
      </div>

      <div className="profile__works">
        <p>Выполняемые работы</p>
        <p>Дизайн</p>
        <p>Пока нет выполненых работ</p>
      </div>

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
