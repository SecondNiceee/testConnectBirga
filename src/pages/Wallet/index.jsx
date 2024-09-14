import React, { useCallback, useEffect, useState } from "react";
import cl from "./index.module.scss";
import Buttons from "./components/Buttons";
import useProtect from "./hooks/useProtect";
import MainPage from "./components/MainPage";
import DepositPage from "./components/DepositPage";
import { useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
import { clickHandler } from "./components/StageTwo";
import { useNavigate } from "react-router-dom";
import MainButton from "../../constants/MainButton";
import BackButton from "../../constants/BackButton"
import WithdrawalPage from "./components/WithdrawalPage";
import { Address, TonClient } from "ton";
const Wallet = () => {
  useProtect()
  const address = useSelector((state) => state.telegramUserInfo.address);
  const navigate = useNavigate()
  const [withdrawal, setWithDrawal] = useState(false)
  const [depositShow, setDepositShow] = useState(false)

  const BackFunction = useCallback( () => {
    if (depositShow){
      setDepositShow(false)
    }
    else{
      navigate(-1)
    }
  } , [depositShow, setDepositShow] )

  useEffect( () => {

    if (depositShow){


      MainButton.setText("Открыть Wallet")
      MainButton.show()
      MainButton.onClick(clickHandler)
    }
    else{
      MainButton.hide()
    }
    BackButton.show()

    BackButton.onClick(BackFunction)
    
    return () => {
      BackButton.offClick(BackFunction)
      MainButton.hide()
      MainButton.offClick(clickHandler)
    }
  } , [depositShow, BackFunction] )

  const [balance, setBalance] = useState(0)
    

  const getBalance = useCallback(async () => {

    const client = new TonClient({
      endpoint: "https://toncenter.com/api/v2/jsonRPC",
      apiKey : process.env.REACT_APP_API_KEY_TWO
    });

    console.log(address);

    const balance = await client.getBalance(Address.parse(address))


    setBalance((Number(balance)) ) 


  }, [address, setBalance]);

    
  useEffect( () => {
    if (address){
      getBalance()
    }
  }, [address] )

  return (
    <div className={cl.mainContainer}>

        <MainPage setWithDrawal = {setWithDrawal} setDepositShow={setDepositShow} />

        <CSSTransition  in = {depositShow} timeout={0}
        mountOnEnter
        unmountOnExit
        >
          <DepositPage  address={address} />
        </CSSTransition>

        <CSSTransition in = {withdrawal} >
            <WithdrawalPage balance={balance} />
        </CSSTransition> 

    </div>
  );
};

export default Wallet;
