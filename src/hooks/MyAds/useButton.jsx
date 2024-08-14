import { useEffect, useMemo } from "react";
import BackButton from "../../constants/BackButton";
import MainButton from "../../constants/MainButton";
import { useDispatch, useSelector } from "react-redux";
import { clearMyOrders, fetchMyOrders, putMyTask, setStartTask } from "../../store/information";
import { setStartResponse } from "../../store/responses";
import sortFiles from "../../functions/sortFiles";
const menu = document.documentElement.querySelector(".FirstMenu")
export const useButton = ({
  setOpen,
  setSecondPage,
  navigate,
  setOpenAboutReaction,
  myAdOneResponse,
  myAdOneAdvertisement,
  openAboutReaction,
  isOpen,
  setDetails,
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
  setLastAdsTwo,
  checkMistakes,
  putTask,
  setPageValueOne,
  setPageValueTwo
}) => {
  const dispatch = useDispatch();
  const myAdsArray = useSelector((state) => state.information.myAdsArray);
  const bedTask = useMemo(() => {
    let k = myAdsArray.find((e) => e.id === secondPage.task.id)
    if (!k){
      return myAdsArray[0]
    }
    else{
      return k
    }
  }, [myAdsArray, secondPage.task.id]);
  useEffect(() => {
    async function writeFucntion() {
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
                  
                  
  
                  dispatch(clearMyOrders())
                  dispatch(setStartTask(myAdOneAdvertisement.id));
                  dispatch(setStartResponse([myAdOneResponse , myAdOneAdvertisement]));
                  setOpen({ ...isOpen, isActive: false });
                  setSecondPage({ ...secondPage, isActive: false });
                  dispatch(fetchMyOrders(1));
                }
                if (buttonId === "delete" || buttonId === null) {
                  console.log("Он отказался");
                }
              }
            );
          }
          if (buttonId === "save") {
            window.Telegram.WebApp.openLink(
              "https://walletru.helpscoutdocs.com/"
            );
          }
          if (buttonId === null) {
            console.log("Он отказался");
          }
        }
      );
    }

    function compareTwoObject(a1, a2) {
      if (JSON.stringify(a1) !== JSON.stringify(a2)) {
        return false;
      }
      if (JSON.stringify(a1.time) !== JSON.stringify(a2.time)) {
        return false;
      }
      if (a1.photos.length !== a2.photos.length) {
        return false;
      }
      for (let i = 0; i < a1.photos.length; i++) {
        if (a1.photos[i].name !== a2.photos[i].name) {
          return false;
        }
      }
      return true;
    }

    function putTask(){

      let myFormData = new FormData();
      myFormData.append('title' , String(details.task.taskName))
      myFormData.append('description' , String(details.task.taskDescription))
      myFormData.append("deadline" , String(1))
      myFormData.append("price" , String(details.task.tonValue) )
      myFormData.append("startTime" , details.task.time.start)
      myFormData.append("endTime" , details.task.time.end)

      let files = sortFiles(details.task.photosNames ,  details.task.photos)
      
        for (let i = 0; i <  files.removedArr.length; i++){
          myFormData.append(`deleteFiles[${i}]` , files.removedArr[i])
        }
        for (let i = 0; i < files.addedArr.length ; i++){
          myFormData.append(`addFiles` , files.addedArr[i] )
        }

      dispatch(putMyTask([myFormData, details.task.id , details.task]))

      
      setDetails((value) => ({...value , isActive : false}))
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
                setPageValueTwo(false)
                // isPageValueTwo = false
                setOpen({ ...isOpen, isActive: false });
              } else {
                if (secondPage.isActive) {
                  setPageValueOne(false)
                  setSecondPage((value) => ({ ...value, isActive: false }));
                  // isPageValueOne = false
                } else {
                  // if (history[history.length - 1] === '/AdCreating'){

                  //   navigate();
                  // }
                  // else{
                  //   navigate(-1)
                  // }
                  if (lastAdsTwo.isOpen) {
                    setLastAdsTwo((value) => ({ ...value, isOpen: false }));
                  } else {
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

    if (isOpen.isActive && secondPage.task.status !== "inProcess") {
      menu.classList.add("disappearAnimation")
      menu.classList.remove("appearAnimation")
      MainButton.show();
      
      MainButton.setParams({
        color: "#2ea5ff",
        text_color: "#ffffff",
      });
      MainButton.setText("ВЫБРАТЬ");
      MainButton.onClick(writeFucntion);
    } else {
      MainButton.offClick(writeFucntion);
      if (!myResponse.isOpen && !details.isActive) {
        menu.classList.add("appearAnimation")
        menu.classList.remove("disappearAnimation")
        MainButton.hide();
      }
    }

    if (details.isActive) {
      if (!compareTwoObject(bedTask, details.task)) {
        menu.classList.add("disappearAnimation")
        menu.classList.remove("appearAnimation")
        MainButton.show();
        MainButton.setParams({
          color: "#2ea5ff",
          text_color: "#ffffff",
          is_active: true,
        });
        
        MainButton.setText("ОБНОВИТЬ");

        if (checkMistakes(details.task, false)) {
          MainButton.setParams({
            color: "#2ea5ff",
            text_color: "#ffffff",
            is_active: true,
          });
        } else {
          MainButton.setParams({
            is_active: false, //неизвесетно
            color: "#2f2f2f",
            text_color: "#606060",
          });
        }
        MainButton.onClick(putTask);
      }
      else{
        if (!isOpen.isActive && !myResponse.isOpen){
          MainButton.setParams({
            is_active: false, //неизвесетно
            color: "#2f2f2f",
            text_color: "#606060",
          });
          MainButton.offClick(putTask)
        }
        else{
          MainButton.setParams({
            color: "#2ea5ff",
            text_color: "#ffffff",
            is_active: true,
          });
        }
      }
    } else {
      if (!isOpen.isActive && !myResponse.isOpen){
        menu.classList.add("appearAnimation")
        menu.classList.remove("disappearAnimation")
        MainButton.hide();
        MainButton.offClick(putTask)
        MainButton.setParams({
          color: "#2ea5ff",
          text_color: "#ffffff",
          is_active: true,
        });
      }
    }

    BackButton.onClick(goBack);
    return () => {
      BackButton.offClick(goBack);
      MainButton.offClick(writeFucntion);
    };

    // eslint-disable-next-line
  }, [
    secondPage.isActive,
    secondPage,
    isOpen.isActive,
    openAboutReaction.isActive,
    isOpen,
    details,
    navigate,
    save,
    setOneCard,
    oneCards.isOpen,
    detailsTwo.isOpen,
    setDetailsTwo,
    myResponse.isOpen,
    setMyResponse,
    lastAdsTwo,
    setLastAdsTwo,
    setPageValueOne,
    setPageValueTwo
  ]);
};
