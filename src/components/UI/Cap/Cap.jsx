import React, { memo } from 'react';
import cl from './Cap.module.css';
import Text from '../../Text/Text';
const Cap = ({className , step , ...props}) => {
    return (
        <div className = {className ? [className , cl.Cap].join(' ') : cl.Cap}>
            {props.children}
            <div className = {cl.CapStepText}> <Text>{step.toString()}</Text>  / <span>3</span></div>
        </div>
    );
};

export default memo(Cap);