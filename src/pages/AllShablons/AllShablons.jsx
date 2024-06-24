import React, { useCallback, useState } from "react";
import Top from "../../components/UI/Top/Top";
import { useDispatch, useSelector } from "react-redux";
import AdCreateFunc from "../../components/UI/AdCreateFunc/AdCreateFunc";
import GreyText from "../../components/UI/GreyText/GreyText";
import { changeMenuActive } from "../../store/menuSlice";
import ShablonsWrap from "./components/ShablonsWrap/ShablonsWrap";
import { CSSTransition } from "react-transition-group";
import Shablon from "../Shablon/Shablon";
import { deleteShablon } from "../../store/shablon";

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
    put : false
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
      put : false
    });
  }

  function setShablonFunc(e){
    setShablon({
        ...shablon , shablon : e
    })
  }

  const putFunction = useCallback((e) => {
    setShablon({
        isActive : true ,
        shablon : e,
        put : true
    })
  } , [shablon, setShablon])

  const deleteFunction = useCallback((e) => {
    window.Telegram.WebApp
    .showPopup({
      title: "Удалить?",
      message: "Вы хотите удалить этот шаблон?",
      buttons: [
        { id: "save", type: "default", text: "Да" },
        { id: "delete", type: "destructive", text: "Нет" },
      ],
    } , (buttonId) => {

      if (buttonId === "delete" || buttonId === null) {
        // setShablon({...shablon , isActive : false})
      }
      if (buttonId === "save") {

        dispatch(deleteShablon(e.id))
    } })
    
  })

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

      <ShablonsWrap deleteFunction = {deleteFunction} className={"shablons-wrap"} shablonsArr={shablonsArr} putFunction = {putFunction}  />

      <CSSTransition
        in={shablon.isActive}
        classNames={"add-shablon"}
        mountOnEnter
        unmountOnExit
        timeout={300}
      >
        <Shablon shablon={shablon.shablon} setShablon={setShablonFunc} put = {shablon.put} />
      </CSSTransition>
    </div>
  );
};

export default AllShablons;
