import React, { useCallback, useRef } from 'react';
import classes from  "./MyButton.module.css"
const MyButton = (props , className) => {
    const myRef = useRef(null)
    const vibrate = useCallback( () => {
        window.navigator.vibrate(20);
        myRef.current.style.backgroundColor = "white"
        myRef.current.style.color = "black"
    }  , [])
    const clickHandler = useCallback( (e) => {
        myRef.current.style.backgroundColor = "white"
        myRef.current.style.color = "black"
        
    }  , [])
    const touchEnd = useCallback( (e) => {
        myRef.current.style.backgroundColor = "rgb(46, 165, 255)"
         myRef.current.style.color = "white"
    } )
    return ( 
        <div onClick={vibrate} onTouchEnd={touchEnd} onTouchStart={clickHandler}>
            <button ref={myRef} className={ className ? [classes.MyButton, className].join(' ') : classes.MyButton } {...props}>{props.children}</button>
        </div>
    );
};

export default MyButton;