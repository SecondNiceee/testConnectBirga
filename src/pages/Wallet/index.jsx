import React, { useEffect } from "react";
import cl from "./index.module.scss";
import Buttons from "./components/Buttons";
import useProtect from "./hooks/useProtect";
import MainPage from "./components/MainPage";
import DepositPage from "./components/DepositPage";
const Wallet = () => {
  useProtect()

  return (
    <div className={cl.mainContainer}>

        <MainPage />
        <DepositPage />

    </div>
  );
};

export default Wallet;
