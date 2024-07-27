import React, { memo, useCallback } from "react";
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
}) => {

  const focuseHandelr = useCallback( () => {
    document.documentElement.style.overflowY = "auto"
    document.documentElement.style.marginTop = "0px"
} , [] )
const unfocusHandler = useCallback( () => {
    
    setTimeout( () => {
        document.documentElement.style.marginTop = "40px"
        window.scrollTo(0,40)
        document.documentElement.style.overflowY = "hidden"
    }, 350 )
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
        <p
          className={cl.inputCounter}
          style={text.length < 500 ? {} : { color: "#8a0303" }}
        >
          {text.length} / 500
        </p>
        <TextArea
        focuseHandelr={focuseHandelr}
        unfocusHandler={unfocusHandler}
          value={text}
          className={cl.DescriptionInput}
          placeholder={textPlaceholder}
          setValue={setText}
        ></TextArea>
      </div>

      {MyInformation ? (
        <GreyText className={cl.SecondGreyText}>{filesTitle}</GreyText>
      ) : (
        ""
      )}
    
        <FileInput
        focuseHandlr={focuseHandelr}
        unFocusHandler={unfocusHandler}
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
