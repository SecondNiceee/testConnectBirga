import React, { memo } from 'react';
import cl from './Switcher.module.css'
const Switcher = ({className , isEnable, setEnable}) => {
    return (
        <div onClick={() => setEnable(!isEnable)} className = { [className ? [cl.Switcher , className].join(' ') : cl.Switcher , isEnable ? cl.active : '' ].join(' ')} >
                <div className = {isEnable ? [cl.circle , cl.active].join(' ') : cl.circle}>

                </div>
        </div>
    );
};

export default memo(Switcher);