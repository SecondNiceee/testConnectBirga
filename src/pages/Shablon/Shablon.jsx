import React, { useEffect, useState } from "react";
import TaskName from "../../components/UI/TaskName/TaskName";
import DescriptionAndPhoto from "../../components/UI/DescriptionAndPhoto/DescriptionAndPhoto";
import BackButton from "../../constants/BackButton";
import { useNavigate } from "react-router-dom";
import MainButton from "../../constants/MainButton";

const Shablon = () => {
  const [shablon, setShablon] = useState({
    title: "",
    text: "",
    photos: [],
  });
  const navigate = useNavigate()
  useEffect( () => {
    function goBack(){
      navigate(-1)
    }
    function forward(){
      alert('Арсен еще не сделал')
    }
    BackButton.show()
    MainButton.show()
    MainButton.setText('Добавить шаблон')
    BackButton.onClick(goBack)
    MainButton.onClick(forward)
    return () => {
      MainButton.offClick(forward)
      BackButton.offClick(goBack)
      MainButton.hide()
    }
  }, [navigate])
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
