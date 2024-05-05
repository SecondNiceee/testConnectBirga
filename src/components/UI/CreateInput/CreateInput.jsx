import React, { memo } from 'react';
import cl from './CreateInput.module.css'
const CreateInput = ({className , value , setValue ,  ...props }) => {


    return (
        <input spellCheck="false" autoComplete="off" value={value} onChange={(e) => {
            setValue(e.target.value)}} className = {className ? [cl.CreateInput , className].join(' ') : cl.CreateInput} type="text" {...props}  />
    );
};

export default memo(CreateInput);