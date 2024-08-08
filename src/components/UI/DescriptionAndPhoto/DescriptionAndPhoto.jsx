import React, { memo, useCallback, useEffect,  useRef } from "react";
import cl from "./DescriptionAndPhoto.module.css";
import GreyText from "../../../components/UI/GreyText/GreyText";
import FileInput from "../../../components/UI/FileInput/FileInput";
import TextArea from "../../../components/UI/TextArea/TextArea";
const DescriptionAndPhoto = ({
  className,
  text,
  photos,
  setText,
  setPhotos,
  MyInformation,
  textTitle,
  filesTitle,
  textPlaceholder,
  fileError,
  clearPhoto,
}) => {

  const hiddenRef = useRef(null)
  const myRef = useRef(null)

  useEffect( () => {
    // textAreaRef.current.style.height = (12 + 11 + 17.6*len).toString() + 'px'
    myRef.current.style.height = (hiddenRef.current.scrollHeight).toString() + 'px'
} , [text] )

  const miniRef = useRef(null)

  const onFocusFunc = useCallback( () => {
    miniRef.current.scrollIntoView({ block: "nearest", behavior: 'smooth' })
  } , [] )

  return (
    <div
      className={
        className
          ? [cl.DescriptionAndPhoto, className].join(" ")
          : cl.DescriptionAndPhoto
      }
    >
      <GreyText className={cl.GreyText}>{textTitle}</GreyText>
      <div className={cl.InputContainer}>
        
        <textarea ref={hiddenRef} value={text} className={cl.hiddenText}/>

        <TextArea
        onFocus = {onFocusFunc}
        ref={myRef}
          value={text}
          className={cl.DescriptionInput}
          placeholder={textPlaceholder}
          setValue={setText}
        ></TextArea>

<p 
ref={miniRef}
          className={cl.inputCounter}
          style={text.length < 500 ? {} : { color: "#8a0303" }}
        >
          {text.length} / 500
        </p>


      </div>

      {MyInformation ? (
        <GreyText className={cl.SecondGreyText}>{filesTitle}</GreyText>
      ) : (
        ""
      )}
    
        <FileInput
        clear= {clearPhoto}
          fileError={fileError}
          setFiles={setPhotos}
          files={photos}
          className={
            MyInformation
              ? [cl.FileInput, cl.marginTop].join(" ")
              : cl.FileInput
          }
        />
    </div>
  );
};

export default memo(DescriptionAndPhoto);
