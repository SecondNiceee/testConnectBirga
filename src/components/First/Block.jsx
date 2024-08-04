import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import MyButton from "../UI/MyButton/MyButton";
import Pallete from "../UI/Pallete/Pallete";
import ShareIcon from "../UI/ShareIcon/ShareIcon";
import SmallDimond from "../UI/SmallDimond/SmallDimond";
import FalseTie from "../UI/FalseTie/FalseTie";
import { addWatch } from "../../store/watchedAds";
import formatDate from "../../functions/makeDate";
import Photos from "./FirstMain/Photos";
import MyAdsTop from "./FirstMain/MyAdsTop";
import FirstMainTop from "./FirstMain/FirstMainTop";
import FirstMainMiddle from "./FirstMain/FirstMainMiddle";
import FirstMainBottomLeft from "./FirstMain/FirstMainBottomLeft";
import QOne from "./FirstMain/QOne";
import QTwo from "./FirstMain/QTwo";
import QThree from "./FirstMain/QThree";
import QFour from "./FirstMain/QFour";
import MainBottomRight from "./FirstMain/MainBottomRight";
import MainBottom from "./FirstMain/MainBottom";

const Block = ({
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
  agree = false,
  responseCounter,
  viewsNumber,
  category,
}) => {
  const dispatch = useDispatch();
  const tonConstant = useSelector((state) => state.ton.value);

  return (
    <>
      {photos && (
        <div
          className={
            className ? ["First__block", className].join(" ") : "First__block"
          }
        >
          <Photos photos={photos} />

          <MyAdsTop isMyAds={isMyAds} isResponce={isResponce} viewsNumber={viewsNumber} responseCounter={responseCounter} />

          <FirstMainTop isMyAds={isMyAds} category={category} isWatched={isWatched} taskName={taskName} id={id}  end={end} />

          <FirstMainMiddle time={time} />

          <MainBottom 
          {...{tonConstant, tonValue, isMyAds, myAdsFunc, isButton, end, id, agree, task, isResponce, setDetailsActive,index, dispatch,deleteFunction}}
            />
        </div>
      ) 
    }
    </>
  );
};

export default memo(Block);
