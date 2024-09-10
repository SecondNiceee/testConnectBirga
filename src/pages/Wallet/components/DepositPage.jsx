import React from "react";
import cl from "../index.module.scss";
import { useSelector } from "react-redux";
import AlertBlock from "./AlertBlock";
import HowGetText from "./HowGetText";
import Stages from "./Stages";
import AddressBlock from "./AddressBlock";
import MyLoader from "../../../components/UI/MyLoader/MyLoader";
const DepositPage = () => {
  const address = useSelector((state) => state.telegramUserInfo.address);
  return (
    <div className={cl.depositContainer}>
      {address ? (
        <>
          <p className={cl.capText}>Сделать депозит USDT (TON)</p>

          <div className={cl.qr}></div>

          <AddressBlock address={address} />

          <AlertBlock />

          <div className={cl.stagesBlock}>
            <HowGetText />

            <Stages address={address} />
          </div>
        </>
      ) : (
          <MyLoader />
      )}
    </div>
  );
};

export default DepositPage;
