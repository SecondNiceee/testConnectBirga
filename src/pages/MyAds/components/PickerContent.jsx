import React, { memo, useCallback, useEffect,  useRef, useState,  } from "react";

import { useSelector,  } from "react-redux";
import PickerTwo from "./PickerTwo";
import PickerOne from "./PickerOne";
import { CSSTransition } from "react-transition-group";
import PhotosSlider from "../../../components/UI/PhotosSlider/PhotosSlider";
import useSlider from "../../../hooks/useSlider";
import CssTransitionSlider from "../../../components/UI/PhotosSlider/CssTransitionSlider";


const PickerContent = ({
  nowValue,
  setSecondPage,
  valueTwo,
  valueOne,
  setMyResponse,
  responsesArr,
  myAdsArray
}) => {


  

  const buttonFunction = useCallback( (index) => {
      setMyResponse({isOpen : true , id : index})
  } , [setMyResponse]  )





  const containerOne = useRef(null)
  const containerTwo = useRef(null)
  const pickerRef = useRef(null)

  const [viewsNumber, setViewsNumber] = useState(0)


  const advertisementStatus = useSelector(state => state.information.myOrderStatus)

  const responsesStatus = useSelector(state => state.responses.status)
  
  useEffect( () => {
    if (containerOne.current && containerTwo.current){
      if (containerOne.current.offsetHeight < containerTwo.current.offsetHeight){
        if (nowValue === "freelancer"){
          pickerRef.current.style.overflowY = "hidden"
          pickerRef.current.style.minHeight = String(containerOne.current.offsetHeight) + "px"
          
        }
        else{
          pickerRef.current.style.overflowY = "hidden"
          pickerRef.current.style.minHeight = String(containerTwo.current.offsetHeight) + "px"
        }
      }
      else{
        if (nowValue === "customer"){
            pickerRef.current.style.overflowY = "hidden"
            pickerRef.current.style.minHeight = String(containerTwo.current.offsetHeight) + "px"
          
        }
        else{
            pickerRef.current.style.overflowY = "hidden"
            pickerRef.current.style.minHeight = String(containerOne.current.offsetHeight) + "px"
        }
      }
    }

    

    return () => {

    }
  }  , [nowValue, responsesArr, myAdsArray, advertisementStatus, responsesStatus, viewsNumber] )
  

  const {isSliderOpened, photoIndex, photos, setPhotoIndex, setPhotos, setSlideOpened} = useSlider()



  return (
    <>
      <div
      ref={pickerRef}
        className="PickerContent"
        style={
          nowValue === "customer"
            ? { transform: "translateX(-50%)" }
            : { transform: "translateX(0%)" }
        }
      >
        

        <PickerOne setSlideOpened = {setSlideOpened} setPhotos = {setPhotos} setPhotoIndex = {setPhotoIndex}  viewsNumber = {viewsNumber} setViewsNumber = {setViewsNumber} ref={containerOne} oneValue = {valueOne} nowValue = {nowValue}  responsesArr = {responsesArr} buttonFunction = {buttonFunction} />

        <PickerTwo  viewsNumber = {viewsNumber} setViewsNumber = {setViewsNumber} ref={containerTwo} valueTwo = {valueTwo} myAdsArray={myAdsArray} setSecondPage = {setSecondPage}  />

      </div>

      <CssTransitionSlider blockerAll={true} setSliderOpened={setSlideOpened} top={false} leftPosition={0} blockerId={""} isSliderOpened={isSliderOpened}  renderMap={photos} sliderIndex={photoIndex} swiperId={"1"}    />
      
    </>
  );
};

export default memo(PickerContent);
