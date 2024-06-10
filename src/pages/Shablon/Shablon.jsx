import React, { useState } from "react";
import TaskName from "../../components/UI/TaskName/TaskName";
import DescriptionAndPhoto from "../../components/UI/DescriptionAndPhoto/DescriptionAndPhoto";

const Shablon = () => {
  const [shablon, setShablon] = useState({
    title: "",
    text: "",
    photos: [],
  });
  return (
    <div className="shablon-wrapper">
      <h3 className="shablon-title">Новый шаблон</h3>
      <TaskName
        className={"shablon-name"}
        title={"НАЗВАНИЕ ШАБЛОНА"}
        text={shablon.title}
        setText={(e) => {
          setShablon({ ...shablon, title: e });
        }}
        errorValue={false}
        underText={""}
      />
      <DescriptionAndPhoto
      className={'shablon-description'}
        text={shablon.text}
        setText={(e) => {
          setShablon({ ...shablon, text: e });
        }}
        photos={shablon.photos}
        setPhotos={(e) => {
          setShablon({ ...shablon, photos: e });
        }}
        textTitle={"ТЕКСТ ОТКЛИКА"}
        filesTitle={""}
        MyInformation={false}
        textPlaceholder={"Почему задание нужно доверить именно вам"}
      />

      <p className="shablon-notice">
        Расскажите о себе и своем опыте работы Прикрепите примеры
      </p>



    </div>
  );
};

export default Shablon;
