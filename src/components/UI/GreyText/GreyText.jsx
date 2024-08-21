import React from 'react';
import cl from './GreyText.module.css'
import Text from '../../Text/Text';
const GreyText = ({className , children, ...props}) => {
    return (
        <Text className= { className ? [cl.GreyText , className].join(' ') : cl.GreyText}>{children}</Text>
    );
};

export default GreyText;