import React, { memo } from 'react';
import FirstBlock from '../../../components/First/FirstMain/FirstBlock';
import MyFirstBlock from '../../../components/MyAds/MyFirstBlock';
import { LazyLoadComponent, LazyLoadImage } from 'react-lazy-load-image-component';
import LazyLoad from 'react-lazy-load';
import { useInView } from 'react-intersection-observer';
import Block from './Block';
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