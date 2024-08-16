import React, { memo, useState } from "react";
import cl from "./ShablonBlock.module.css";
import Component from "../../../../components/UI/Component/Component";
import AdCreateFunc from "../../../../components/UI/AdCreateFunc/AdCreateFunc";
import { CSSTransition } from "react-transition-group";
import Shablon from "../../../Shablon/Shablon";
import ModalChoicer from "../../../../components/UI/ModalChoicer/ModalChoicer";
import Text from "../../../../components/Text/Text";
import translation from "../../../../functions/translate";


const exitText = translation("ОТКЛИКНУТЬСЯ")
const ShablinBlock = ({
  shablonsArr,
  left = "100%",
  className,
  setResponce,
  responce,
  setClearPhoto,
  clearPhoto
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
          <Text>Шаблон</Text>
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
            values={shablonsArr.map((e , i) => i)}
            setValue={(index) => {
              setClearPhoto(clearPhoto + 1)
              setResponce({
                name: shablonsArr[index].name,
                text: shablonsArr[index].text,
                photos: shablonsArr[index].photos,
                isShablonModalActive: false,
                shablonIndex: index,
                isShablon: true,
              });
            }}
            names={shablonsArr.map((e) => e.name) }
            defaultValue={0}
          />
        </Component>
      ) : (
        <AdCreateFunc
          text={"Создать шаблон"}
          func={() => {
            setResponce((value) =>  ({ ...value , shablonMaker: true }));
          }}
        />
      )}

      <CSSTransition
        in={responce.shablonMaker}
        timeout={400}
        classNames={"left-right"}
        unmountOnExit
        mountOnEnter
      >
        <Shablon
        
          exitText = {exitText}
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
          shablon={localShablonSetting}
          setShablon={setShablonSetting}
        />
      </CSSTransition>
    </div>
  );
};

export default memo(ShablinBlock);
