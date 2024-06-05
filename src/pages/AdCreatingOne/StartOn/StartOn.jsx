import React from 'react';
import cl from './StartOn.module.css'
import DateIcon from '../../../images/icons/date.svg'
import arrowRight from '../../../images/icons/ArrowRight.svg'
const StartOn = ({className , text, title , props}) => {
    return (
        <div {...props} className={className ? [cl.startOnContainer , className].join(' ') : cl.startOnContainer}>
            <p className={cl.greyText}>{title}</p>
        <div className={cl.startOn}>
            <div className={cl.startOnLeft}>
                <img className={cl.dateIcon} src={DateIcon} alt="" />
                <p className={cl.startText}>{text}</p>
            </div>
                <img className={cl.arrowRight} src={arrowRight} alt="" />
        </div>
        </div>
    );
};

export default StartOn;