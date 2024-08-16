import React, { memo } from "react";
import MyAdsTopRight from "./MyAdsTopRight";
import Text from "../../Text/Text";

const MyAdsTop = ({isMyAds, isResponce, viewsNumber, responseCounter }) => {
  return (
    <>
      {isMyAds || isResponce ? (
        <div className="myAds__top">
          <Text className="myAds__top-left">Активно</Text>
          <MyAdsTopRight viewsNumber={viewsNumber} responseCounter={responseCounter} />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default memo(MyAdsTop);
