import React, { useEffect, useState } from "react";
import TaskName from "../../components/UI/TaskName/TaskName";
import DescriptionAndPhoto from "../../components/UI/DescriptionAndPhoto/DescriptionAndPhoto";
import behanceIcon from "../../images/icons/behance.svg";
import dripleIcon from "../../images/icons/Dribble.svg";
import dropfileIcon from "../../images/icons/Dropfile.svg";
import BackButton from "../../constants/BackButton";
import MainButton from "../../constants/MainButton";
import { useDispatch } from "react-redux";
import { addCard } from "../../store/profile";
import { color } from "framer-motion";
import { CSSTransition } from "react-transition-group";
import ModalInput from "../../components/UI/ModalInput/ModalInput";
let localCardSetting;
let mainLocalErrors ;
let inputObject = {
  text : ''
}
const Cards = ({ setCardsOpen, setAboutU, aboutU , save }) => {
  const [cardsSetting, setCardsSetting] = useState({
    title: "",
    description: "",
    photos: [],
    behanceLink: "",
    dribbbleLink: "",
    dropfileLink: "",
  });

  const [update , setUpdate] = useState(null)

  const [errors, setErrors] = useState({
    nameError: false,
    fileError: false,
  });
  const [modalActive , setModalActive] = useState(false)
  mainLocalErrors = errors
  

  useEffect(() => {
      let photos = false;
      let title = false;
      if (cardsSetting.title.length < 3) {
        title = true;
      }
      if (cardsSetting.photos.length < 1) {
        photos = true;
      }
      let localErrors = { nameError: title, fileError: photos };

      console.log(Object.values(mainLocalErrors))
      console.log(Object.values(mainLocalErrors).includes(true))
      if (Object.values(mainLocalErrors).includes(true)){
        setErrors(localErrors)
      }





      
      if (!Object.values(localErrors).every(value => value === false))
        {
            console.log('хай хай')
            MainButton.setParams({
                color : "#2f2f2f",
                text_color : "#606060",
                is_visible : true
            })
        }
      else{
        MainButton.setParams({
            color : "#2EA6FF",
            text_color : "#ffffff",
            is_visible : true
        })
      }
    

    
  }, [cardsSetting.title, cardsSetting.photos]);




  localCardSetting = cardsSetting;

  function checkMistakes() {
    let fileError = false;
    let titleError = false;

    if (localCardSetting.title.length < 3) {
      titleError = true;
    }
    if (localCardSetting.photos.length < 1) {
      fileError = true;
    }
    setErrors({ fileError: fileError, nameError: titleError });
    let localErrors = { fileError: fileError, nameError: titleError };

    return Object.values(localErrors).every((value) => value === false);
  }




  function saveFunc() {
    if (checkMistakes()) {
      console.log("попал сюда..");
      setAboutU({ ...aboutU, cards: [...aboutU.cards, localCardSetting] });
    //   dispatch(addCard(localCardSetting));
      document.documentElement.style.overflow = "auto";
      setCardsOpen(false);
      setAboutU({ ...aboutU, cards: [...aboutU.cards, localCardSetting] });
    }
    console.log("я тут");
  }



  function backFunc() {
      document.documentElement.style.overflow = "auto";
      setCardsOpen(false);
  }

  useEffect(() => {
    MainButton.show();
    BackButton.show()
  } )
  useEffect( () => {
    MainButton.setText("Добавить кейс");
    MainButton.onClick(saveFunc);
    BackButton.onClick(backFunc);
    return () => {
        MainButton.offClick(saveFunc)
        MainButton.onClick(save)
        MainButton.setText('Сохранить')
        BackButton.offClick(backFunc);
        
      };
  }, [] )


  console.log('рендер')

  return (
    <div className="cards">
      <h3 className="cards-title">Новый кейс</h3>

      {/* <button onClick={() => {
                                setAboutU({...aboutU, cards : [...aboutU.cards , cardsSetting] })
                                dispatch(addCard(cardsSetting))
                                setCardsOpen(false)

            }}>Сохранить</button> */}
      <TaskName
        placeholder={"Придумайте название для нового кейса"}
        className={"cards-taskName"}
        title={"НАЗВАНИЕ КЕЙСА"}
        text={cardsSetting.title}
        description={cardsSetting.description}
        setText={(e) => {
          setCardsSetting({ ...cardsSetting, title: e });
        }}
        errorValue={errors.nameError}
        underText={""}
      />

      <DescriptionAndPhoto
        fileError={errors.fileError}
        className={"cards-descriptionAndPhoto"}
        text={cardsSetting.description}
        textPlaceholder={"Опишите в чем особенность ваших работ"}
        setText={(e) => {
          setCardsSetting({ ...cardsSetting, description: e });
        }}
        setPhotos={(e) => {
          setCardsSetting({ ...cardsSetting, photos: e });
        }}
        photos={cardsSetting.photos}
        MyInformation={false}
        textTitle={"ОПИСАНИЕ КЕЙСА"}
        filesTitle={""}
      />
      <button onClick={saveFunc}>Сохранить</button>
      <p className="cards-underText">
        Расскажите о себе и своем опыте работы Прикрепите релевантные примеры
      </p>

      <div className="cards-links">
        <div className="behans-link cards-link" onClick={
          () => {
            inputObject = {
              text : cardsSetting.behanceLink,
              setText : function(e){
                console.log(this.text)
                setCardsSetting({...cardsSetting , behanceLink : e})
              },
              placeholder : 'Введите ссылку на behance',
            }
            setModalActive(true)
          }
        }>
          <img src={behanceIcon} alt="" />
          <p>{localCardSetting.behanceLink.length > 0 ? localCardSetting.behanceLink : 'Ссылка на Behance'}</p>
        </div>
        <div className="behans-link cards-link" onClick={
          () => {
            inputObject = {
              text : cardsSetting.behanceLink,
              setText : function(e){
                console.log(this.text)
                setCardsSetting({...cardsSetting , dribbbleLink : e})
              },
              placeholder : 'Введите ссылку на Behance',
            }
            setModalActive(true)
          }
        }>
          <img src={dripleIcon} alt="" />
          <p>{localCardSetting.dribbbleLink.length > 0 ? localCardSetting.dribbbleLink : 'Ссылка на Dribbble'}</p>
        </div>
        <div className="behans-link cards-link" onClick={
          () => {
            inputObject = {
              text : cardsSetting.behanceLink,
              setText : function(e){
                console.log(this.text)
                setCardsSetting({...cardsSetting , dropfileLink : e})
              },
              placeholder : 'Введите ссылку на Dribbble',
            }
            setModalActive(true)
          }
        }>
          <img src={dropfileIcon} alt="" />
          <p>{cardsSetting.dropfileLink.length > 0 ? cardsSetting.dropfileLink : 'Ссылка на Dprofile'}</p>
        </div>
      </div>

      <CSSTransition
              mountOnEnter
              unmountOnExit
              classNames={'cardsModal'}
              in = {modalActive}
              timeout={0}
      >
        <ModalInput setModal={setModalActive} setting={inputObject} />
      </CSSTransition>
    </div>

    
  );
};

export default Cards;
