import React, { useCallback, useEffect, useMemo, useState } from "react";
import cl from "./index.module.scss";
import useProtect from "./hooks/useProtect";
import MainPage from "./components/MainPage";
import DepositPage from "./components/DepositPage";
import { useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
import { useNavigate } from "react-router-dom";
import BackButton from "../../constants/BackButton"
import WithdrawalPage from "./components/WithdrawalPage";
import { Address, TonClient } from "ton";
const Wallet = ({ onClose = false , isFixed = false, ...props}) => {
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
      if (withdrawal){
        setWithDrawal(false)
      }
      else{
        if (!onClose){
          navigate("/Profile")
        }
        else{
          onClose(false)
        }
      }
    }
  } , [depositShow, setDepositShow, withdrawal, setWithDrawal, navigate, onClose] )

  useEffect( () => {


    BackButton.show()

    BackButton.onClick(BackFunction)
    
    return () => {
      BackButton.offClick(BackFunction)
      
    }
  } , [depositShow, BackFunction] )

  const balance = useSelector(state => state.balance.value)

  useEffect( () => {
    const menu = document.documentElement.querySelector(".FirstMenu");
    menu.classList.add("disappearAnimation")
    menu.classList.remove("appearAnimation")
    document.documentElement.style.overflowY = "auto"
    if (!(withdrawal || depositShow)){
      menu.style.display = "flex"
    }
    else{
       menu.style.display = "none"
    }
    return () => {
      if (isFixed){
        document.documentElement.style.overflowY = "hidden"
      }
      menu.style.display = "flex"
    }
  }, [withdrawal, depositShow] )
  


  return (
    <div className={cl.mainContainer} {...props}>

        <MainPage balance={balance} setWithDrawal = {setWithDrawal} setDepositShow={setDepositShow} />

        <CSSTransition  in = {depositShow} timeout={0}
        mountOnEnter
        unmountOnExit
        >
          <DepositPage  address={address} />
        </CSSTransition>

        <CSSTransition
        timeout={0} unmountOnExit mountOnEnter in = {withdrawal} >
            <WithdrawalPage setWithDrawal={setWithDrawal} balance={balance} />
        </CSSTransition> 

    </div>
  );
};

export default Wallet;
