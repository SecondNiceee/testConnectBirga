import React, { memo, useCallback, useEffect } from "react";
import FirstBlock from "../../components/First/FirstMain/FirstBlock";
import DescriptionAndPhoto from "../../components/UI/DescriptionAndPhoto/DescriptionAndPhoto";
import MakePrivate from "../../components/UI/MakePrivate/MakePrivate";
import { useDispatch, useSelector } from "react-redux";
import ShablinBlock from "./components/ShablonBlock/ShablinBlock";
import axios from "axios";
import { addResponce } from "../../store/information";
import MainButton from "../../constants/MainButton";


let localResponce ;
const Responce = ({ orderInformation, responce, setResponce   }) => {
  const shablonsArr = useSelector((state) => state.shablon.shablonsArr);
  const dispatch = useDispatch();


  localResponce = responce;

  





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
          setResponce({
            ...responce,
            isShablon: value,
            text: shablonsArr.length > 0 ?  shablonsArr[responce.shablonIndex].text : "",
            photos: shablonsArr.length > 0 ? shablonsArr[responce.shablonIndex].photos : [],
            name : shablonsArr.length > 0 ? shablonsArr[responce.shablonIndex].name : ""
          });
        }}
        text={"Использовать шаблон"}
        className={"responce-make-private"}
      />
      {responce.isShablon ? (
        <ShablinBlock
          responce={responce}
          setResponce={setResponce}
          shablonsArr={shablonsArr}
        />
      ) : (
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
      )}
    </div>
  );
};

export default memo(Responce);
