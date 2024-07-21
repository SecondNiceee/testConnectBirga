import React, { memo, useState } from "react";
import FirstBlock from "./FirstBlock";
import {  useSelector } from "react-redux";

const FirstMain = ({ ordersInformation, setDetailsActive , setSliderActive, ...props}) => {
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

    </div>
  );
};

export default memo(FirstMain);
