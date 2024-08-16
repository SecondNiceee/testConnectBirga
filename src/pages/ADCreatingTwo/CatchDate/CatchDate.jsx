import React, { useEffect, useRef, useState } from "react";

import dateIcon from "../../../images/icons/date.svg";
import rightArrow from "../../../images/icons/ArrowRight.svg";
import GreyText from "../../../components/UI/GreyText/GreyText";
import './CatchDate.css'
import Text from "../../../components/Text/Text";

let errorDate = new Date(0)
const CatchDate = ({ className , whichOne , state, setState,errors, isMyInformation,  ...props }) => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const [widthOfDocument, setWidthOfDocument] = useState(
    document.documentElement.clientWidth
  );
  useEffect(() => {
    ref1.current.style.minWidth =
      (document.documentElement.clientWidth - 32).toString() + "px";
    ref2.current.style.minWidth =
      (document.documentElement.clientWidth - 32).toString() + "px";
    function addKey() {
      ref1.current.style.minWidth =
        (document.documentElement.clientWidth - 32).toString() + "px";
      ref2.current.style.minWidth =
        (document.documentElement.clientWidth - 32).toString() + "px";
      setWidthOfDocument(document.documentElement.clientWidth);
    }
    window.addEventListener("resize", addKey);
    return () => {
      window.removeEventListener("resize", addKey);
    };
  }, []);
  function getTranslate(){
    return 'translateX(' + (-1)*widthOfDocument.toString() + 'px)'  
  }

  var options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour : 'numeric',
    minute : 'numeric',
    timezone: 'UTC'
  };

return (
    <div
    {...props}
     style={ whichOne === 'startOnly' ? {} : {transform : getTranslate() }}
      id="dateSwapper"
      className={className ? ['CatchDate', className].join(" ") : 'CatchDate'   }>
        {/* <input type="datetime-local" name="startOnly" />
        <input type="datetime" name='start' />
        <input type="datetime" name="end" /> */}
      <label
      onClick = {() => {
        setState({...state, isOpen : true , isSingleOpen : true})
      }} 
        htmlFor="startOnly" ref={ref1} className={['DateTimePicker' , 'flexStart'].join(' ')} 
        style={errors.singleError ? {border : '1px solid #FF6767'} : {}}
        >
        <div className={'left'}>
          <img className={'leftImage'} src={dateIcon} alt="" />
          <Text className={'text'}>

             {state.singleTime ? state.singleTime.toLocaleString("ru", options) : 'Дата и время'  } 
          </Text>
        </div>
        <img src={rightArrow} alt="" className={'arrowRight'} />
      </label>

      <div ref={ref2} className={'PeriodInput'} >
        {isMyInformation ? 

            <GreyText className={'myAdsGreyText'}> НАЧАТЬ:  </GreyText> 
            :
            <></>
        }


        <div 
              onClick = {() => {
                setState({...state, isOpen : true , isStartOpen : true})
              }} 
         className={'DateTimePicker'}   style={errors.startError ? {border : '1px solid #FF6767'} : {}} >
          <div className={'left'}>
            <img className={'leftImage'} src={dateIcon} alt="" />
            <Text className={'text'}>
               {state.startTime && state.startTime.getTime() !== new Date(0).getTime()  ? state.startTime.toLocaleString("ru", options) : 'Дата и время начала'  } 
            </Text>
          </div>
          <img src={rightArrow} alt="" className={'arrowRight'} />
        </div>


        {isMyInformation ? 
        <GreyText className={ 'myAdsGreyTextTwo'} > ДЕДЛАЙН:  </GreyText> 
        :
        <>
        </>
      }
        <div className={'DateTimePicker'}
                      onClick = {() => {
                        setState({...state, isOpen : true , isEndOpen : true})
                      }} 
                      style={errors.endError ? {border : '1px solid #FF6767'} : {}}
        >
          
          <div className={'left'}>
            <img className={'leftImage'} src={dateIcon} alt="" />
            <Text className={'text'}>

            {state.endTime && String(state.endTime) !== String(errorDate) ? state.endTime.toLocaleString("ru", options) : 'Дата и время дедлайна'  } 
            </Text>
          </div>
          <img src={rightArrow} alt="" className={'arrowRight'} />
        </div>
      </div>

    </div>
  );
};

export default CatchDate;
