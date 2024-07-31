import React, { memo } from "react";
import FirstBlock from "../../components/First/FirstMain/FirstBlock";
import DescriptionAndPhoto from "../../components/UI/DescriptionAndPhoto/DescriptionAndPhoto";
import MakePrivate from "../../components/UI/MakePrivate/MakePrivate";
import {  useSelector } from "react-redux";
import ShablinBlock from "./components/ShablonBlock/ShablinBlock";


let myResponse = {
  text : "",
  photos : ""
}
const Responce = ({ orderInformation, responce, setResponce , left = "100%"   }) => {
  const shablonsArr = useSelector((state) => state.shablon.shablonsArr);



  





  return (
    <div className="responce-wrapper">
      {/* <button
        onClick={() => {
          forwardFunction();
        }}
      >
        Отослать
      </button> */}
      <FirstBlock {...orderInformation} />
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
        <div>
          <DescriptionAndPhoto
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
        </div>
      
    </div>
  );
};

export default memo(Responce);
