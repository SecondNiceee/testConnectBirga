import React, { useEffect } from "react";
import cl from "./index.module.scss";
import Buttons from "./components/Buttons";
import useProtect from "./hooks/useProtect";
import MainPage from "./components/MainPage";
import DepositPage from "./components/DepositPage";
import { useSelector } from "react-redux";
const Wallet = () => {
  useProtect()
  const address = useSelector((state) => state.telegramUserInfo.address);
  return (
    <div className={cl.mainContainer}>

        <MainPage />
        <DepositPage address={address} />

    </div>
  );
};

export default Wallet;
