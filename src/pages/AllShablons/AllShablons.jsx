import React, { useCallback, useState } from "react";
import Top from "../../components/UI/Top/Top";
import { useDispatch, useSelector } from "react-redux";
import AdCreateFunc from "../../components/UI/AdCreateFunc/AdCreateFunc";
import GreyText from "../../components/UI/GreyText/GreyText";
import { changeMenuActive } from "../../store/menuSlice";
import ShablonsWrap from "./components/ShablonsWrap/ShablonsWrap";
import { CSSTransition } from "react-transition-group";
import Shablon from "../Shablon/Shablon";

const AllShablons = () => {
  const dispatch = useDispatch();

  const isMenuActive = useSelector((state) => state.menu.value);

  const setMenuActive = useCallback(
    (arg) => {
      dispatch(changeMenuActive(arg));
    },
    [dispatch]
  );

  const shablonsArr = useSelector((state) => state.shablon.shablonsArr);

  const [shablon, setShablon] = useState({
    isActive: false,
    shablon: {
      id: 0,
      name: "",
      text: "",
      photos: [],
      photosNames: [],
    },
  });

  function clickOnFunc() {
    setShablon({
      isActive: true,
      shablon: {
        id: 0,
        name: "",
        text: "",
        photos: [],
        photosNames: [],
      },
    });
  }

  function setShablonFunc(e){
    setShablon({
        ...shablon , shablon : e
    })
  }

  console.log(shablonsArr);
  return (
    <div className="all-shablon-wrapper">
      <Top setMenuActive={setMenuActive} name={"Шаблоны откликов"} />

      <AdCreateFunc
        className="all-shablons-func"
        text={"Создать новый шаблон"}
        func={clickOnFunc}
      />

      {shablonsArr.length > 0 ? (
        <GreyText className={"shablon-wrapper-grey"}>
          АКТУАЛЬНЫЕ ШАБЛОНЫ
        </GreyText>
      ) : (
        <></>
      )}

      <ShablonsWrap className={"shablons-wrap"} shablonsArr={shablonsArr} />

      <CSSTransition
        in={shablon.isActive}
        classNames={"add-shablon"}
        mountOnEnter
        unmountOnExit
        timeout={300}
      >
        <Shablon shablon={shablon.shablon} setShablon={setShablonFunc} />
      </CSSTransition>
    </div>
  );
};

export default AllShablons;
