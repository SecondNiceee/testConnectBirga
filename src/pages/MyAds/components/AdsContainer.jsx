import React, { memo } from 'react';
import FirstBlock from '../../../components/First/FirstMain/FirstBlock';
import MyFirstBlock from '../../../components/MyAds/MyFirstBlock';
import { LazyLoadComponent, LazyLoadImage } from 'react-lazy-load-image-component';
import LazyLoad from 'react-lazy-load';

const AdsContainer = ({myAdsArray, setSecondPage, setSliderAcitve, deleteFunction}) => {
    return (
        <div className="AdsContainer">
          {myAdsArray.map((e, i) => {
            return (
              <div
              style={{
                minHeight : 177
              }}
                key={i}
                className="block"
                onClick={(p) => {
                  if (
                    p.target.closest(".FirstMain__bottom-right") === null &&
                    p.target.closest(".first__photos") === null
                  ) {
                    //  setTask(e);
                    setSecondPage({ isActive: true, task: e, index: i });
                  }
                }}
              >
                <MyFirstBlock

                  setSlideActive={setSliderAcitve}
                  myAdsFunc={(value) => {
                    setSecondPage({ isActive: true, task: e, index: i });
                  }}
                  key={i}
                  isButton={true}
                  {...e}
                />
              </div>
            );
          })}
        </div>
    );
};

export default memo(AdsContainer);