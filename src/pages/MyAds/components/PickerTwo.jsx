import React, { memo } from 'react';
import AdCreateFunc from '../../../components/UI/AdCreateFunc/AdCreateFunc';
import FirstBlock from '../../../components/First/FirstMain/FirstBlock';
import MyAnimation from './MyAnimation';
import AdsContainer from './AdsContainer';

const PickerTwo = ({setSecondPage , deleteFunction, setSliderAcitve , myAdsArray}) => {
    return (
        <div className="picker__block">
        <AdCreateFunc text={"Создать объявление"} link={"/AdCreating"} />
        {myAdsArray.length === 0 ? 
        <MyAnimation style = {{height : "calc(100vh - 300px)"}} text='У вас нету созданных заданий'/>
        :
        <AdsContainer myAdsArray={myAdsArray} setSecondPage={setSecondPage} setSliderAcitve={setSliderAcitve} deleteFunction={deleteFunction} />
        }


      </div>
    );
};

export default memo(PickerTwo);