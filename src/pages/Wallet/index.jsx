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
const Wallet = () => {
  useProtect()
  const address = useSelector((state) => state.telegramUserInfo.address);
  const navigate = useNavigate()
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

        <MainPage setDepositShow={setDepositShow} />

        <CSSTransition  in = {depositShow} timeout={0}
        classNames={"left-zero"}
        mountOnEnter
        unmountOnExit
        >
          <DepositPage  address={address} />
        </CSSTransition>

    </div>
  );
};

export default Wallet;
