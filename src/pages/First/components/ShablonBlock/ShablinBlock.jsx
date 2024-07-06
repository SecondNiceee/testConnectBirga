import React, { useState } from "react";
import cl from "./ShablonBlock.module.css";
import Component from "../../../../components/UI/Component/Component";
import AdCreateFunc from "../../../../components/UI/AdCreateFunc/AdCreateFunc";
import { CSSTransition } from "react-transition-group";
import Shablon from "../../../Shablon/Shablon";
import ModalChoicer from "../../../../components/UI/ModalChoicer/ModalChoicer";

const ShablinBlock = ({
  shablonsArr,

  className,
  setResponce,
  responce,
}) => {
  const [shablonSetting, setShablonSetting] = useState({
    text: "",
    name: "",
    photos: [],
  });
  let localShablonSetting = shablonSetting;
  return (
    <div className={className ? [cl.main, className].join(" ") : cl.main}>
      {shablonsArr.length > 0 ? (
        <Component className={cl.component}>
          <p>Шаблон</p>
          {/* <Choicer
            onChoice={(index) => {
              setResponce({
                name: shablonsArr[index].name,
                text: shablonsArr[index].text,
                photos: shablonsArr[index].photos,
                isShablonModalActive: false,
                shablonIndex : index,
                isShablon : true
              });
              
            }}
            isActive={responce.isShablonModalActive}
            setActive={(value) => {
              setResponce({ ...responce, isShablonModalActive: value });
            }}
            text={responce.name}
            arr={shablonsArr.map((e) => e.name)}
          /> */}
          <ModalChoicer
            values={shablonsArr.map((e) => e.id)}
            setValue={(index) => {
              setResponce({
                name: shablonsArr[index - 1].name,
                text: shablonsArr[index - 1].text,
                photos: shablonsArr[index - 1].photos,
                isShablonModalActive: false,
                shablonIndex: index,
                isShablon: true,
              });
            }}
            names={shablonsArr.map((e) => e.name) }
            defaultValue={shablonsArr[0].id}
          />
        </Component>
      ) : (
        <AdCreateFunc
          text={"Создать шаблон"}
          func={() => {
            setResponce({ ...responce, shablonMaker: true });
          }}
        />
      )}

      <CSSTransition
        in={responce.shablonMaker}
        classNames={"shablon"}
        unmountOnExit
        mountOnEnter
      >
        <Shablon
          exitText = "ОТКЛИКНУТЬСЯ"
          isExitShow = {true}
          setActive={() => {
            setResponce({
              ...responce,
              shablonMaker: false,
              text: shablonSetting.text,
              name: shablonSetting.name,
              photos: shablonSetting.photos,
            });
          }}
          style={{ left: "100%" }}
          shablon={localShablonSetting}
          setShablon={setShablonSetting}
        />
      </CSSTransition>
    </div>
  );
};

export default ShablinBlock;
