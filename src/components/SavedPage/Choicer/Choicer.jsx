import React, { memo, useMemo } from 'react';
import cl from './Choicer.module.css'

import ChoicerInfo from './ChoicerInfo';
import { useSelector } from 'react-redux';
const Choicer = ({nowKey , keys, setDetails, setResponce, setCard}) => {

    const savedTasks = useSelector(state => state.saves.tasks)
    const savedResponces = useSelector(state => state.saves.responces)
    const savedCards = useSelector(state => state.saves.cards)

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
        <div style={style} className={cl.main}>
                <ChoicerInfo setDetails = {setDetails} navigate={"task"} arr={savedTasks} text = {"У вас нет сохраненных заказов"}  />
                <ChoicerInfo setResponce = {setResponce} navigate={"response"} arr={savedResponces} text = {"У вас нет сохраненных откликов"} />
                <ChoicerInfo setCard = {setCard} navigate={"card"} arr={savedCards} text = {"У вас нет сохраненных кейсов"} />
        </div>
    );
};

export default memo(Choicer);