import React, { useEffect, useState } from "react";
import FirstBlock from "../../components/First/FirstMain/FirstBlock";
import Shablon from "./components/Shablon";
import DescriptionAndPhoto from "../../components/UI/DescriptionAndPhoto/DescriptionAndPhoto";
import MakePrivate from "../../components/UI/MakePrivate/MakePrivate";
import AdCreateFunc from "../../components/UI/AdCreateFunc/AdCreateFunc";

const Responce = ({ orderInformation }) => {
  const [shablon, setShablon] = useState(false);
  const [responce, setResponce] = useState({
    text: "",
    photos: [],
  });

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
        <AdCreateFunc text={"Создать шаблон"} link={"/"}  />
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
