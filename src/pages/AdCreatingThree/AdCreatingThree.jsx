import React from "react";

import Holding from "./Holding/Holding";

import cl from "./AdCreatingThree.module.css";
import Upper from "./Upper/Upper";
import Block from "./Block/Block";
import AlertBlock from "./AlertBlock/AlertBlock";
import { useSelector } from "react-redux";

const AdCreatingThree = ({taskInformation }) => {

  const balance = useSelector(state => state.balance.value)
  const address = useSelector( state => state.telegramUserInfo.address )

  return (
    <div className= {cl.AdCreatingThree}
    style={{minWidth : document.documentElement.clientWidth.toString() + 'px'}}

    >
      <Upper />
      
      <div className={cl.blocks}>
        <Block left={"Задание"} right={String(taskInformation.tonValue) + " TON"} />
        <Block left={"Комиссия"} right={"0.01 TON"} />
        <Block left={"Итого"} right={String(taskInformation.tonValue + 0.01) + " TON"} />
      </div>
      <Holding taskInformation={taskInformation}  className={cl.Holding} />
      { (balance < taskInformation.tonValue + 0.01 || !address)  && <AlertBlock address = {address} />}
    </div> 
  );
};

export default AdCreatingThree;
