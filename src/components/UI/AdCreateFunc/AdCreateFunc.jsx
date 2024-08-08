import React, { useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import cl from "./AdCreateFunc.module.css";
import plus from "../../../images/icons/plus-circle.svg";
const AdCreateFunc = ({ link, text, func, className, ...props }) => {
  const myRef = useRef(null)
  const vibrate = useCallback( () => {
      window.navigator.vibrate(100);
      if (myRef.current){
          myRef.current.style.backgroundColor = "#3D4855"
      }
      setTimeout( () => {
          if (myRef.current){
              myRef.current.style.backgroundColor = "rgb(32, 48, 63)"
          }
      } , 100 )
      // eslint-disable-next-line 
  }  , [])
  const clickHandler = useCallback( (e) => {
    if (myRef.current){
        myRef.current.style.backgroundColor = "#3D4855"
    }
    // eslint-disable-next-line 
}  , [])
const touchEnd = useCallback( (e) => {
    if (myRef.current){
        myRef.current.style.backgroundColor = "rgb(32, 48, 63)"
    }
}, [] )
  return (
    <>
      {link ? (
        <Link onClick={vibrate} onTouchStart={clickHandler} onTouchEnd={touchEnd} ref={myRef}
          {...props}
          to={link}
          className={
            className
              ? [cl.AdCreactingFunction, className].join(" ")
              : cl.AdCreactingFunction
          }
        >
          <img src={plus} alt="" />
          <p>{text}</p>
        </Link>
      ) : (
        <div ref={myRef} {...props} onClick={func} 
        className={
          className
            ? [cl.AdCreactingFunction, className].join(" ")
            : cl.AdCreactingFunction
        }>
          <img src={plus} alt="" />
          <p>{text}</p>
        </div>
      )}
    </>
  );
};

export default AdCreateFunc;
