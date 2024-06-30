import React, { useState } from "react";
import cl from "./ShablonBlock.module.css";
import Component from "../../../../components/UI/Component/Component";
import AdCreateFunc from "../../../../components/UI/AdCreateFunc/AdCreateFunc";
import Choicer from "../../../../components/UI/Choicer/Choicer";
import { CSSTransition } from "react-transition-group";
import Shablon from "../../../Shablon/Shablon";

const ShablinBlock = ({
  shablonsArr,

  className,
  setResponce,
  responce,
  
}) => {
    const [shablonSetting , setShablonSetting] = useState(
        {
            text : "",
            name : "",
            photos : []
        }
    )
    let localShablonSetting = shablonSetting
  return (
    <div className={className ? [cl.main, className].join(" ") : cl.main}>
      {shablonsArr.length > 0 ? (
        <Component className={cl.component}>
          <p>Шаблон</p>
          <Choicer
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
          />
        </Component>
      ) : (
        <AdCreateFunc text={"Создать шаблон"} func={() => {
            setResponce({...responce , shablonMaker : true})
        }} />
      )}

      <CSSTransition in = {responce.shablonMaker} 
      classNames={"shablon"} unmountOnExit mountOnEnter>
            <Shablon setActive={() => {
                setResponce({...responce, 
                    shablonMaker : false,
                    text : shablonSetting.text,
                    name : shablonSetting.name,
                    photos : shablonSetting.photos
                })
            }} style = {{left : "100%"}} shablon={localShablonSetting} setShablon={setShablonSetting} />
      </CSSTransition>
    </div>
  );
};

export default ShablinBlock;
