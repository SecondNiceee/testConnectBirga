import React, { useCallback, useRef } from "react";
import cl from "./CategoryBlock.module.css";
const CategoryBlock = ({ name, value , func, ...props }) => {

  const myRef = useRef(null)
  const vibrate = useCallback( () => {
      window.navigator.vibrate(50);
      myRef.current.style.backgroundColor = "#3D444E"
      setTimeout( () => {
        myRef.current.style.backgroundColor = "#2e3640"
      } , 100 )
  }  , [])
  const clickHandler = useCallback( (e) => {
    myRef.current.style.backgroundColor = "#3D444E"
      
  }  , [])
  const touchEnd = useCallback( (e) => {
      myRef.current.style.backgroundColor = "#2e3640"
  } , [] )


  return (
    <div ref={myRef} onTouchStart={clickHandler} onTouchEnd={touchEnd} onClick={() => {
        vibrate()
        func()
    }} {...props}  className={cl.wrapper}>
      <div className={cl.left}>
        <p className={cl.name}>{name}</p>
        <p className={cl.value}>{value}</p>
      </div>
      <div className={cl.right}>
        <svg
          width="12"
          height="14"
          viewBox="0 0 12 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.998697 5.46944L5.66536 1.66699L10.332 5.46944"
            stroke="white"
            stroke-width="1.4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M10.3333 8.86455L5.66667 12.667L1 8.86455"
            stroke="white"
            stroke-width="1.4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default CategoryBlock;
