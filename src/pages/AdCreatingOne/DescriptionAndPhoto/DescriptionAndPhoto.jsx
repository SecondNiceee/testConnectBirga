import React from "react";
import cl from "./DescriptionAndPhoto.module.css";
import GreyText from "../../../components/UI/GreyText/GreyText";
import CreateInput from "../../../components/UI/CreateInput/CreateInput";
import FileInput from "../../../components/UI/FileInput/FileInput";
import TextArea from "../../../components/UI/TextArea/TextArea";
import MakePrivate from "../MakePrivate/MakePrivate";
const DescriptionAndPhoto = ({
  className,
  text,
  photos,
  setText,
  setPhotos,
  MyInformation
}) => {

  return (
    <div
      className={
        className
          ? [cl.DescriptionAndPhoto, className].join(" ")
          : cl.DescriptionAndPhoto
      }
    >
      <GreyText className={cl.GreyText}>Описание</GreyText>
      <div className={cl.InputContainer}>
        <p className={cl.inputCounter} style={ text.length < 500 ? {} : {color : '#8a0303'}}>{text.length} / 500</p>
        <TextArea 
          onFocus = { (e) => {
          }}
          value={text}
          className={cl.DescriptionInput}
          placeholder="Дайте подробное тз..."
          setValue = {setText} 
        ></TextArea>
      </div>
      
      {MyInformation ? (<GreyText className={cl.SecondGreyText}>ИЗОБРАЖЕНИЯ</GreyText>) : ''}
      <FileInput setFiles={setPhotos} files = {photos}  className={MyInformation ? [cl.FileInput , cl.marginTop].join(' ') :  cl.FileInput} />
    </div>
  );
};

export default DescriptionAndPhoto;
