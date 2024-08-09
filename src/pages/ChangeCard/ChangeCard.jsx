import React, { useEffect, useRef, useState } from "react";
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
import ChoiceCategory from "../AdCreatingOne/ChoiceCategory/ChoiceCategory";
import { putCard } from "../../store/telegramUserInfo";
import sortFiles from "../../functions/sortFiles";

let localCardSetting;
let mainLocalErrors;
let inputObject = {
  text: "",
};
let cardStart;
const ChangeCards = ({save, setCardsOpen, setAboutU, index, card, aboutU }) => {


  useEffect( () => {
    document.documentElement.style.overflow = 'hidden'
    return () => {
       document.documentElement.style.overflow = 'auto'
    }
  } , [] )
  useEffect(  () => {

    cardStart =  Object.assign({}, card);
  } , [])

  const [cardsSetting, setCardsSetting] = useState(Object.assign({}, card));

  console.log(cardsSetting)
  console.log(card)
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({
    nameError: false,
    fileError: false,
    descriptionError : false
  });

  const [modalActive, setModalActive] = useState(false);

  const [isCategoryChoiceOpen, setCatagoryChoiceOpen] = useState(false);

  const subCategorys = useSelector((state) => state.categorys.subCategory);

  const categorys = useSelector((state) => state.categorys.category);

  localCardSetting = cardsSetting;
  mainLocalErrors = errors;

  useEffect(() => {
    let photos = false;
    let title = false;
    let description = false
    if (cardsSetting.title.length < 3) {
      title = true;
    }
    if (cardsSetting.photos.length < 1) {
      photos = true;
    }
    if (cardsSetting.description.length > 500){
      description = true
    }
    let localErrors = { nameError: title, fileError: photos , descriptionError : description };

    if (Object.values(mainLocalErrors).includes(true)) {
      setErrors(localErrors);
    }

    if (!Object.values(localErrors).every((value) => value === false)) {
      if (!modalActive && !isCategoryChoiceOpen){
        MainButton.setParams({
          color: "#2f2f2f",
          text_color: "#606060",
          is_visible: true,
        });
      }
    } else {
      if(!modalActive && !isCategoryChoiceOpen){
        MainButton.setParams({
          color: "#2EA6FF",
          text_color: "#ffffff",
          is_visible: true,
        });
      }
    }
  }, [cardsSetting.title, cardsSetting.photos, cardsSetting.description, modalActive, isCategoryChoiceOpen]);



  
  
  

  const mainRef = useRef(null)


  useEffect(() => {


    function checkMistakes() {
      let fileError = false;
      let titleError = false;
      let descriptionError = false;
  
      if (localCardSetting.title.length < 3) {
        titleError = true;
      }
      if (localCardSetting.photos.length < 1) {
        fileError = true;
      }
      if (localCardSetting.description.length > 500){
        window.Telegram.WebApp.showAlert("У вашего описания более 500 символов")
        descriptionError = true
      }
      setErrors({ fileError: fileError, nameError: titleError, descriptionError : descriptionError });
      let localErrors = { fileError: fileError, nameError: titleError, descriptionError : descriptionError };
      return Object.values(localErrors).every((value) => value === false);
    }


    
  function saveFunc() {
    if (checkMistakes()) {
      // setAboutU({
      //   ...aboutU,
      //   cards: [
      //     ...aboutU.cards.map((e, i) => {
      //       if (i === index) {
      //         return localCardSetting;
      //       } else {
      //         return e;
      //       }
      //     }),
      //   ],
      // });
      
      let myFormData = new FormData()
      myFormData.append("title" , localCardSetting.title)
      myFormData.append("description" , localCardSetting.description)
      myFormData.append("behance" , localCardSetting.behanceLink)
      myFormData.append("dribble" , localCardSetting.dribbbleLink)
      myFormData.append("dropFile" , localCardSetting.dropfileLink)
      
      let files = sortFiles(cardsSetting.photosNames , cardsSetting.photos)
      console.warn(files)
      files.addedArr.forEach((e,i) => {
        myFormData.append(`addFiles` , e)
      })
      files.removedArr.forEach( (e, i )  => {
        myFormData.append(`deleteFiles[${i}]` , e)
      })
      console.log(cardsSetting)
      dispatch(putCard([myFormData, localCardSetting.id, cardsSetting]))
      // localCardSetting.photos.forEach(e => {
      //   myFormData.append('photos' , e)
      // })

      // dispatch(changeCards({ id: index, card: localCardSetting }));
      // document.documentElement.style.overflow = "auto";
      setCardsOpen(false);
    }
    else{
      window.Telegram.WebApp.HapticFeedback.notificationOccurred("error")
    }
  }
                                      
    function compareTwo(a1 ,a2){
      if (JSON.stringify(a1) !== JSON.stringify(a2)){
          return false 
      }
      if (a1.photos.length !== a2.photos.length ){
        return false
      }
      for (let i = 0; i < a1.photos.length;i++){
        if (a1.photos[i].name !== a2.photos[i].name){
          return false
        }
      }
      return true
    }
    
    function backFunc() {
      if (!compareTwo(cardsSetting, cardStart)){

        window.Telegram.WebApp
        .showPopup({
          title: "Изменить?",
          message: `Изменить этот кейс?`,
          buttons: [
            { id: "save", type: "default", text: "Да" },
            { id: "delete", type: "destructive", text: "Нет" },
          ],
        } , (buttonId) => {
    
          if (buttonId === "delete" ) {
            setCardsOpen(false);                                                                                            
          }
          if (buttonId === "save") {
            if (checkMistakes()){
              saveFunc()
            }
            else{
              window.Telegram.WebApp.HapticFeedback.notificationOccurred("error")
            }
          }
    
    
        } )


      }
      else{
        setCardsOpen(false);  
      }
      // document.documentElement.style.overflow = "auto";
    }

    
    MainButton.setText("Изменить кейс");
    if (!modalActive && !isCategoryChoiceOpen){
      mainRef.current.style.overflow = "scroll"
      MainButton.show()
      MainButton.onClick(saveFunc);
      BackButton.onClick(backFunc);
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
       

    };

}, [modalActive , isCategoryChoiceOpen, cardsSetting ,dispatch, setCardsOpen ]);

  useEffect( () => {
    return () => {
      MainButton.setText('Сохранить')
    }
  } , [] )
  return (
    <div ref={mainRef} className="cards">
      <h3 className="cards-title">{cardsSetting.title}</h3>

    


      <TaskName
        placeholder={"Придумайте название для  кейса"}
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
        className={"cards-descriptionAndPhoto"}
        text={cardsSetting.description}
        textPlaceholder={"Опишите в чем особенность ваших работ"}
        setText={(e) => {
          setCardsSetting({ ...localCardSetting, description: e });
        }}
        setPhotos={(e) => {
          setCardsSetting({ ...localCardSetting, photos: e });
        }}
        photos={cardsSetting.photos}
        MyInformation={false}
        textTitle={"ОПИСАНИЕ КЕЙСА"}
        filesTitle={""}
        fileError={errors.fileError}
      />
      <p className="cards-underText">
        Расскажите о себе и своем опыте работы Прикрепите релевантные примеры
      </p>






      <div className="cards-links">

      <div
          className="behans-link cards-link"
          onClick={() => {
            inputObject = {
              text: cardsSetting.dropfileLink,
              setText: function (e) {
                setCardsSetting({ ...cardsSetting, dropfileLink: e });
              },
              placeholder: "Вставьте ссылку на Dropfile",
            };
            setModalActive(true);
          }}
        >
          <img src={dropfileIcon} alt="" />
          <p>
            {cardsSetting.dropfileLink.length > 0
              ? cardsSetting.dropfileLink
              : "Ccылка на Dropfile"}
          </p>
      </div>

        <div
          className="behans-link cards-link"
          onClick={() => {
            inputObject = {
              text: cardsSetting.behanceLink,
              setText: function (e) {
                setCardsSetting({ ...cardsSetting, behanceLink: e });
              },
              placeholder: "Вставте ссылку на кейс в Behance",
            };
            setModalActive(true);
          }}
        >
          <img src={behanceIcon} alt="" />
          <p>
            {cardsSetting.behanceLink.length > 0
              ? cardsSetting.behanceLink
              : "Ссылка на Behance"}
          </p>
        </div>
        <div
          className="behans-link cards-link"
          onClick={() => {
            inputObject = {
              text: cardsSetting.dribbbleLink,
              setText: function (e) {
                setCardsSetting({ ...cardsSetting, dribbbleLink: e });
              },
              placeholder: "Вставте ссылку на кейс в Dribble",
            };
            setModalActive(true);
          }}
        >
          <img src={dripleIcon} alt="" />
          <p>
            {cardsSetting.dribbbleLink.length > 0
              ? cardsSetting.dribbbleLink
              : "Ссылка на Dribbble"}
          </p>
        </div>



      </div>
      <CSSTransition
        mountOnEnter
        unmountOnExit
        classNames={"inputModal"}
        in={modalActive}
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

export default ChangeCards;
