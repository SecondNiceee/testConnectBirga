import React, { useCallback, useEffect, useState } from "react";
import FirstBlock from "../../components/First/FirstMain/FirstBlock";
import Shablon from "./components/Shablon";
import DescriptionAndPhoto from "../../components/UI/DescriptionAndPhoto/DescriptionAndPhoto";
import MakePrivate from "../../components/UI/MakePrivate/MakePrivate";
import AdCreateFunc from "../../components/UI/AdCreateFunc/AdCreateFunc";
import { useDispatch, useSelector } from "react-redux";
import ShablinBlock from "./components/ShablonBlock/ShablinBlock";
import axios from "axios";
const Responce = ({ orderInformation, MainButton, responce, setResponce }) => {
  const shablonsArr = useSelector((state) => state.shablon.shablonsArr);
  const dispatch = useDispatch();



  async function postResponce(advertismetId, userId) {
    let myFormData = new FormData();
    console.log(responce);
    myFormData.append("information", responce.text);

    myFormData.append("userId", userId);
    myFormData.append("advertismentId", advertismetId);

    responce.photos.forEach((e, i) => {
      myFormData.append(`photos`, e);
    });
    try {
      let im = await axios.post(
        "https://back-birga.ywa.su/response",
        myFormData,
        {
          params: {
            userId: userId,
            advertisementId: advertismetId,
          },
        }
      );
    } catch (e) {
      alert("ничего не вышло");
      console.warn(e);
    } 
  }

  console.log(shablonsArr)

  const forwardFunction = useCallback(() => {
    postResponce(orderInformation.id, 2144832745);
  }, [responce]);

  useEffect(() => {
    MainButton.onClick(forwardFunction);
    return () => {
      MainButton.offClick(forwardFunction);
    };
  }, [responce]);

  return (
    <div className="responce-wrapper">
      <button
        onClick={() => {
          forwardFunction();
        }}
      >
        Отослать
      </button>
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

export default Responce;
