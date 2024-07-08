import React, { forwardRef, memo } from 'react';
import cl from './SmallInput.module.css'
const SmallInput = forwardRef(({value , setValue,  mistake, mistakeText,  ...props} , ref) => {
    return (
        <>
            <input ref={ref} style={mistake ? {
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
} );

export default memo(SmallInput);