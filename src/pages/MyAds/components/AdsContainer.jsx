import React, { lazy, memo, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import FirstBlock from '../../../components/First/FirstMain/FirstBlock';
import MyFirstBlock from '../../../components/MyAds/MyFirstBlock';
import { LazyLoadComponent, LazyLoadImage } from 'react-lazy-load-image-component';
import LazyLoad from 'react-lazy-load';
import { useInView } from 'react-intersection-observer';
import Block from "./Block"
import MyLoader from '../../../components/UI/MyLoader/MyLoader';
import { useDispatch, useSelector } from 'react-redux';
import { getMoreMyAds } from '../../../store/information';
const AdsContainer = ({myAdsArray, setSecondPage, setSliderAcitve, deleteFunction}) => {
    console.log(myAdsArray)
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