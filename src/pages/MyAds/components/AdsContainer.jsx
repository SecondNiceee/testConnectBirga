import React, { lazy, memo, Suspense, useCallback, useEffect, useRef, useState } from 'react';

import Block from "./Block"
import MyLoader from '../../../components/UI/MyLoader/MyLoader';

const AdsContainer = ({myAdsArray, setSecondPage, setSliderAcitve, deleteFunction}) => {


    return (
        <div className="AdsContainer">
          {myAdsArray.map((e, i) => {
            return (
                <Block key={i} e={e} i={i} setSecondPage={setSecondPage} setSliderAcitve={setSliderAcitve} />

            );
          })}
          <MyLoader style = {{ height : "90px" , marginLeft : "-16px"}} />
        </div>
    );
};

export default memo(AdsContainer);  