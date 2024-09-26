import { useDispatch, useSelector } from "react-redux";
import translation from "../../functions/translate";
import { useNavigate } from "react-router-dom";
import MainButton from "../../constants/MainButton";
import { setStartTask } from "../../store/information";
import { setStartResponse } from "../../store/responses";
import axios from "axios";




function useWriteFucntion({walletH, buyPage, setBuyPage, happyHold, setOpen, isOpen, setHappyHold, secondPage , setWalletH, myAdOneAdvertisement, myAdOneResponse
  
}) {
  
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
    
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const address = useSelector( state => state.telegramUserInfo.address )
    const balance = useSelector( state => state.balance.value )
    const lastTransaction = useSelector( state => state.telegramUserInfo.lastTransaction )

    function writeFunction(){


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
                MainButton.hide()
              }
              else{
                if ((new Date() - new Date(lastTransaction))  / (1000 * 60) < 5){
                  
                  window.Telegram.WebApp.showPopup(
                    {
                      title: translation("Ошибка!"),
                      message: translation("Вы недавно проводили транзакцию , пожалуйста , перезайдите в приложение через 5 минут и попробуйте операцию снова."),
                      buttons: [
                        { id: "save", type: "default", text: translation("Понятно") },
                      ],
                    },
                    (buttonId) => {
                      if (buttonId === "save" || buttonId === null) {
                        console.log("ок");
                        
                      }
                    }
                  );
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
    
    
    
                         
                          window.Telegram.WebApp.HapticFeedback.notificationOccurred("success");
                          dispatch(setStartTask(myAdOneAdvertisement.id)).then(value =>
    
                          dispatch(setStartResponse([myAdOneResponse , myAdOneAdvertisement]))
                          ).then( value =>  setHappyHold(true))
                          // MainButton.setText(translation("Перейти к заданию"))
      
                      }
                      if (buttonId === "delete" || buttonId === null) {
                        console.log("Он отказался");
                        console.log("Да это так");
                        
                      }
                    }
                  );
                }
              
              }
            }
          }
  
        }
      }




    }


    return writeFunction
    
  }
export default useWriteFucntion