import React, { forwardRef, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import AdCreateFunc from '../../../components/UI/AdCreateFunc/AdCreateFunc';
import FirstBlock from '../../../components/First/FirstMain/FirstBlock';
import MyAnimation from './MyAnimation';
import AdsContainer from './AdsContainer';
import { useDispatch, useSelector } from 'react-redux';
import { getMoreMyAds } from '../../../store/information';
import MyLoader from '../../../components/UI/MyLoader/MyLoader';

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


  const [page , setPage] = useState(0)
  const blockRef = useRef(null)
  const status = useSelector(state => state.information.myOrderStatus)
  const dispatch = useDispatch()
  console.warn(page)
  const onObserve = useCallback( (entries) => {
      const firstEntry = entries[0]
      if (firstEntry.isIntersecting && status !=="all"){
          console.warn("Вызов этоу")
          dispatch(getMoreMyAds(page))
          setPage(page + 1)
      }
  } , [page, setPage] )
  useEffect( () => {
      const observer = new IntersectionObserver(onObserve)
      if (blockRef.current && observer){
          observer.observe(blockRef.current)
      }
    return () => {
      observer.disconnect()
    }
} , [myAdsArray, onObserve] )
    return (
        <div className="picker__block" ref={ref}>
        <AdCreateFunc text={"Создать объявление"} link={"/AdCreating"} />
        {myAdsArray.length === 0 && status === "all" ? 
        <MyAnimation style = {{height : "calc(100vh - 300px)"}} text={text}/>
        :
        <AdsContainer myAdsArray={myAdsArray} setSecondPage={setSecondPage} setSliderAcitve={setSliderAcitve} deleteFunction={deleteFunction} />
        }


        <MyLoader style={
              {
                bottom : "50px",
                transform : "translateX(-16px)",
                width : "100vw",
                height : "300px"
              }} ref={blockRef}  />


      </div>
    );
} );

export default memo(PickerTwo);