import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import cl from "./Choicer.module.css";

import ChoicerInfo from "./ChoicerInfo";
import { useSelector } from "react-redux";
import translation from "../../../functions/translate";
const Choicer = ({ nowKey, keys, setDetails, setResponce, setCard }) => {
  const savedTasks = useSelector((state) => state.saves.tasks);
  const savedResponces = useSelector((state) => state.saves.responces);
  const savedCards = useSelector((state) => state.saves.cards);
  const tasksStatus = useSelector( (state) => state.saves.advertisementStatus )
  const cardsStatus = useSelector( (state) => state.saves.cardsStatus )
  const responsesStatus = useSelector( (state) => state.saves.reponsesStatus )
  const containerOne = useRef(null);
  const containerTwo = useRef(null);
  const containerThree = useRef(null);

  const pickerRef = useRef(null);

  const [viewsNumber, setViewsNumber] = useState(0);

  const textOne = translation("У вас нет сохраненных заказов")
  const textTwo = translation("У вас нет сохраненных откликов")
  const textThree = translation("У вас нет сохраненных кейсов")

  useEffect( () => {
    const elements = document.querySelector('.pickerRef')
    setTimeout( () => {
      if (nowKey === keys[0]){
        if (pickerRef.current && elements[0]){
          pickerRef.current.style.overflowY = "hidden"
          pickerRef.current.style.minHeight = String(elements[0].offsetHeight + 100) + "px"
        }
          }
      if (nowKey === keys[1]){
        alert("Хай хай")
        if (pickerRef.current && elements[1] ){
          alert("nen")
          pickerRef.current.style.overflowY = "hidden"
          pickerRef.current.style.minHeight = String(elements[1].offsetHeight + 100) + "px"}
      }
      if (nowKey === keys[2]){
        if (pickerRef.current && elements[2]){
          pickerRef.current.style.overflowY = "hidden"
          pickerRef.current.style.minHeight = String(elements[2].offsetHeight + 100) + "px"
        }
      }
    } , 1000 ) 

      return () => {

      }
    }  , [nowKey, keys, savedTasks, savedResponces, savedCards, tasksStatus ,cardsStatus , responsesStatus, viewsNumber ] )

  const style = useMemo(() => {
    switch (nowKey) {
      case keys[0]:
        return {
          transform: "translateX(0%)",
        };
      case keys[1]:
        return {
          transform: "translateX(-100vw)",
        };
      case keys[2]:
        return {
          transform: "translateX(-200vw)",
        };
      default:
        return {
          transform: "translateX(0%)",
        };
    }
  }, [keys, nowKey]);

  
  return (
    <div ref={pickerRef} style={style} className={[cl.main, "pickerRef"].join(' ')}>
      <ChoicerInfo
        viewsNumber={viewsNumber}
        setViewsNumber={setViewsNumber}
        ref={containerOne}
        setDetails={setDetails}
        navigate={"task"}
        arr={savedTasks}
        text={textOne}
      />
      <ChoicerInfo
        viewsNumber={viewsNumber}
        setViewsNumber={setViewsNumber}
        ref={containerTwo}
        setResponce={setResponce}
        navigate={"response"}
        arr={savedResponces}
        text={textTwo}
      />
      <ChoicerInfo
        viewsNumber={viewsNumber}
        setViewsNumber={setViewsNumber}
        ref={containerThree}
        setCard={setCard}
        navigate={"card"}
        arr={savedCards}
        text={textThree}
      />
    </div>
  );
};

export default memo(Choicer);
