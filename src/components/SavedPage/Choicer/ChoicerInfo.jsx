import React, { memo, useCallback, useMemo } from 'react';
import  { useLottie } from "lottie-react";
import sleeping from "../../../animation/tired.json";
import cl from "./Choicer.module.css"
import FirstBlock from '../../First/FirstMain/FirstBlock';
import Reaction from '../../../pages/MyAds/components/Reaction';
import Case from '../../UI/Case/Case';

const ChoicerInfo = ({text , arr, navigate ,setDetails , setResponce, setCard}) => {
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

      const openFunc = useCallback( (card) => {
        setCard({isOpen : true , card : card})
      } , [setCard] )

      const { View } = useLottie(options)
      ;

      const array = useMemo(() => {
        if (navigate === 'task'){
            return arr.map((e,i) => {
                return <FirstBlock index={i} setDetailsActive={setDetails} agree ={true} isButton={true} className={cl.firstBlock}  task={e} id={e.id}  {...e} />
             }) 
        }
        if (navigate === 'response'){
            return arr.map((e,i) => {
                return <Reaction  setOpen={setResponce} agree = {true} responce={e} />
             }) 
        }
        if (navigate === 'card')
            return arr.map((e,i) => {
                return <Case  card={e} openFunc={openFunc}  agree = {true} task={e} title={e.title} description={e.description} photos={e.photos} watchOnly={true} />
             }) 
        
      } , [arr, navigate, openFunc, setDetails, setResponce])

      
    return (
   <>
        
            <div style={arr.length > 0 ? {display : 'none'} : {}} className={cl.choicerBlock}>
            <div onClick={() => {
                window.Telegram.WebApp.openTelegramLink("https://t.me/addstickers/DonutTheDog")
            }} className='hamster'>{View}</div>
            <p className={cl.text}>{text}</p>
            </div>
        
        <div style={arr.length === 0 ? {display : 'none'} : {}} className={cl.blocksWrapper}>
            
        {array}
        </div>
        
</>

    );
};

export default memo(ChoicerInfo);