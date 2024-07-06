import React from 'react';
import Lottie, { useLottie } from "lottie-react";
import sleeping from "../../../animation/tired.json";
import cl from "./Choicer.module.css"
const ChoicerInfo = ({text}) => {
    const options = {
        animationData: sleeping,
        loop: true,
        style : {

            display : "flex",
            justifyContent : "center",
            marginLeft : "auto",
            marginRight : "auto",
            width : "250px"
        }
        
      };

      const { View } = useLottie(options);
    return (
    <div className={cl.choicerBlock}>
        <div onClick={() => {
             window.Telegram.WebApp.openTelegramLink("https://t.me/addstickers/DonutTheDog")
        }} className='hamster'>{View}</div>
        <p className={cl.text}>{text}</p>
    </div>
    );
};

export default ChoicerInfo;