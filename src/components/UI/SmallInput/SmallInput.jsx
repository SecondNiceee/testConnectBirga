import React, { memo } from 'react';
import cl from './SmallInput.module.css'
const SmallInput = ({value , setValue,  mistake, mistakeText,  ...props}) => {
    return (
        <>
            <input style={mistake ? {
                border : '1px solid #FF6767'
            } :
            {}
        }  {...props}   placeholder='Укажите свой стаж работы в годах' className={cl.smallInput}  value={value} onChange={(e) => {
                setValue(e.target.value)
            }} />
            {mistake ? 
            <p className={cl.mistakeText}>
                {mistakeText}
            </p>
            :
            <> </>
            }
        </>
    );
};

export default memo(SmallInput);