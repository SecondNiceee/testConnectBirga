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
  return (
    <div className={cl.mainContainer}>

        <MainPage setWithDrawal = {setWithDrawal} setDepositShow={setDepositShow} />

        <CSSTransition  in = {depositShow} timeout={0}
        mountOnEnter
        unmountOnExit
        >
          <DepositPage  address={address} />
        </CSSTransition>

        <CSSTransition in = {withdrawal} mountOnEnter unmountOnExit>
            <WithdrawalPage />
        </CSSTransition> 

    </div>
  );
};

export default Wallet;
