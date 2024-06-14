import React, { useEffect, useRef } from "react";
import cl from "./SmallTextarea.module.css";
const SmallTextarea = ({ value, setValue, className }) => {
    const textAreaRef = useRef(null)
    useEffect( () => {
        let len = value.split(/\r\n|\r|\n/).length
        // textAreaRef.current.style.height = (12 + 11 + 17.6*len).toString() + 'px'
        console.log(textAreaRef.current.scrollHeight)
        console.log(textAreaRef.current.offsetHeight)
        if (textAreaRef.current.scrollHeight > textAreaRef.current.offsetHeight ){
            textAreaRef.current.style.height = (textAreaRef.current.scrollHeight).toString() + 'px'
        }

    } , [value] )
  return (
    <>
    <textarea
    ref={textAreaRef}
        className = {className ? [className, cl.textArea].join(' ') : cl.textArea}
      placeholder="Опишите свой опыт и подход к работе"
      value={value}
      onChange={(e) => {
        setValue(e.target.value)
      }}
      name=""
      id=""
    //   onBlur={(e) => {
    //     let stringWithoutEmptyLines = value.replace(/\s+/g, " ").trim();
    //     setValue(stringWithoutEmptyLines)
    //   }}
    />
    </>
  );
};

export default SmallTextarea;
