import React, { useEffect, useState } from "react";
import TaskName from "../../components/UI/TaskName/TaskName";
import DescriptionAndPhoto from "../../components/UI/DescriptionAndPhoto/DescriptionAndPhoto";
import behanceIcon from "../../images/icons/behance.svg";
import dripleIcon from "../../images/icons/Dribble.svg";
import dropfileIcon from "../../images/icons/Dropfile.svg";
import BackButton from "../../constants/BackButton";
import MainButton from "../../constants/MainButton";
import { useDispatch, useSelector } from "react-redux";
import { addCard, changeCards } from "../../store/profile";
import { CSSTransition } from "react-transition-group";
import ModalInput from "../../components/UI/ModalInput/ModalInput";
import Categories from "../AdCreatingOne/Categories/Categories";
import ChoiceCategory from "../AdCreatingOne/ChoiceCategory/ChoiceCategory";

let localCardSetting;
let mainLocalErrors;
let inputObject = {
  text: "",
};
const ChangeCards = ({save, setCardsOpen, setAboutU, index, card, aboutU }) => {
  const [cardsSetting, setCardsSetting] = useState(card);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({
    nameError: false,
    fileError: false,
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
    if (cardsSetting.title.length < 3) {
      title = true;
    }
    if (cardsSetting.photos.length < 1) {
      photos = true;
    }
    let localErrors = { nameError: title, fileError: photos };

    console.log(Object.values(mainLocalErrors));
    console.log(Object.values(mainLocalErrors).includes(true));
    if (Object.values(mainLocalErrors).includes(true)) {
      setErrors(localErrors);
    }

    if (!Object.values(localErrors).every((value) => value === false)) {
      console.log("хай хай");
      MainButton.setParams({
        color: "#2f2f2f",
        text_color: "#606060",
        is_visible: true,
      });
    } else {
      MainButton.setParams({
        color: "#2EA6FF",
        text_color: "#ffffff",
        is_visible: true,
      });
    }
  }, [cardsSetting.title, cardsSetting.photos]);

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
      setAboutU({
        ...aboutU,
        cards: [
          ...aboutU.cards.map((e, i) => {
            if (i === index) {
              return localCardSetting;
            } else {
              return e;
            }
          }),
        ],
      });
      dispatch(changeCards({ id: index, card: localCardSetting }));
      document.documentElement.style.overflow = "auto";
      setCardsOpen(false);
    }
  }

  function backFunc() {
    document.documentElement.style.overflow = "auto";
    setCardsOpen(false);
  }




  useEffect(() => {
      
    MainButton.show();
    MainButton.setText("Изменить кейс");
    BackButton.show();
    MainButton.onClick(saveFunc);
    BackButton.onClick(backFunc);
    return () => {
        MainButton.offClick(saveFunc)
        BackButton.offClick(backFunc);
        MainButton.onClick(save)
        MainButton.setText('Сохранить')

    };
}, []);
  console.log(localCardSetting)
  return (
    <div className="cards">
      <h3 className="cards-title">{cardsSetting.title}</h3>

       <Categories className={'cards-categorys'} categoryOnly={true}  taskInformation={localCardSetting} setCatagoryChoiceOpen={setCatagoryChoiceOpen}  />

      <button
        onClick={() => {
          saveFunc();
        }}
      >
        Сохранить
      </button>
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
              text: cardsSetting.behanceLink,
              setText: function (e) {
                setCardsSetting({ ...cardsSetting, behanceLink: e });
              },
              placeholder: "Введите ссылку на behance",
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
              placeholder: "Ссылка на Dribbble",
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
        <div
          className="behans-link cards-link"
          onClick={() => {
            inputObject = {
              text: cardsSetting.dropfileLink,
              setText: function (e) {
                setCardsSetting({ ...cardsSetting, dropfileLink: e });
              },
              placeholder: "Введите ссылку на Dropfile",
            };
            setModalActive(true);
          }}
        >
          <img src={dropfileIcon} alt="" />
          <p>
            {cardsSetting.dropfileLink.length > 0
              ? cardsSetting.dropfileLink
              : "Ссылка на Dprofile"}
          </p>
        </div>
      </div>
      <CSSTransition
        mountOnEnter
        unmountOnExit
        classNames={"cardsModal"}
        in={modalActive}
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

export default ChangeCards;
