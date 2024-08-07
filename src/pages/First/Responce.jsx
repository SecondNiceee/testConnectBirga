import React, { forwardRef, memo, useState } from "react";
import FirstBlock from "../../components/First/FirstMain/FirstBlock";
import DescriptionAndPhoto from "../../components/UI/DescriptionAndPhoto/DescriptionAndPhoto";
import MakePrivate from "../../components/UI/MakePrivate/MakePrivate";
import {  useSelector } from "react-redux";
import ShablinBlock from "./components/ShablonBlock/ShablinBlock";
import Block from "../../components/First/Block";


let myResponse = {
  text : "",
  photos : ""
}
const Responce = forwardRef(({ orderInformation, responce, setResponce , left = "100%"   } , ref) => {
  const shablonsArr = useSelector((state) => state.shablon.shablonsArr);


  const [clearPhoto , setClearPhoto] = useState(1)
  




  return (
    <div ref={ref} className="responce-wrapper">

      <Block {...orderInformation} />
      <MakePrivate
        isPrivate={responce.isShablon}
        setPrivate={(value) => {
          
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
          setClearPhoto(clearPhoto + 1)
        }}
        text={"Использовать шаблон"}
        className={"responce-make-private"}
      />
      {responce.isShablon && (
        <ShablinBlock
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
