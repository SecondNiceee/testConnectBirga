import React, { useCallback, useEffect, useState } from "react";
import Top from "../../components/UI/Top/Top";
import { useDispatch, useSelector } from "react-redux";
import AdCreateFunc from "../../components/UI/AdCreateFunc/AdCreateFunc";
import GreyText from "../../components/UI/GreyText/GreyText";
import { changeMenuActive } from "../../store/menuSlice";
import ShablonsWrap from "./components/ShablonsWrap/ShablonsWrap";
import { CSSTransition } from "react-transition-group";
import Shablon from "../Shablon/Shablon";
import { deleteShablon } from "../../store/shablon";
import { useNavigate } from "react-router-dom";
import BackButton from "../../constants/BackButton";
import pagesHistory from "../../constants/pagesHistory";

const AllShablons = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect( () => {
    return () => {
      pagesHistory.push('/AllShablons')
    }
  } , [] )

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
        isActive : true,
        shablon : e,
        put : true
    })
  } , [ setShablon])

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
    
  }, [dispatch])


  useEffect( () => {
    function back(){
      if (shablon.isActive){
          setShablon( (value) =>  ({...value , isActive : false})   )      
      }
      else{
        navigate(-1)
      }
    }
    BackButton.onClick(back)
    return () => {
      BackButton.offClick(back)
    }
  } , [shablon.isActive, navigate] )

  return (
    <div className="all-shablon-wrapper">
      <Top setMenuActive={setMenuActive} name={"Шаблоны откликов"} />

      {shablonsArr.length === 6 ?  <></>
      :
      <AdCreateFunc
        className="all-shablons-func"
        text={"Создать новый шаблон"}
        func={clickOnFunc}
      />
      }

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
        classNames={"left-right"}
        mountOnEnter
        unmountOnExit
        timeout={400}
      >
        <Shablon shablon={shablon.shablon} setActive={(e) => {
          setShablon({...shablon , isActive : e})
        }} setShablon={setShablonFunc} put = {shablon.put} />
      </CSSTransition>
    </div>
  );
};

export default AllShablons;
