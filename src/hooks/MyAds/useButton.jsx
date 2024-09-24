import { useCallback, useEffect } from "react";
import BackButton from "../../constants/BackButton";
import MainButton from "../../constants/MainButton";
import { useDispatch, useSelector } from "react-redux";
import { putMyTask, setStartTask } from "../../store/information";
import { setStartResponse } from "../../store/responses";
import sortFiles from "../../functions/sortFiles";
import translation from "../../functions/translate";
import axios from "axios";
import HappyHold from "../../pages/HappyHold/HappyHold";
const menu = document.documentElement.querySelector(".FirstMenu")

const choiceText = translation("ВЫБРАТЬ")
 
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
  setPageValueOne,
  setPageValueTwo,
  setBuyPage,
  buyPage,
  happyHold,
  setHappyHold,
  walletH,
  setWalletH
}) => {

  const balance = useSelector(state => state.balance.value)
  const address = useSelector( state => state.telegramUserInfo.address )
  const dispatch = useDispatch();
  const myAdsArray = useSelector((state) => state.information.myAdsArray);

  const putTask = useCallback( () => {
      console.log("ВЫХОВ ЭТОЙ ШТУКИ")
      console.log(details.task)
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

    setSecondPage( (value) => ({...value , task : {...details.task}}) )
    setDetails((value) => ({...value , isActive : false}))
    
  } , [details, setSecondPage, setDetails, dispatch] ) 
  useEffect(() => {
    async function hold(id, amount) {
      await axios.get("https://www.connectbirga.ru/user/hold" , {
        params : {
          fromId : id,
          amount : amount
        },
        headers : {
          "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY
        }
      })
      console.log("2144832745" ,secondPage.task.tonValue );
      
    }
    function writeFucntion() {

      if (!walletH){

        if (!address){
          window.Telegram.WebApp.showPopup(
            {
              title: translation("Внимание!"),
              message: translation("Для выбора исполнителя необходимо создать Коннект Кошелёк, это бесплатно."),
              buttons: [
                { id: "save", type: "default", text: translation("Создать") },
                { id: "delete", type: "destructive", text: translation("Отмена") },
              ],
            },
            (buttonId) => {
              if (buttonId === "save") {
                navigate('/Profile')
              }
              if (buttonId === "delete" || buttonId === null) {
                console.log("Он отказался");
              }
            }
          );
        }
        else{
          if (!buyPage){
            setBuyPage(true)
            console.log("Buy page стал true")
          }
          else{
            if (happyHold){
                setOpen({ ...isOpen, isActive: false });
                setBuyPage(false)
                setHappyHold(false)
                // setSecondPage({ ...secondPage, isActive: false });
            }
            else{
              console.log(balance)
              console.log(secondPage.task.tonValue)
              if (Number(balance) < Number(secondPage.task.tonValue)){

                setWalletH(true)
              }
              else{
                window.Telegram.WebApp.showPopup(
                  {
                    title: translation("Захолдировать?"),
                    message: translation("Вернуть захолдированные деньги можно будет лишь в случае невыполнения задания исполнителем(через поддержку)."),
                    buttons: [
                      { id: "save", type: "default", text: translation("Да") },
                      { id: "delete", type: "destructive", text: translation("Нет") },
                    ],
                  },
                  (buttonId) => {
                    if (buttonId === "save") {
                        hold(2144832745, String( Number(secondPage.task.tonValue + 0.01).toFixed(3))).then(value => {
                        window.Telegram.WebApp.HapticFeedback.notificationOccurred("success");
                        dispatch(setStartTask(myAdOneAdvertisement.id)).then(value =>

                          dispatch(setStartResponse([myAdOneResponse , myAdOneAdvertisement]))
                        ).then( value =>  setHappyHold(true))
                        MainButton.setText(translation("Перейти к заданию"))
    
                      }).catch(value => {
                        console.log(value);
                        alert("Холд не прошел. Отправте в поддержку следующее сообщение")
                        alert(JSON.stringify(value))
                        
                      } )
                    }
                    if (buttonId === "delete" || buttonId === null) {
                      console.log("Он отказался");
                    }
                  }
                );
              }
            }
          }
  
        }
      }

      
    }

    function compareTwoObject(a1, a2) {
      console.log(a1 , a2)
      if (JSON.stringify({...a1 , myAds : true}) !== JSON.stringify({...a2 , myAds : true})) {
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





    function goBack() {
      if (!walletH){

      
      if (happyHold){
        setOpen({ ...isOpen, isActive: false });
        setBuyPage(false)
        setHappyHold(false)
        // setSecondPage({ ...secondPage, isActive: false });
      }
      else{

        if (buyPage){
          setBuyPage(false)
        }
        else{
  
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
                if (!compareTwoObject(secondPage.task, details.task)){
                  save();
                }
                else{
                  setDetails((value) => ({...value , isActive : false}))
                }
                
              }
            } else {
              setOpenAboutReaction({ ...openAboutReaction, isActive: false });
            }
          }
        }
      }
    }
    }


    


    console.log("Happy Hold" + happyHold);
    
    if (!walletH){

    
      
      BackButton.show();

      if (isOpen.isActive && secondPage.task.status !== "inProcess" && secondPage.task.status !== "completed" ) {
        menu.classList.add("disappearAnimation")
        menu.classList.remove("appearAnimation")
        MainButton.show();
        MainButton.setParams({
          color: "#2ea5ff",
          text_color: "#ffffff",
          is_active: true,
        });
        MainButton.onClick(writeFucntion);
        if (!buyPage){
            MainButton.setText(choiceText);
        }
        else{
          if (happyHold){
            MainButton.setText(translation("Перейти к заданию"))
          }
          else{
            if (balance < secondPage.task.tonValue){
              MainButton.setText("КОШЕЛЕК")
            }
            else{
              MainButton.setText(translation("ЗАХОЛДИРОВАТЬ"))
            }
          }
        }
      } else {
        MainButton.offClick(writeFucntion);
        if (!myResponse.isOpen && !details.isActive ) {
          menu.classList.add("appearAnimation")
          menu.classList.remove("disappearAnimation")
          MainButton.hide();
        }
      }
  
  
      if (details.isActive) {
        MainButton.setText(translation("ОБНОВИТЬ"));
        if (!compareTwoObject(secondPage.task, details.task)) {
          menu.classList.add("disappearAnimation")
          menu.classList.remove("appearAnimation")
          MainButton.show();
          MainButton.setParams({
            color: "#2ea5ff",
            text_color: "#ffffff",
            is_active: true,
          });
          
  
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
          MainButton.offClick(putTask)
          MainButton.onClick(putTask);
        }
        else{
          menu.classList.add("disappearAnimation")
          menu.classList.remove("appearAnimation")
            MainButton.show()
            MainButton.setParams({
              is_active: false, //неизвесетно
              color: "#2f2f2f",
              text_color: "#606060",
            });
            MainButton.offClick(putTask)
        }
      } else {
        if (!isOpen.isActive && !myResponse.isOpen){
          menu.classList.add("appearAnimation")
          menu.classList.remove("disappearAnimation")
          MainButton.hide();
          MainButton.offClick(putTask)
          MainButton.setParams({
            is_active: false, //неизвесетно
            color: "#2f2f2f",
            text_color: "#606060",
          });
        }
      }
  
      BackButton.onClick(goBack);
    }
    else{
      menu.classList.add("appearAnimation")
      menu.classList.remove("disappearAnimation")
    }
    if (HappyHold){
      MainButton.setText(translation("Перейти к заданию"))
    }
    

    return () => {
      MainButton.setParams({
        color: "#2ea5ff",
        text_color: "#ffffff",
        is_active: true,
      });
      BackButton.offClick(goBack);
      MainButton.offClick(writeFucntion);
      MainButton.offClick(putTask)
    };

    // eslint-disable-next-line
  }, [
    myAdsArray,
    secondPage.isActive,
    secondPage.task,
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
    setPageValueTwo,
    buyPage,
    setBuyPage,
    happyHold,
    setHappyHold,
    walletH,
    setWalletH,
    dispatch
  ]);
};
