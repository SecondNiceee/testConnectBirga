import React from "react";

import Holding from "./Holding/Holding";

import cl from "./AdCreatingThree.module.css";
import Upper from "./Upper/Upper";
import Block from "./Block/Block";
import AlertBlock from "./AlertBlock/AlertBlock";

const AdCreatingThree = ({taskInformation }) => {



  return (
    <div className= {cl.AdCreatingThree}
    style={{minWidth : document.documentElement.clientWidth.toString() + 'px'}}

    >
      <Upper />
      
      <div className={cl.blocks}>
        <Block left={"Задание"} right={String(taskInformation.tonValue) + " TON"} />
        <Block left={"Комиссия"} right={"0.004 TON"} />
        <Block left={"Итого"} right={String(taskInformation.tonValue + 0.004) + " TON"} />
      </div>
      <Holding taskInformation={taskInformation}  className={cl.Holding} />
      <AlertBlock />
    </div>
  );
};

export default AdCreatingThree;
