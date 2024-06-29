import React, { useCallback, useEffect, useState } from "react";
import FirstBlock from "../../components/First/FirstMain/FirstBlock";
import Shablon from "./components/Shablon";
import DescriptionAndPhoto from "../../components/UI/DescriptionAndPhoto/DescriptionAndPhoto";
import MakePrivate from "../../components/UI/MakePrivate/MakePrivate";
import AdCreateFunc from "../../components/UI/AdCreateFunc/AdCreateFunc";
import { useDispatch, useSelector } from "react-redux";
import ShablinBlock from "./components/ShablonBlock/ShablinBlock";
import axios from "axios";
let varShablon = false
const Responce = ({ orderInformation , isActive , setActive, MainButton }) => {
  const [shablon, setShablon] = useState(varShablon);
  const shablonsArr = useSelector(state => state.shablon.shablonsArr)
  const dispatch = useDispatch()
  const [responce, setResponce] = useState({
    text: "",
    photos: [],
  });

  varShablon = shablon;

  async function postResponce(advertismetId , userId){
    let myFormData = new FormData()
    myFormData.append("information" , responce.text)
    responce.photos.forEach((e, i) => {
      myFormData.append(`photos[${i}]` , e)
    })
    try{
      let im = await axios.post("https://back-birga.ywa.su/responce" , myFormData , {
        params : {
          "userId" : userId,
          "advertismentId" : advertismetId
        }
      })
    }
    catch(e){
      alert('ничего не вышло')
      console.warn(e)
    }
  }

  const forwardFunction = useCallback( () => {
    postResponce(orderInformation.id , 2144832745 )
  } , [] )

  useEffect( () => {
    MainButton.onClick(forwardFunction)
    return () => {
      MainButton.offClick(forwardFunction)
    }
  } , [] )


  return (
    <div className="responce-wrapper">
      <button onClick={() => {
        forwardFunction()
      }}>Отослать</button>
      <FirstBlock {...orderInformation} />
      <MakePrivate
        isPrivate={shablon}
        setPrivate={() => {
          setShablon(!shablon);
        }}
        text={"Использовать шаблон"}
        className={"responce-make-private"}
      />
      {shablon ? (
       <ShablinBlock isActive={isActive} setActive={setActive} shablonsArr={shablonsArr.map(e => e.name)} />
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
