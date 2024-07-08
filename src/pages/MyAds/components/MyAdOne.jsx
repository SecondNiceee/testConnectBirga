import React, { useState, memo, useEffect, useCallback, useMemo} from "react";

import MyAdsBlock from "./MyAdsBlock";
import PickerContent from "./PickerContent";
import AdCreatingOne from "../../AdCreatingOne/AdCreatingOne/AdCreatingOne";
import { CSSTransition } from "react-transition-group";
import Top from "../../../components/UI/Top/Top";
import BackButton from "../../../constants/BackButton";

// import { initPopup } from "@tma.js/sdk";
import {  putMyTask } from "../../../store/information";
import { useDispatch, useSelector } from "react-redux";
import sortFiles from "../../../functions/sortFiles";
// const popup = initPopup();
let detailsVar;
const MyAdOne = ({
  myAdsArray,
  setMenuActive,
  setSecondPage,
  setDetails,
  secondPage,
  setSliderActive
}) => {
  console.log('dsa')


  const setDetailsActive = useCallback( (value) => {
    setDetails( e =>  ({...e , isActive : value}))
  } , [ setDetails] )

  


  const dispatch = useDispatch();

  let putStatus = useSelector((state) => state.information.putTaskStatus);



  





  useEffect(() => {
    if (putStatus === "error") {
      alert('ничего не сохранилось')
    }
  }, [putStatus]); // проверка на то, что все работает






  // useEffect( () => {
    
  //   if (details.isActive) {
  //     BackButton.show();
  //     BackButton.onClick(save);
  //   } 
  //   return () => {
  //     BackButton.offClick(save);
  //   }
  // } , [details.isActive,save]) // логика кнопок

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
      {/* <button style={{
        position : 'absolute',
        zIndex : '3000'
      }} onClick={() => {
        if (checkMistakes(detailsVar.task)) {
          let myFormData = new FormData();
          myFormData.append('title' , detailsVar.task.taskName)
          myFormData.append('description' , detailsVar.task.taskDescription)
          myFormData.append("deadline" , 1)
          myFormData.append("price" , detailsVar.task.tonValue )
          myFormData.append("startTime" , detailsVar.task.time.start)
          myFormData.append("endTime" , detailsVar.task.time.end)

          let files = sortFiles(detailsVar.task.photosNames ,  detailsVar.task.photos)


            for (let i = 0; i <  files.removedArr.length; i++){
              myFormData.append(`deleteFiles[${i}]` , files.removedArr[i])
            }
            for (let i = 0; i < files.addedArr.length ; i++){
              myFormData.append(`addFiles[${i}]` , files.addedArr[i] )
            }

          dispatch(putMyTask([myFormData, detailsVar.task.id , detailsVar.task]))

          
          setDetails( {...details,
            isActive : false,
          } )

        }

        }
        

      }>Save</button> */}

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
