import React, { forwardRef, memo, useEffect, useState } from "react";
import DescriptionAndPhoto from "../../components/UI/DescriptionAndPhoto/DescriptionAndPhoto";
import MakePrivate from "../../components/UI/MakePrivate/MakePrivate";
import {  useSelector } from "react-redux";
import ShablinBlock from "./components/ShablonBlock/ShablinBlock";
import Block from "../../components/First/Block";
import MainButton from "../../constants/MainButton";


let myResponse = {
  text : "",
  photos : ""
}
const Responce = forwardRef(({ orderInformation, responce, setResponce , left = "100%" , ...props   } , ref) => {
  const shablonsArr = useSelector((state) => state.shablon.shablonsArr);


  const [clearPhoto , setClearPhoto] = useState(1)
  useEffect( () => {
    function func(){
      setClearPhoto(clearPhoto + 1)
    }
    MainButton.onClick(func)
    return () => {
      MainButton.offClick(func)
    }
  } , [clearPhoto , setClearPhoto] )


  return (
    <div ref={ref} {...props} className="responce-wrapper">

      <Block {...orderInformation} />
      <MakePrivate
        isPrivate={responce.isShablon}
        setPrivate={(value) => {
          setClearPhoto(clearPhoto + 1)
          if (value){
            myResponse = {
              text : responce.text,
              photos : responce.photos
            }
            setResponce({
              ...responce,
              isShablon: value,
              text: shablonsArr.length > 0 ?  shablonsArr[responce.shablonIndex].text : "",
              photos: shablonsArr.length > 0 ? shablonsArr[responce.shablonIndex].photos : [],
              name : shablonsArr.length > 0 ? shablonsArr[responce.shablonIndex].name : ""
            });

          }
          else{
            setResponce({
              ...responce,
              isShablon : value,
              text : myResponse.text,
              photos : myResponse.photos,
            })
          }


        }}
        text={"Использовать шаблон"}
        className={"responce-make-private"}
      />
      {responce.isShablon && (
        <ShablinBlock
        clearPhoto = {clearPhoto}
          setClearPhoto = {setClearPhoto}
          left={left}
          responce={responce}
          setResponce={setResponce}
          shablonsArr={shablonsArr}
        />
      ) }
       
          {(shablonsArr.length > 0 || !responce.isShablon) && 
                    <DescriptionAndPhoto
                    clearPhoto={clearPhoto}
                    className={"responce-descriprion"}
                    text={responce.text}
                    photos={responce.photos}
                    textPlaceholder={"Почему задание должны дать именно вам"}
                    textTitle={"ТЕКСТ ОТКЛИКА"}
                    setText={(e) => {
                      setResponce({ ...responce, text: e });
                    }}
                    setPhotos={(e) => {
                      setResponce({ ...responce, photos: e });
                    }}
                  />
          }

     
      
    </div>
  );
} );

export default memo(Responce);
