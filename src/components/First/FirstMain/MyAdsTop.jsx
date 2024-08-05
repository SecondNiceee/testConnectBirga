import React, { memo } from "react";
import MyAdsTopRight from "./MyAdsTopRight";

const MyAdsTop = ({isMyAds, isResponce, viewsNumber, responseCounter }) => {
  return (
    <>
      {isMyAds || isResponce ? (
        <div className="myAds__top">
          <p className="myAds__top-left">Активно</p>
          <MyAdsTopRight viewsNumber={viewsNumber} responseCounter={responseCounter} />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default memo(MyAdsTop);
