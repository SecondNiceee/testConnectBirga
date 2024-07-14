import React from 'react';
import  { useLottie } from "lottie-react";
import sleeping from "../../../animation/tired.json";
import cl from "./Choicer.module.css"
import FirstBlock from '../../First/FirstMain/FirstBlock';
import { useSelector } from 'react-redux';
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

      const { View } = useLottie(options)
      ;
      const savedTasks = useSelector(state => state.saves.tasks)
    return (
    <div className={cl.choicerBlock}>
        {savedTasks.length === 0 ? 
        <>
            <div onClick={() => {
                window.Telegram.WebApp.openTelegramLink("https://t.me/addstickers/DonutTheDog")
            }} className='hamster'>{View}</div>
            <p className={cl.text}>{text}</p>
        </>
        :
        <>
         {savedTasks.map((e,i) => {
            return <FirstBlock task={e}  {...e} />
         }) }
        </>

        }

    </div>
    );
};

export default ChoicerInfo;