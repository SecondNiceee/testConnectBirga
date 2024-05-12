import React, { useEffect, useRef, useState } from "react";
import cl from "./CatchDate.module.css";

import dateIcon from "../../../images/icons/date.svg";
import rightArrow from "../../../images/icons/ArrowRight.svg";
const CatchDate = ({ className , whichOne , state, setState,  ...props }) => {
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
  // console.log(state)

return (
    <div
    {...props}
     style={ whichOne === 'startOnly' ? {} : {transform : getTranslate() }}
      className={className ? [cl.CatchDate, className].join(" ") : cl.CatchDate   }>
        {/* <input type="datetime-local" name="startOnly" />
        <input type="datetime" name='start' />
        <input type="datetime" name="end" /> */}
      <label
      onClick = {() => {
        setState({...state, isOpen : true , isSingleOpen : true})
      }} 
        htmlFor="startOnly" ref={ref1} className={[cl.DateTimePicker , cl.flexStart].join(' ')}   >
        <div className={cl.left}>
          <img className={cl.leftImage} src={dateIcon} alt="" />
          <p className={cl.text}>

             {state.singleTime ? state.singleTime.toLocaleString("ru", options) : 'Дата и время'  } 
          </p>
        </div>
        <img src={rightArrow} alt="" className={cl.arrowRight} />
      </label>

      <div ref={ref2} className={cl.PeriodInput} >

        <div 
              onClick = {() => {
                setState({...state, isOpen : true , isStartOpen : true})
              }} 
         className={cl.DateTimePicker}>
          <div className={cl.left}>
            <img className={cl.leftImage} src={dateIcon} alt="" />
            <p className={cl.text}>
               {state.startTime ? state.startTime.toLocaleString("ru", options) : 'Дата и время начала'  } 
            </p>
          </div>
          <img src={rightArrow} alt="" className={cl.arrowRight} />
        </div>

        <div className={cl.DateTimePicker}
                      onClick = {() => {
                        setState({...state, isOpen : true , isEndOpen : true})
                      }} 
        >
          <div className={cl.left}>
            <img className={cl.leftImage} src={dateIcon} alt="" />
            <p className={cl.text}>

            {state.endTime ? state.endTime.toLocaleString("ru", options) : 'Дата и время конца'  } 
            </p>
          </div>
          <img src={rightArrow} alt="" className={cl.arrowRight} />
        </div>
      </div>

    </div>
  );
};

export default CatchDate;
