import React, { useState, memo, useEffect, useMemo} from "react";

import MyAdsBlock from "./MyAdsBlock";
import PickerContent from "./PickerContent";
import Top from "../../../components/UI/Top/Top";
import { useSelector } from "react-redux";

// const popup = initPopup();
const MyAdOne = ({
  myAdsArray,
  setMenuActive,
  setSecondPage,
  setSliderActive,
}) => {
  console.log('dsa')




  



  let putStatus = useSelector((state) => state.information.putTaskStatus);



  





  useEffect(() => {
    if (putStatus === "error") {
      alert('ничего не сохранилось')
    }
  }, [putStatus]); // проверка на то, что все работает






  const GreyIntWidth = useMemo(() => {
    return (document.documentElement.clientWidth - 36) / 2;
  }, []);
  const GreyWidth = useMemo(() => {
    return GreyIntWidth.toString() + "px";
  }, [GreyIntWidth]);


  const [nowValue , setNowKey] = useState('customer')



  return (
    <div className="my-ad-one">
      <Top name={"Мои задания"} setMenuActive={setMenuActive} />


      <MyAdsBlock setNowKey={setNowKey} nowValue = {nowValue} greyIntWidth={GreyIntWidth} greyWidth={GreyWidth} deals={1} finishedDeals={"0%"} />
      <PickerContent
      nowValue={nowValue}
       setSliderAcitve={setSliderActive}
        myAdsArray={myAdsArray}
        setSecondPage = {setSecondPage}
      />
      


    </div>
  );
};

export default memo(MyAdOne);
