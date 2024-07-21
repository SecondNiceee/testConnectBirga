import React, { forwardRef, memo, useState } from "react";
import FirstBlock from "./FirstBlock";
import {  useSelector } from "react-redux";
import MyLoader from "../../UI/MyLoader/MyLoader";

const FirstMain = forwardRef(({ ordersInformation, setDetailsActive , setSliderActive, ...props}, ref) => {
  const watchedArr = useSelector(state => state.watchedAds.watchedAds)

  return (
    <div {...props} className="FirstMain">

      {ordersInformation.length === 0 ? (
        <h1 className="EmptyText"> Нет таких предложений </h1>
      ) : (
        ordersInformation.map((e,i) => {

          return <FirstBlock 
          
          setSlideActive={setSliderActive}
          index = {i}
            isWatched={watchedArr.includes(e.id) ? true : false}
           key={i} setDetailsActive={setDetailsActive} task = {e}   {...e} isButton = {true} />;
        })
      )}

<MyLoader ref={ref}    className="block" style={
              {
                bottom : "50px",
                transform : "translateX(-16px)",
                width : "100vw",
                height : "300px"
              }
            }></MyLoader>

    </div>
  );
});

export default memo(FirstMain);
