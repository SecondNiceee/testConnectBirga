import { useEffect } from "react";
import BackButton from "../../constants/BackButton";
import MainButton from "../../constants/MainButton";
import { useDispatch } from "react-redux";
import { setStartTask } from "../../store/information";
import { setStartResponse } from "../../store/responses";

export const useButton = ({
  setOpen,
  setSecondPage,
  navigate,
  setOpenAboutReaction,

  openAboutReaction,
  isOpen,
  
  details,
  secondPage,
  save,
  oneCards,
  setOneCard,
  detailsTwo,
  setDetailsTwo,
  myResponse,
  setMyResponse,
  lastAdsTwo,
  setLastAdsTwo
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(secondPage)
    function writeFucntion() {
      window.Telegram.WebApp.showPopup(
        {
          title: "Внимание",
          message: "Перед выбором исполнителя\n ознакомьтесь с FAQ Биржи.",
          buttons: [
            { id: "delete", type: "default", text: "Продолжить" },
            { id: "save", type: "destructive", text: "Прочитать" },
          ],
        },
        (buttonId) => {
          if (buttonId === "delete") {
            window.Telegram.WebApp.showPopup(
              {
                title: "Выбрать?",
                message: "Вы уверены, что хотите выбрать\n этого исполнителя?",
                buttons: [
                  { id: "save", type: "default", text: "Да" },
                  { id: "delete", type: "destructive", text: "Нет" },
                ],
              },
              (buttonId) => {
                if (buttonId === "save") {
                  dispatch(setStartTask(secondPage.task.id));
                  dispatch(setStartResponse(isOpen.responce.id));
                  setOpen({ ...isOpen, isActive: false });
                  setSecondPage({ ...secondPage, isActive: false });
                } 
                if (buttonId === "delete" || buttonId === null){
                  console.log("Он отказался")
                }
                
              }
            );
          }
          if (buttonId === "save") {
            window.Telegram.WebApp.openLink(
              "https://walletru.helpscoutdocs.com/"
            );
          }
          if (buttonId === null){
            console.log("Он отказался")
          }
        }
      );
    }
    function goBack() {
      if (oneCards.isOpen) {
        setOneCard((value) => ({ ...value, isOpen: false }));
      } else {
        if (!openAboutReaction.isActive) {
          if (!details.isActive) {
            if (detailsTwo.isOpen) {
              setDetailsTwo((value) => ({ ...value, isOpen: false }));
            } else {
              if (isOpen.isActive) {
                // isPageValueTwo = false
                setOpen({ ...isOpen, isActive: false });
              } else {
                if (secondPage.isActive) {
                  
                  setSecondPage( (value) => ({ ...value, isActive: false }));
                  // isPageValueOne = false
                } else {
                  // if (history[history.length - 1] === '/AdCreating'){

                  //   navigate();
                  // }
                  // else{
                  //   navigate(-1)
                  // }
                  if (lastAdsTwo.isOpen){
                    setLastAdsTwo((value) => ({...value , isOpen : false}) )
                  }
                  else{
                    if (myResponse.isOpen) {
                      setMyResponse((value) => ({ ...value, isOpen: false }));
                    } else {
                      navigate("/");
                    }
                  }
                }
              }
            }
          } else {
            save();
          }
        } else {
          setOpenAboutReaction({ ...openAboutReaction, isActive: false });
        }
      }
    }

    BackButton.show();

    if (isOpen.isActive) {
      MainButton.show();
      MainButton.setParams({
        color: "#2ea5ff",
        text_color: "#ffffff",
      });
      MainButton.setText("ВЫБРАТЬ");
      MainButton.onClick(writeFucntion);
    } else {
      MainButton.offClick(writeFucntion);
      if (!myResponse.isOpen) {
        MainButton.hide();
      }
    }
    BackButton.onClick(goBack);
    return () => {
      BackButton.offClick(goBack);
      // MainButton.offClick(writeFucntion);
    };

    // eslint-disable-next-line
  }, [
    secondPage.isActive,
    isOpen.isActive,
    openAboutReaction.isActive,
    details.isActive,
    isOpen,
    navigate,
    save,
    setOneCard,
    oneCards.isOpen,
    detailsTwo.isOpen,
    setDetailsTwo,
    myResponse.isOpen,
    setMyResponse,
    lastAdsTwo,
    setLastAdsTwo
  ]);
};
