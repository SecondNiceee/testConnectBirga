import React, { useEffect, useMemo, useRef, useState } from 'react';
import cl from './FullPicker.module.css'
const FullPicker = ({values , keys , nowKey , setNowKey, className , GreyIntWidth, GreyWidth }) => {

    const  MyValues = values.map((e, i) => (
        <p key = {i} className={cl.value} onClick={(e) => {
            setNowKey(keys[i]) 

        } 
        } >
        {e}
         </p>
    ))

    const myTransform = useMemo( () => {
        for (let i = 0; i < keys.length ; i++ ){
            if (nowKey === keys[0]){
                return 'translateX(2px)'
            }
            if (nowKey === keys[i]){
                return 'translateX(' + ((GreyIntWidth*i) + 2).toString() + 'px)'
            }
        }
    } , [nowKey ] )
    return (
        <div   className={className ? [cl.track , className].join(' ') : cl.track}>
            <div style={{width : GreyWidth, transform : myTransform}} className={cl.greyBlock}></div>
                <p style={{zIndex : 10}}   className={cl.value} onClick={(e) => {
                                setNowKey(keys[0]) 
                            } 
                            } >
                            {values[0]}
                    </p>
                <p style={{zIndex : 10}}   className={cl.value} onClick={(e) => {
                            setNowKey(keys[1]) 
                        } 
                        } >
                        {values[1]}
                </p>
        </div>
    );
};

export default FullPicker;