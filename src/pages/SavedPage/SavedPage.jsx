import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import Top from "../../components/UI/Top/Top";
import useListner from "../../hooks/useListner";
import { useDispatch, useSelector } from "react-redux";
import { changeMenuActive } from "../../store/menuSlice";
import FullPicker from "../../components/UI/FullPicker/FullPicker";
import Choicer from "../../components/SavedPage/Choicer/Choicer";
import { CSSTransition } from "react-transition-group";
import FirstDetails from "../../components/First/FirstDetails/FirstDetails";
import Responce from "../First/Responce";
import MainButton from "../../constants/MainButton";
import BackButton from "../../constants/BackButton";
import axios from "axios";
import { addResponce } from "../../store/information";
import pagesHistory from "../../constants/pagesHistory";
import SavedResponse from "../../components/SavedPage/SavedReponse/SavedResponse";
import SavedProfile from "../../components/SavedPage/SavedProfile/SavedProfile";
import CardPage from "../CardPage/CardPage";

const values = ["Заказы", "Отклики", "Кейсы"];
const keys = ["advertisment", "responces", "cards"];
const SavedPage = () => {
  const savedResponces = useSelector((state) => state.saves.responces);

  useEffect(() => {
    return () => {
      pagesHistory.push("/SavedPage");
    };
  }, []);

  const [card, setCard] = useState({
    isOpen: false,
    card: {
      behanceLink : "",
      description : "",
      dribbbleLink : "",
      id : 0,
      photos : [],
      photosNames : [],
      title : ""
    },
  });

  const [myResponse, setMyResponse] = useState({
    responce: {},
    isActive: false,
  });

  const [responce, setResponce] = useState({
    isOpen: false,
    text: "",
    photos: [],
    name: "привет",
    isShablonModalActive: false,
    shablonIndex: 0,
    isShablon: false,
    shablonMaker: false,
  });

  const isMenuActive = useSelector((state) => state.menu.value);
  const dispatch = useDispatch();
  const [nowKey, setNowKey] = useState("advertisment");

  const [isProfileOpen , setProfileOpen] = useState(false)

  const GreyIntWidth = useMemo(() => {
    return (document.documentElement.clientWidth - 36) / 3;
  }, []);
  const GreyWidth = useMemo(() => {
    return GreyIntWidth.toString() + "px";
  }, [GreyIntWidth]);

  const [details, setDetails] = useState({
    isOpen: false,
    id: 0,
  });
  const [extraDetails, setExtraDetails] = useState({
    isOpen : false,
    id : 0
    })
  const setMenuActive = useCallback(
    (set) => {
      dispatch(changeMenuActive(set));
    },
    [dispatch]
  );

  const savedTasks = useSelector((state) => state.saves.tasks);

  const gotIt = useMemo(() => {
    if (
      savedTasks !== null &&
      savedTasks.length > 0 &&
      savedTasks[details.id]
    ) {
      console.log(savedTasks[details.id]);
      if (savedTasks[details.id].responces) {
        console.log("ХАААААААААААа");
        // if (savedTasks[details.id].responces.find(e => e.user.id === "2144832745")){
        //   return true
        // }
        // else{
        //   return false
        // }
      }
    }
    return false;
  }, [savedTasks, details.id]);

  useEffect(() => {
    // setStep(varStep)
    // setDetailsActive({...isDetailsActive , isOpen : isDetailsActiveVar})
    if (details.isOpen) {
      BackButton.show();
    }
  }, [details.isOpen]);

  useEffect(() => {
    function forward() {
      if (gotIt) {
        window.Telegram.WebApp.showPopup({
          title: "Ошибка",
          message:
            "Вы уже откликнулись на это задание. Заказчик обязательно увидит ваш отклик.",
        });
      } else {
        if (!responce.isOpen) {
          setResponce((value) => ({ ...value, isOpen: true }));
        }
      }
    }

    function back() {
      if (false) {
        // setSliderActive({...sliderActive, isActive : false})
      } else {
        if (responce.isShablonModalActive) {
          setResponce((responce) => ({
            ...responce,
            isShablonModalActive: false,
          }));
        } else {
          if (responce.shablonMaker) {
            setResponce((responce) => ({ ...responce, shablonMaker: false }));
          } else {
            if (responce.isOpen) {
              setResponce((value) => ({ ...value, isOpen: false }));
            } else {
              setDetails((value) => ({ ...value, isOpen: false }));
            }
          }
        }
      }
    }

    MainButton.onClick(forward);
    BackButton.onClick(back);
    if (details.isOpen) {
      BackButton.show();
      MainButton.show();

      if (gotIt) {
        MainButton.setParams({
          //неизвесетно
          color: "#2f2f2f",
          text_color: "#606060",
        });
      } else {
        console.log("Я БЫЛ ТУТ");
        if (!responce.isOpen) {
          MainButton.setParams({
            is_active: true,
            color: "#2ea5ff",
            text_color: "#ffffff",
          });
        }
      }
    } else {
      console.log("Я даун");
      BackButton.hide();
      MainButton.hide();
      MainButton.offClick(forward);
      BackButton.offClick(back);
      MainButton.setParams({
        is_active: true,
        color: "#2ea5ff",
        text_color: "#ffffff",
      });
    }
    return () => {
      MainButton.offClick(forward);
      BackButton.offClick(back);
    };
  }, [
    details.isOpen,
    responce.isOpen,
    gotIt,
    responce.isShablonModalActive,
    responce.shablonMaker,
  ]);

  useEffect( () => {
      function backFunction(){
          if (card.isOpen){
            console.log("Я закрыл карточки")
            setCard((value) => ({...value , isOpen : false}))
          }
          else{
            
            if (isProfileOpen){
              console.log("Я закрыл профиль")
              setProfileOpen(false)
            }
            else{
              if (extraDetails.isOpen){
                setExtraDetails((value) => ({...value , isOpen : false}))
              }
              else{
                if (myResponse.isActive){
                  setMyResponse((value) => ({...value , isActive : false}))
                }
              }
            }
          }
      }
      if (myResponse.isActive){
        BackButton.show()
        console.log("Я тут!")
        BackButton.onClick(backFunction)
      }
      else{
        console.log("Я вообще - то тут((!")
        BackButton.hide()
        BackButton.offClick(backFunction)
      }
  } , [myResponse.isActive, isProfileOpen, card.isOpen, setMyResponse, setProfileOpen, extraDetails.isOpen, setCard] )

  useEffect(() => {
    if (details.isOpen) {
      MainButton.setText("ОТКЛИКНУТЬСЯ");
    }
  }, [details.isOpen]);

  useEffect(() => {
    if (responce.text.length < 3 && responce.isOpen) {
      MainButton.setParams({
        is_active: false, //неизвесетно
        color: "#2f2f2f",
        text_color: "#606060",
      });
    } else {
      if (responce.isOpen) {
        console.warn("я тут");
        MainButton.setParams({
          color: "#2ea5ff",
          text_color: "#ffffff",
          is_active: true,
        });
      }
    }
  }, [responce.text, responce.isOpen]);

  const forwardFunction = useCallback(() => {
    async function postResponce(advertismetId, userId) {
      let myFormData = new FormData();
      myFormData.append("information", responce.text);

      myFormData.append("userId", userId);
      myFormData.append("advertismentId", advertismetId);

      responce.photos.forEach((e, i) => {
        myFormData.append(`photos`, e);
      });
      try {
        let im = await axios.post(
          "https://back-birga.ywa.su/response",
          myFormData,
          {
            params: {
              userId: userId,
              advertisementId: advertismetId,
            },
          }
        );
        await axios.get("https://back-birga.ywa.su/user/sendMessage", {
          params: {
            chatId: im.data.user.chatId,
            text:
              '📣 Вы получили отклик на задачу "' +
              savedTasks[details.id].taskName.bold() +
              '" от' +
              im.data.user.fl,
          },
        });
        dispatch(addResponce([savedTasks[details.id].id, im.data]));
      } catch (e) {
        alert("ничего не вышло");
        console.warn(e);
      }
    }

    if (responce.isOpen && !responce.shablonMaker) {
      window.Telegram.WebApp.showPopup(
        {
          title: "Откликнуться?",
          message: "Вы действительно хотите откликнуться?",
          buttons: [
            { id: "save", type: "default", text: "Да" },
            { id: "delete", type: "destructive", text: "Нет" },
          ],
        },
        (buttonId) => {
          if (buttonId === "delete" || buttonId === null) {
            // setShablon({...shablon , isActive : false})
          }
          if (buttonId === "save") {
            postResponce(savedTasks[details.id].id, 2144832745);
            setResponce((value) => ({ ...value, isOpen: false }));
            setDetails((value) => ({ ...value, isOpen: false }));
          }
        }
      );
    }
  }, [responce, savedTasks, details.id, dispatch]);

  useEffect(() => {
    MainButton.onClick(forwardFunction);
    return () => {
      MainButton.offClick(forwardFunction);
    };
  }, [forwardFunction]);


  const openCard = useCallback(
    (card) => {
      setCard({ isOpen: true, card: card });
    },
    [setCard]
  );

  useListner({
    isMenuActive,
    setMenuActive,
    // setDetailsActive,
    // isDetailsActive,
  });
  console.log(details);
  return (
    <div className="saved-wraper">
      <Top
        setMenuActive={setMenuActive}
        name={"Сохраненное"}
        className={"saved-top-wrapper"}
      />
      <FullPicker
        GreyIntWidth={GreyIntWidth}
        GreyWidth={GreyWidth}
        nowKey={nowKey}
        setNowKey={setNowKey}
        values={values}
        keys={keys}

      />

      <Choicer setResponce = {setMyResponse} setDetails={setDetails} keys={keys} nowKey={nowKey} />

      <CSSTransition
        in={myResponse.isActive}
        timeout={400}
        unmountOnExit
        mountOnEnter
        classNames={"left-right"}
      >
        <SavedResponse setDetails = {setExtraDetails} setProfileOpen = {setProfileOpen} response={myResponse.responce} />
      </CSSTransition>
      
      <CSSTransition
        in={isProfileOpen}
        classNames={"left-right"}
        timeout={400}
        unmountOnExit
        mountOnEnter
      >
            <SavedProfile openFunc={openCard}  responce={myResponse.responce} />
      </CSSTransition>
      

      <CSSTransition
        in={extraDetails.isOpen}
        timeout={400}
        classNames={"left-right"}
        unmountOnExit
        mountOnEnter
      >
        <FirstDetails style = {{
          zIndex : '2002'
        }}  orderInformation={myResponse.responce.advertisement} />
      </CSSTransition>

      <CSSTransition
        in={details.isOpen}
        timeout={400}
        classNames={"left-right"}
        unmountOnExit
        mountOnEnter
      >
        <FirstDetails orderInformation={savedTasks[details.id]} />
      </CSSTransition>

      <CSSTransition
        in={responce.isOpen}
        timeout={400}
        classNames={"left-right"}
        unmountOnExit
        mountOnEnter
      >
        <div className="response-block">
          <Responce
            
            left="0%"
            responce={responce}
            setResponce={setResponce}
            orderInformation={savedTasks[details.id]}
          />
        </div>
      </CSSTransition>

      <CSSTransition
        in={card.isOpen}
        classNames={"left-right"}
        timeout={400}
        unmountOnExit
        mountOnEnter
      >
        <CardPage card={card.card} />
      </CSSTransition>
    </div>
  );
};

export default memo(SavedPage);
