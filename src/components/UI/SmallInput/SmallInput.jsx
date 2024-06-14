import React from 'react';
import cl from './SmallInput.module.css'
const SmallInput = ({value , setValue}) => {
    return (
        <input placeholder='Укажите свой стаж работы в годах' className={cl.smallInput} type="number" value={value} onChange={(e) => {
            setValue(e.target.value)
        }} />
    );
};

export default SmallInput;