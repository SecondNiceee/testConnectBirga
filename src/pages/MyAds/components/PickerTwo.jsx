import React, { forwardRef, memo} from 'react';
import AdCreateFunc from '../../../components/UI/AdCreateFunc/AdCreateFunc';
import AdsContainer from './AdsContainer';


const PickerTwo = forwardRef(({ valueTwo ,  viewsNumber , setViewsNumber, myAdsArray } , ref) => {

    return (
        <div className="picker__block" ref={ref}>
        <AdCreateFunc text={"Создать объявление"} link={"/AdCreating"} />
        <AdsContainer  valueTwo = {valueTwo}  viewsNumber = {viewsNumber} setViewsNumber = {setViewsNumber} myAdsArray={myAdsArray} />

      </div>
    );
} );

export default memo(PickerTwo);