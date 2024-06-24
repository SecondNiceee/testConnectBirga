import React from 'react';
import Shablon from '../Shablon/Shablon';
import cl from './ShablonsWrap.module.css'

const ShablonsWrap = ({shablonsArr, className}) => {
    return (
        <div className={className ? [cl.ShablonWrap, className].join(' ') : cl.ShablonWrap}>
            {shablonsArr.map((e) => {
                return (
                    <Shablon shablon = {e} />
                )
            })}
        </div>
    );
};

export default ShablonsWrap;