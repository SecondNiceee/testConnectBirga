import React, { memo } from 'react';
import AdCreateFunc from '../../../components/UI/AdCreateFunc/AdCreateFunc';
import FirstBlock from '../../../components/First/FirstMain/FirstBlock';

const PickerTwo = ({setSecondPage , deleteFunction, setSliderAcitve , myAdsArray}) => {
    return (
        <div className="picker__block">
        <AdCreateFunc text={"Создать объявление"} link={"/AdCreating"} />
        <div className="AdsContainer">
          {myAdsArray.map((e, i) => {
            return (
              <div
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
                <FirstBlock
                  setSlideActive={setSliderAcitve}
                  myAdsFunc={(value) => {
                    setSecondPage({ isActive: true, task: e, index: i });
                  }}
                  isMyAds={true}
                  deleteFunction={() => {
                    deleteFunction(e);
                  }}
                  key={i}
                  isButton={true}
                  {...e}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
};

export default memo(PickerTwo);