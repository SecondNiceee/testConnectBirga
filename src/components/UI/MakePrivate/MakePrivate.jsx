import React, { memo } from 'react';
import cl from './MakePrivate.module.css'
import Switcher from '../Switcher/Switcher';
const MakePrivate = ({className , isPrivate , text , setPrivate}) => {
    return (
        <div className = {className ? ["Private__container" , className].join(' ') : "Private__container" } >
        <div className = {cl.MakePrivate}>
                <p>{text}</p>
                <Switcher isEnable = {isPrivate} setEnable = {(e) => {
                    setPrivate(!isPrivate)
                }}  className={cl.Switcher} />
        </div>
        </div>
    );
};

export default memo(MakePrivate);