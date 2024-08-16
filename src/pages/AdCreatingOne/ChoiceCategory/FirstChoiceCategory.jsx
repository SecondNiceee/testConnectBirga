import React, { useEffect, useMemo, useState } from "react";
import cl from "./ChoiceCategory.module.css";
import OneInput from "../../../components/UI/OneInput/OneInput";
import CategoryItem from "../CategoryItem/CategoryItem";
import BackButton from "../../../constants/BackButton";
import Text from "../../../components/Text/Text";

const FirstChoiceCategory = ({
  setTaskInformation,
  taskInformation,
  setCatagoryChoiceOpen,
  categorys,
  subCategorys,
  categoryOnly ,
  ...props 

}) => {


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
    <div {...props} className={cl.ChoiceCategory}>
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
      <Text className={cl.anotherText}>Прочие категории скоро появятся...</Text>
    </div>
  );
};

export default FirstChoiceCategory;
