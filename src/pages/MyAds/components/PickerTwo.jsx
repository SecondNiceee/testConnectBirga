import React, { forwardRef, memo, useMemo,  } from 'react';
import AdCreateFunc from '../../../components/UI/AdCreateFunc/AdCreateFunc';
import MyAnimation from './MyAnimation';
import AdsContainer from './AdsContainer';
import { useSelector } from 'react-redux';

const PickerTwo = forwardRef(({setSecondPage , deleteFunction, setSliderAcitve , myAdsArray, valueTwo} , ref) => {
  const text = useMemo( () => {
    switch (valueTwo){

      case "all":
        return "У вас нет созданных заданий"
      case "active":
        return "У вас нет активных заданих"
      case "inProcess":
        return "У вас нет заданий в работе"
      case "completed":
        return "У вас нет завершенных заданий"
    }
  } , [valueTwo] )


  const status = useSelector(state => state.information.myOrderStatus)

    return (
        <div className="picker__block" ref={ref}>
        <AdCreateFunc text={"Создать объявление"} link={"/AdCreating"} />
        {myAdsArray.length === 0 && status === "all" ? 
        <MyAnimation style = {{height : "calc(100vh - 300px)"}} text={text}/>
        :
        <AdsContainer myAdsArray={myAdsArray} setSecondPage={setSecondPage} setSliderAcitve={setSliderAcitve} deleteFunction={deleteFunction} />
        }





      </div>
    );
} );

export default memo(PickerTwo);