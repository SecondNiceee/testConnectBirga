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

   const myCategorys = useMemo( () => {
    let copy = [...categorys]
    copy.push({id : -1, category : "Все"})
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
        {myCategorys.map((e) => {
          return (
            <div
              onClick={() => {
                if(e.category === 'Другое'){
                    setTaskInformation({ ...taskInformation, category: e , subCategory : subCategorys.find(e => e.subCategory === 'Нет')});
                }
                else{
                  let sortedCategorys = subCategorys.filter(el => el.category.id === e.id)
                  setTaskInformation({ ...taskInformation, category: e , subCategory : sortedCategorys.find(e => e.subCategory === 'Другое')});
                }
                setCatagoryChoiceOpen(false);
              }}
              className={cl.wrap}
            >
              <CategoryItem {...e} />
            </div>
          );
        })}
      </div>
      <p className={cl.anotherText}>Прочие категории скоро появятся...</p>
    </div>
  );
};

export default FirstChoiceCategory;
