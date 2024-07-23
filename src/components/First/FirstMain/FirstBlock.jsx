import React, { lazy, memo, Suspense, useEffect, useState } from "react";
import MyButton from "../../UI/MyButton/MyButton";
import Pallete from "../../UI/Pallete/Pallete";
import ShareIcon from "../../UI/ShareIcon/ShareIcon";
import SmallDimond from "../../UI/SmallDimond/SmallDimond";
import FalseTie from "../../UI/FalseTie/FalseTie";
import { useDispatch, useSelector } from "react-redux";
import { addWatch } from "../../../store/watchedAds";
import options from "../../../constants/options";
import formatDate from "../../../functions/makeDate";
import { useInView } from "react-intersection-observer";

const Block = lazy(() => import('../Block'));

let counter = 0
const FirstBlock = ({
  className,
  taskName,
  time,
  end = false,

  setDetailsActive,
  isButton,
  photos,
  isMyAds,
  deleteFunction,
  myAdsFunc,
  isResponce,
  isWatched,
  index,
  id,
  setSlideActive,
   tonValue,
   task,
   agree = false
   


}) => {



  const props = {
    "className" : className,
    "taskName": taskName,
    "time" : time,
    "end" : end,
    "setDetailsActive" : setDetailsActive,
    "isButton" : isButton,
    "photos" : photos,
    "isMyAds" : isMyAds,
    "deleteFunction" : deleteFunction,
    "myAdsFunc" : myAdsFunc,
    "isResponce" : isResponce,
    "isWatched" : isWatched,
    "index" : index,
    "id" : id,
    "setDetailsActive" : setDetailsActive,
    "setSlideActive" : setSlideActive,
    "tonValue" : tonValue,
    "task" : task,
    "agree" : agree
  }

  const { ref, inView } = useInView({
    threshold: 0, // Порог видимости (от 0 до 1)
  });

  const [isVisible , setVisible] = useState(false)
  useEffect( () => {
    if (inView){
      setVisible(true)
    }
  } , [setVisible , inView] )

  return (
    <div ref={ref} style={!isVisible ? {minHeight : "320px"} : {}} className="wrapper">
      {
        isVisible && (
                <Suspense fallback = {
                  <div style={{minHeight : "320px"}} className="First__block">
                    
                  </div>
                }>
                  <Block {...props}  />
                </Suspense>
        )
      }
    </div>
  );
};

export default memo(FirstBlock);
