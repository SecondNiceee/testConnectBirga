import React, { useEffect, useMemo, useState } from "react";
import cl from "./ChoiceCategory.module.css";
import OneInput from "../../../components/UI/OneInput/OneInput";
import CategoryItem from "../CategoryItem/CategoryItem";
import BackButton from "../../../constants/BackButton";

const FirstChoiceCategory = ({
  setTaskInformation,
  taskInformation,
  setCatagoryChoiceOpen,
  categorys,
  subCategorys,
  categoryOnly 

}) => {


  useEffect( () => {
    let inputs = document.querySelectorAll("input");
    function addH(){
      window.Telegram.WebApp.HapticFeedback.notificationOccurred("success");
    }
    // Добавляем обработчик события на каждый элемент input, у которого type не равен file
    inputs.forEach(function(input) {
      if (input.type !== "file") {
        input.addEventListener("focus", addH);
      }
    });
    return () => {
      inputs.forEach(function(input) {
        if (input.type !== "file") {
          input.removeEventListener("focus", addH);
        }
      });
    }
  } , [] )

  useEffect( () => {
    const First = document.documentElement.querySelector(".First")
    First.style.overflowY = "hidden"
    return () => {
       First.style.overflowY = "scroll"
    }
  } , [] )

  useEffect( () => {
    function closeFunction(){
      setCatagoryChoiceOpen(false)
    }
    BackButton.show()
    BackButton.onClick(closeFunction)
    return () => {
      BackButton.offClick(closeFunction)
      BackButton.hide()
    }
    // eslint-disable-next-line
  } , [] )

   const myCategorys = useMemo( () => {
    let copy = [...categorys.filter(e => e.category !== "Другое")]
    copy.unshift({id : -1, category : "Все"})
    return copy
   }, [categorys] )
  const [inputValue, setInputValue] = useState("");

  useEffect( () => {
    function closeCategory(){
      setCatagoryChoiceOpen(false)
    }
    BackButton.onClick( closeCategory )
    return () => {
      BackButton.offClick( closeCategory )
    }
  }, [setCatagoryChoiceOpen]  )
  return (
    <div className={cl.ChoiceCategory}>
      <OneInput
        placeholder="Поиск по заданиям"
        value={inputValue}
        setInputValue={setInputValue}
        className={cl.OneInput}
      />
      <div className={cl.categoryContainer}>
        {myCategorys.map((e , i) => {
          return (
            <div key={i}
              onClick={() => {
setTaskInformation({ ...taskInformation, category: e , subCategory : {subCategory : "Все" , id : -1}});
setCatagoryChoiceOpen(false)
              }}
              className={cl.wrap}
            >
              <CategoryItem  {...e} />
            </div>
          );
        })}
      </div>
      <p className={cl.anotherText}>Прочие категории скоро появятся...</p>
    </div>
  );
};

export default FirstChoiceCategory;
