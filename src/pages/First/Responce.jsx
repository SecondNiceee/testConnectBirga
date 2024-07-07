import React, { useCallback, useEffect } from "react";
import FirstBlock from "../../components/First/FirstMain/FirstBlock";
import DescriptionAndPhoto from "../../components/UI/DescriptionAndPhoto/DescriptionAndPhoto";
import MakePrivate from "../../components/UI/MakePrivate/MakePrivate";
import { useDispatch, useSelector } from "react-redux";
import ShablinBlock from "./components/ShablonBlock/ShablinBlock";
import axios from "axios";
import { addResponce } from "../../store/information";


let localResponce ;
const Responce = ({ orderInformation, MainButton, responce, setResponce , step, setStep , setDetailsActive  }) => {
  const shablonsArr = useSelector((state) => state.shablon.shablonsArr);
  const dispatch = useDispatch();




  localResponce = responce;

  

  useEffect(() => {
      if (localResponce.text.length < 3 && step === 1){
        MainButton.setParams({
          is_active : false, //неизвесетно
          color : '#2f2f2f',
          text_color : '#606060',
        })
      }
      else{
        if (step === 1){

          MainButton.setParams({
      
            color : '#2ea5ff',
            text_color : '#ffffff',
            is_active : true
            
          })
        }
      }
  } , [responce.text, step, MainButton]) 

  const forwardFunction = useCallback(() => {
    async function postResponce(advertismetId, userId) {
         
      let myFormData = new FormData();
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
        dispatch(addResponce([orderInformation.id , im.data]))
      } catch (e) {
        alert("ничего не вышло");
        console.warn(e);
      } 
    }


    if (step !== 0 && !responce.shablonMaker){
      window.Telegram.WebApp
      .showPopup({
        title: "Откликнуться?",
        message: "Вы действительно хотите откликнуться?",
        buttons: [
          { id: "save", type: "default", text: "Да" },
          { id: "delete", type: "destructive", text: "Нет" },
        ],
      } , (buttonId) => {
  
        if (buttonId === "delete" || buttonId === null) {
          // setShablon({...shablon , isActive : false})
        }
        if (buttonId === "save") {
          postResponce(orderInformation.id, 2144832745 );
          setStep(0)
          setDetailsActive((value) => ({...value , isOpen : false}))
      } })
    }
  }, [responce, step, orderInformation.id, setDetailsActive, setStep, dispatch]);

  useEffect(() => {
    MainButton.onClick(forwardFunction);
    return () => {
      MainButton.offClick(forwardFunction);
    };
  }, [responce, step, MainButton, forwardFunction]);

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
