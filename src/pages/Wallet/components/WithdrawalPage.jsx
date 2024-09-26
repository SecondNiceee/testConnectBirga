import React, { memo, useCallback, useEffect, useState } from "react";
import cl from "../index.module.scss";
import WithdrawalCap from "./WithdrawalCap";
import Compact from "./Compact";
import InformationBlock from "./InformationBlock";
import BalanceBlock from "./BalanceBlock";
import RoundedBlocks from "./RoundedBlocks";
import MainButton from "../../../constants/MainButton";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getBalance } from "../../../store/balance";
import translation from "../../../functions/translate";
const WithdrawalPage = ({balance, setWithDrawal}) => { 

  const [undetText , setUnderText ] = useState(false)

  const [myValues, setMyValues] = useState({
    address: "",
    summ: "",
  });
  const [mistakes, setMistakes] = useState({
    address : false,
    summ : false
  })
  const dispatch = useDispatch()
  const address = useSelector( state => state.telegramUserInfo.address )

  const lastTransaction = useSelector( state => state.telegramUserInfo.lastTransaction )



  useEffect( () => {
    async function buttonFunction(){

      if ( (new Date() - new Date(lastTransaction))  / (1000 * 60)){
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

        MainButton.showProgress()
        try{
          console.log("2144832745", myValues.address, String(myValues.summ.replace(',', '.')) );
          
          await axios.get('https://www.connectbirga.ru/user/sendToAddress', {
            params : {
              fromId : 2144832745,
              toAddress : myValues.address,
              amount: String(Number(myValues.summ.replace(',', '.')))
            },
            headers : {
              "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY
            }
          })
          dispatch(getBalance({userAddress : address}))
          MainButton.hideProgress()
          window.Telegram.WebApp.showPopup(
            {
              title: translation("Вывод в пути."),
              message: translation("Ваши тоны поступят на баланс в течении нескольких минут"),
              buttons: [
                { id: "save", type: "default", text: translation("Понятно") },
              ],
            },
            (buttonId) => {
              if (buttonId === "save" || buttonId === null) {
                setWithDrawal(false)
              }
              
            }
          );
  
          
  
        }
        catch(e){
          console.log('====================================');
          console.log(e);
          console.log('====================================');
          window.Telegram.WebApp.HapticFeedback.notificationOccurred("error")
          window.Telegram.WebApp.showPopup(
            {
              title: translation("Ошибка!"),
              message: translation("Введите правильный адресс кошелька и попробуйте снова"),
              buttons: [
                { id: "save", type: "destructive", text: "Понятно" },
              ],
            },
            (buttonId) => {
              if (buttonId === "save" || buttonId === null) {
                console.log("Он что - то нажал");
                
              }
            }
          );
        }
        MainButton.hideProgress()
      }

    }
    MainButton.hideProgress()
    MainButton.show()
    MainButton.setText(translation("Отправить"))

    MainButton.onClick(buttonFunction)
    return () => {
      MainButton.hide()
      MainButton.offClick(buttonFunction)
    }
  } , [myValues, setWithDrawal, address, dispatch, lastTransaction] )
  
  console.log('====================================');
  console.log(lastTransaction);
  console.log('====================================');


  const valuesChanger = useCallback((e) => {
    setMyValues((value) => ({ ...value, address: e }));
  }, []);

  useEffect( () => {
    MainButton.showProgress()
    function timeoutFunction(){
      if (Number(myValues.summ.replace(',', '.')) < 0.05){
        setUnderText(true)
      }
      setMistakes((value) => ({...value, summ : true}))
      MainButton.hideProgress()
      MainButton.setParams({
        is_active: false, //неизвесетно
        color: "#2f2f2f",
        text_color: "#606060",
      });
      window.Telegram.WebApp.HapticFeedback.notificationOccurred("error")
    }
    let timeout
    if ((Number(myValues.summ.replace(',', '.')) > balance || Number(myValues.summ.replace(',', '.')) < 0.05) && Number(myValues.summ.replace(',', '.')) !== 0){
       timeout = setTimeout( timeoutFunction, 2000 )
       if (Number(myValues.summ.replace(',', '.')) > 0.05){
        setUnderText(false)
       }
    }
    else{
      setUnderText(false)
      MainButton.hideProgress()
      MainButton.setParams({
        color: "#2ea5ff",
        text_color: "#ffffff",
        is_active: true,
      });
      setMistakes( (value) => ({...value, summ : false}) )
    }
    return () => {

        clearTimeout(timeout)
      
    }
  } , [myValues.summ, balance, setUnderText] )


  console.log('====================================');
  console.log(myValues.summ);
  console.log('====================================');

  return (
    <>
    <div className={cl.withDrawal}>
      <WithdrawalCap />

      <Compact
        isGreyRed = {true}
        inputMistake = {mistakes.address}
        greyText={translation("Адрес")}
        inputPlaceholder={translation("Введите адрес кошелька")}
        inputType={"text"}
        inputValue={myValues.address}
        onChange={valuesChanger}
        
        
      />

    <InformationBlock  />


    <BalanceBlock underText={undetText} inputMistake = {mistakes.summ} balance={balance} setMyValues={setMyValues} sum={myValues.summ} />



      <RoundedBlocks summ={myValues.summ} />
    </div>
    </>
  );
};

export default memo(WithdrawalPage);
