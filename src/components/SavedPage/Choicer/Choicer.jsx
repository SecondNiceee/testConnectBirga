import React, { useMemo } from 'react';
import cl from './Choicer.module.css'

import ChoicerInfo from './ChoicerInfo';
const Choicer = ({nowKey , keys}) => {
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
                <ChoicerInfo text = {"У вас нет сохраненных заказов"}  />
                <ChoicerInfo text = {"У вас нет сохраненных откликов"} />
                <ChoicerInfo text = {"У вас нет сохраненных кейсов"} />
        </div>
    );
};

export default Choicer;