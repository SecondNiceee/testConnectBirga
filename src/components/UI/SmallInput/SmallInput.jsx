import React, { memo } from 'react';
import cl from './SmallInput.module.css'
const SmallInput = ({value , setValue , ...props}) => {
    console.log('рендер маленького импута')
    return (
        <input {...props}   placeholder='Укажите свой стаж работы в годах' className={cl.smallInput}  value={value} onChange={(e) => {
            setValue(e.target.value)
        }} />
    );
};

export default memo(SmallInput);