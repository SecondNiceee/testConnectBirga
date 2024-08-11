import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import cl from './Choicer.module.css'

import ChoicerInfo from './ChoicerInfo';
import { useSelector } from 'react-redux';
const Choicer = ({nowKey , keys, setDetails, setResponce, setCard}) => {

    const savedTasks = useSelector(state => state.saves.tasks)
    const savedResponces = useSelector(state => state.saves.responces)
    const savedCards = useSelector(state => state.saves.cards)
    console.log(savedTasks)
    const containerOne = useRef(null)
    const containerTwo = useRef(null)
    const containerThree = useRef(null)

    const pickerRef = useRef(null)
    console.log(savedTasks)

    const [viewsNumber ,setViewsNumber] = useState(0)
    useEffect( () => {
        if (pickerRef.current && containerOne.current && containerTwo.current && containerThree.current){
            if (nowKey === keys[0]){
                pickerRef.current.style.overflowY = "hidden"
                pickerRef.current.style.minHeight = String(containerOne.current.offsetHeight + 20) + "px"
            }
            if (nowKey === keys[1]){
                pickerRef.current.style.overflowY = "hidden"
                pickerRef.current.style.minHeight = String(containerTwo.current.offsetHeight + 20) + "px"
            }
            if (nowKey === keys[2]){
                pickerRef.current.style.overflowY = "hidden"
                pickerRef.current.style.minHeight = String(containerThree.current.offsetHeight + 20) + "px"
            }
        }
    
        
    
        return () => {
    
        }
      }  , [nowKey, keys, savedCards, savedResponces ,  ,  savedTasks] )
  

    

    const style = useMemo( () => {
        switch (nowKey){
            case keys[0]:
                return {
                    transform : "translateX(0%)"
                }
            case keys[1]:
                return {
                    transform : "translateX(-100vw)"
                }
            case keys[2]:
                return {
                    transform : "translateX(-200vw)"
                }
            default : 
                return {
                     transform : "translateX(0%)"
                }
        }
    } , [keys, nowKey])
    return (
        <div ref={pickerRef} style={style} className={cl.main}>
                <ChoicerInfo viewsNumber = {viewsNumber} setViewsNumber = {setViewsNumber} ref={containerOne} setDetails = {setDetails} navigate={"task"} arr={savedTasks} text = {"У вас нет сохраненных заказов"}  />
                <ChoicerInfo viewsNumber = {viewsNumber} setViewsNumber = {setViewsNumber} ref={containerTwo} setResponce = {setResponce} navigate={"response"} arr={savedResponces} text = {"У вас нет сохраненных откликов"} />
                <ChoicerInfo viewsNumber = {viewsNumber} setViewsNumber = {setViewsNumber} ref={containerThree} setCard = {setCard} navigate={"card"} arr={savedCards} text = {"У вас нет сохраненных кейсов"} />
        </div>
    );
};

export default memo(Choicer);