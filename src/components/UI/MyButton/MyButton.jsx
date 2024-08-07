import React, { useCallback, useRef } from 'react';
import classes from  "./MyButton.module.css"
const MyButton = (props , className) => {
    const myRef = useRef(null)
    const vibrate = useCallback( () => {
        window.navigator.vibrate(50);
        myRef.current.style.backgroundColor = "#47A2E7"
        myRef.current.style.color = "#E6E6E7"
        setTimeout( () => {
        myRef.current.style.backgroundColor = "rgb(46, 165, 255)"
         myRef.current.style.color = "white"
        } , 100 )
    }  , [])
    const clickHandler = useCallback( (e) => {
        myRef.current.style.backgroundColor = "#47A2E7"
        myRef.current.style.color = "#E6E6E7"
        
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