import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import TaskName from "../../components/UI/TaskName/TaskName";
import DescriptionAndPhoto from "../../components/UI/DescriptionAndPhoto/DescriptionAndPhoto";
import behanceIcon from "../../images/icons/behance.svg";
import dripleIcon from "../../images/icons/Dribble.svg";
import dropfileIcon from "../../images/icons/Dropfile.svg";
import BackButton from "../../constants/BackButton";
import MainButton from "../../constants/MainButton";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
import ModalInput from "../../components/UI/ModalInput/ModalInput";
import Categories from "../AdCreatingOne/Categories/Categories";
import ChoiceCategory from "../AdCreatingOne/ChoiceCategory/ChoiceCategory";
import {  postCard } from "../../store/telegramUserInfo";
let localCardSetting;
let mainLocalErrors ;
let inputObject = {
  text : ''
}
const Cards = ({ setCardsOpen, setAboutU, aboutU , save  }) => {

  useEffect( () => {
    document.documentElement.style.overflow = 'hidden'
    return () => {
       document.documentElement.style.overflow = 'auto'
    }
  } , [] )

  
  const categorys = useSelector((state) => state.categorys.category);

  const subCategorys = useSelector((state) => state.categorys.subCategory);

  const dispatch = useDispatch()

  const [cardsSetting, setCardsSetting] = useState({
    title: "",
    description: "",
    photos: [],
    behanceLink: "",
    dribbbleLink: "",
    dropfileLink: "",
    category : categorys.find((e) => e.category === "Другое")
  });


  const [errors, setErrors] = useState({
    nameError: false,
    fileError: false,
    description : false,
  });
  const [modalActive , setModalActive] = useState(false)

  const [isCategoryChoiceOpen, setCatagoryChoiceOpen] = useState(false);


  mainLocalErrors = errors
  

  useEffect(() => {
      let photos = false;
      let title = false;
      let description = false;
      if (cardsSetting.title.length < 3) {
        title = true;
      }
      if (cardsSetting.photos.length < 1) {
        photos = true;
      }
      if (cardsSetting.description.length > 500){
        description = true
      }
      let localErrors = { nameError: title, fileError: photos, description : description };


      if (Object.values(mainLocalErrors).includes(true)){
        setErrors(localErrors)
      }





      
      if (!Object.values(localErrors).every(value => value === false))
        {
          if (!modalActive && !isCategoryChoiceOpen){

            MainButton.setParams({
                color : "#2f2f2f",
                text_color : "#606060",
                is_visible : true
            })
          }
        }
      else{
        if (!modalActive && !isCategoryChoiceOpen){

          MainButton.setParams({
              color : "#2EA6FF",
              text_color : "#ffffff",
              is_visible : true
          })
        }
      }
    

    
  }, [cardsSetting.title, cardsSetting.photos, cardsSetting.description, isCategoryChoiceOpen, modalActive]);




  localCardSetting = cardsSetting;

  function checkMistakes() {
    let fileError = false;
    let titleError = false;
    let description = false

    if (localCardSetting.title.length < 3) {
      titleError = true;
    }
    if (localCardSetting.photos.length < 1) {
      fileError = true;
    }
    if (localCardSetting.description > 500){
      description = true
    }
    setErrors({ fileError: fileError, nameError: titleError, description : description });
    let localErrors = { fileError: fileError, nameError: titleError, description : description };

    return Object.values(localErrors).every((value) => value === false);
  }







  const saveFunc = useCallback( () => {
    if (checkMistakes()) {
      setAboutU({ ...aboutU, cards: [...aboutU.cards, localCardSetting] });
      // dispatch(addCard(localCardSetting));


      let myFormData = new FormData()
      myFormData.append("categoryId", localCardSetting.category.id)
      myFormData.append("title" , localCardSetting.title)
      myFormData.append("description" , localCardSetting.description)
      myFormData.append("behance" , localCardSetting.behanceLink)
      myFormData.append("dribble" , localCardSetting.dribbbleLink)
      myFormData.append("dropFile" , localCardSetting.dropfileLink)

      localCardSetting.photos.forEach(e => {
        myFormData.append('photos' , e)
      })


      dispatch( postCard([myFormData , aboutU.userId, localCardSetting] ))
      document.documentElement.style.overflow = "auto";
      setCardsOpen(false);
    }
    else{
      MainButton.setParams({
        color : "#2f2f2f",
        text_color : "#606060",
        is_visible : true
    })
    }
  } , [dispatch, setCardsOpen, aboutU, setAboutU , cardsSetting] )


  const backFunc = useCallback( () => {
    // document.documentElement.style.overflow = "auto";
    
    window.Telegram.WebApp
    .showPopup({
      title: "Сохранить?",
      message: `Сохранить новый кейс?`,
      buttons: [
        { id: "save", type: "default", text: "Да" },
        { id: "delete", type: "destructive", text: "Нет" },
      ],
    } , (buttonId) => {

      if (buttonId === "delete" || buttonId === null) {
        setCardsOpen(false);
      }
      if (buttonId === "save") {
        saveFunc()
      }


    } )
  } , [setCardsOpen] )

  const mainRef = useRef(null)
  useEffect( () => {            
    MainButton.setText("Добавить кейс");
    BackButton.show()
    if (!modalActive && !isCategoryChoiceOpen){
      MainButton.show()
      MainButton.onClick(saveFunc);
      BackButton.onClick(backFunc);
      mainRef.current.style.overflow = "scroll"
    }
    else{
      mainRef.current.style.overflow = "hidden"
      MainButton.hide()
      BackButton.offClick(saveFunc)
    }
    return () => {
        // MainButton.hide()
        MainButton.offClick(saveFunc)
        BackButton.offClick(backFunc);
        // MainButton.onClick(save)
        MainButton.setText('Сохранить')
        
      };
  }, [modalActive, backFunc, save, saveFunc, isCategoryChoiceOpen] )





  return (
    <div className="cards" ref={mainRef}>
      <h3 className="cards-title">Новый кейс</h3>

      <Categories className='cards-categorys' categoryOnly={true}  taskInformation={localCardSetting} setCatagoryChoiceOpen={setCatagoryChoiceOpen}  />



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
              text : cardsSetting.dropfileLink,
              setText : function(e){
                setCardsSetting({...cardsSetting , dropfileLink : e})
              },
              placeholder : 'Вставте ссылку на кейс в Dropfile',
            }
            setModalActive(true)
          }
        }>
          <img src={dropfileIcon} alt="" />
          <p>{cardsSetting.dropfileLink.length > 0 ? cardsSetting.dropfileLink : 'Ссылка на Dprofile'}</p>
        </div>
        <div className="behans-link cards-link" onClick={
          () => {
            inputObject = {
              text : cardsSetting.behanceLink,
              setText : function(e){

                setCardsSetting({...cardsSetting , behanceLink : e})
              },
              placeholder : 'Вставте ссылку на кейс в Behance',
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
              text : cardsSetting.dribbbleLink,
              setText : function(e){
                setCardsSetting({...cardsSetting , dribbbleLink : e})
              },
              placeholder : 'Вставте ссылку на кейс в Dribble',
            }
            setModalActive(true)
          }
        }>
          <img src={dripleIcon} alt="" />
          <p>{localCardSetting.dribbbleLink.length > 0 ? localCardSetting.dribbbleLink : 'Ссылка на Dribbble'}</p>
        </div>

      </div>

      <CSSTransition
              mountOnEnter
              unmountOnExit
              classNames={'cardsModal'}
              in = {modalActive}
              timeout={0}
      >
        <ModalInput style = {mainRef.current && {top : String(mainRef.current.scrollTop) + "px"}}  setModal={setModalActive} setting={inputObject} />
      </CSSTransition>


      <CSSTransition
        classNames={"modal"}
        in={isCategoryChoiceOpen}
        timeout={0}
        mountOnEnter
        unmountOnExit
      >
          <ChoiceCategory
            isBackHide = {false}
            taskInformation={localCardSetting}
            setTaskInformation={setCardsSetting}
            setCatagoryChoiceOpen={setCatagoryChoiceOpen}
            categorys = {categorys}
            subCategorys={subCategorys}
          />
      </CSSTransition>


    </div>

    
  );
};

export default Cards;
