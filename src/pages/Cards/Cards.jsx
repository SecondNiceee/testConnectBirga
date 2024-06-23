import React, { useCallback, useEffect, useState } from "react";
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
import { addCard } from "../../store/telegramUserInfo";
let localCardSetting;
let mainLocalErrors ;
let inputObject = {
  text : ''
}
const Cards = ({ setCardsOpen, setAboutU, aboutU , save  }) => {

  
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
  });
  const [modalActive , setModalActive] = useState(false)

  const [isCategoryChoiceOpen, setCatagoryChoiceOpen] = useState(false);


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


      if (Object.values(mainLocalErrors).includes(true)){
        setErrors(localErrors)
      }





      
      if (!Object.values(localErrors).every(value => value === false))
        {
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





  const backFunc = useCallback( () => {
    document.documentElement.style.overflow = "auto";
    setCardsOpen(false);
  } , [setCardsOpen] )

  const saveFunc = useCallback( () => {
    if (checkMistakes()) {
      setAboutU({ ...aboutU, cards: [...aboutU.cards, localCardSetting] });
      dispatch(addCard(localCardSetting));
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
  } , [dispatch, setCardsOpen, aboutU, setAboutU] )
  useEffect( () => {            
    MainButton.setText("Добавить кейс");
    BackButton.show()
    if (!modalActive){
      MainButton.show()
      MainButton.onClick(saveFunc);
      BackButton.onClick(backFunc);
    }
    else{
      MainButton.hide()
      BackButton.offClick(saveFunc)
    }
    return () => {
        MainButton.offClick(saveFunc)
        BackButton.offClick(backFunc);
        MainButton.onClick(save)
        MainButton.setText('Сохранить')
        
      };
  }, [modalActive, backFunc, save, saveFunc] )






  return (
    <div className="cards">
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
        <ModalInput setModal={setModalActive} setting={inputObject} />
      </CSSTransition>


      <CSSTransition
        classNames={"modal"}
        in={isCategoryChoiceOpen}
        timeout={0}
        mountOnEnter
        unmountOnExit
      >
          <ChoiceCategory
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
