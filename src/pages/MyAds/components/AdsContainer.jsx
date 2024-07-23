import React, { lazy, memo, Suspense, useCallback, useEffect, useRef, useState } from 'react';

import Block from "./Block"

const AdsContainer = ({myAdsArray, setSecondPage, setSliderAcitve, deleteFunction}) => {


    return (
        <div className="AdsContainer">
          {myAdsArray.map((e, i) => {
            return (
                <Block key={i} e={e} i={i} setSecondPage={setSecondPage} setSliderAcitve={setSliderAcitve} />

            );
          })}
          
        </div>
    );
};

export default memo(AdsContainer);  