import React, { useEffect, useState } from "react";
import FirstBlock from "../../components/First/FirstMain/FirstBlock";
import Shablon from "./components/Shablon";
import DescriptionAndPhoto from "../../components/UI/DescriptionAndPhoto/DescriptionAndPhoto";
import MakePrivate from "../../components/UI/MakePrivate/MakePrivate";
import AdCreateFunc from "../../components/UI/AdCreateFunc/AdCreateFunc";
import { useSelector } from "react-redux";
import ShablinBlock from "./components/ShablonBlock/ShablinBlock";
let varShablon = false
const Responce = ({ orderInformation , isActive , setActive }) => {
  const [shablon, setShablon] = useState(varShablon);
  const shablonsArr = useSelector(state => state.shablon.shablonsArr)
  console.log(shablonsArr)
  const [responce, setResponce] = useState({
    text: "",
    photos: [],
  });

  varShablon = shablon;


  return (
    <div className="responce-wrapper">
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
