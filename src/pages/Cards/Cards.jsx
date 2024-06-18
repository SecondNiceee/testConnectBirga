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
let localCardSetting;
const Cards = ({ setCardsOpen, setAboutU, aboutU , save }) => {
  const [cardsSetting, setCardsSetting] = useState({
    title: "",
    description: "",
    photos: [],
    behanceLink: "",
    dribbbleLink: "",
    dropfileLink: "",
  });
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({
    nameError: false,
    fileError: false,
  });

  useEffect(() => {
    if (!Object.values(errors).every((value) => value === false)) {
      let photos = false;
      let title = false;
      if (cardsSetting.title.length < 3) {
        title = true;
      }
      if (cardsSetting.photos.length < 1) {
        photos = true;
      }
      let localErrors = { nameError: title, fileError: photos };
      if (JSON.stringify({ localErrors }) !== JSON.stringify(errors)) {
        setErrors(localErrors);
      }
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
      setCardsOpen(false);
  }

  useEffect( () => {
    MainButton.show();
    MainButton.setText("Добавить кейс");
    MainButton.onClick(saveFunc);
    BackButton.show();
    BackButton.onClick(backFunc);
    return () => {
        MainButton.offClick(saveFunc)
        MainButton.onClick(save)
        MainButton.setText('Сохранить')
        BackButton.offClick(backFunc);
        
      };
  } )

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
        <div className="behans-link cards-link">
          <img src={behanceIcon} alt="" />
          <p>Ссылка на Behance</p>
        </div>
        <div className="behans-link cards-link">
          <img src={dripleIcon} alt="" />
          <p>Ссылка на Dribbble</p>
        </div>
        <div className="behans-link cards-link">
          <img src={dropfileIcon} alt="" />
          <p>Ссылка на Dropfile</p>
        </div>
      </div>
    </div>
  );
};

export default Cards;
