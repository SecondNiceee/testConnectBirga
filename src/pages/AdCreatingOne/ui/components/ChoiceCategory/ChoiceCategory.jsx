import React, { useEffect, useMemo, useState } from "react";
import cl from "./ChoiceCategory.module.css";
import OneInput from "../../../../../components/UI/OneInput/OneInput";
import BackButton from "../../../../../constants/BackButton";
import MainButton from "../../../../../constants/MainButton";
import translation from "../../../../../functions/translate";
import CategoryItem from "../CategoryItem/CategoryItem";
import useBlockInputs from "../../../../../hooks/useBlockInputs";
import { softVibration } from "../../../../../functions/softVibration";
import { disableColorAndActiveButton } from "../../../../../functions/disableColorAndActiveButton";
import { enableColorAndActiveButton } from "../../../../../functions/enableColorAndActiveButton";




const menu = document.documentElement.querySelector(".FirstMenu")
const place = translation("Поиск по категориям")
const ChoiceCategory = ({
  setTaskInformation,
  taskInformation,
  setCatagoryChoiceOpen,
  categorys,
  subCategorys,
  categoryOnly ,
  isBackHide = false,
  designOnly = false,
  text = "Прочие категории скоро появятся..",
  ...props
}) => {

  useEffect( () => {
    document.documentElement.style.overflowY = "hidden"
    return () => {
      document.documentElement.style.overflowY = "auto"
    }
  } , [] )

  useBlockInputs();

  
  const [choisenCategory, setChoisenCategory] = useState(null);

  useEffect( () => {
    function buttonHandler(){
      if(choisenCategory.category === 'Другое'){
        setTaskInformation({ ...taskInformation, category: choisenCategory , subCategory : subCategorys.find(e => e.subCategory === 'Другое')});
    }
    else{
      let sortedCategorys = subCategorys.filter(el => el.category.id === choisenCategory.id)
      setTaskInformation({ ...taskInformation, category: choisenCategory , subCategory : sortedCategorys.find(e => e.subCategory === 'Другое')});
    }
    }
    MainButton.setText("Готово")
    MainButton.onClick(buttonHandler)
    if (!choisenCategory){
      disableColorAndActiveButton()
    }
    else{
      enableColorAndActiveButton()
    }
    return () => {
      enableColorAndActiveButton()
      MainButton.setText("ДАЛЕЕ")
      MainButton.offClick(buttonHandler)
    }
  } , []  )

  const [inputValue, setInputValue] = useState("");

  const realCategorys = useMemo( () => {
    if (!designOnly){
      return categorys
    }
    else{
      return [categorys.find(e => e.id === 2)]
    }
  } , [designOnly , categorys] )
  
  useEffect( () => {
    function closeFunction(){
      setCatagoryChoiceOpen(false)
    }
    BackButton.show()
    BackButton.onClick(closeFunction)
    return () => {
      BackButton.offClick(closeFunction)
      if (isBackHide){
        BackButton.hide()
      }
    }
    // eslint-disable-next-line
  } , [] )


  const myFilteredCategory = useMemo( () => {
    return realCategorys.filter(e =>  translation(e.category).includes(inputValue))
  } , [realCategorys , inputValue] )


  const categoryClickHandler = (category) => () => {
    setChoisenCategory(category);
    softVibration()
  }

  return (
    <div className={cl.ChoiceCategory} {...props}>
      {/* <OneInput
        placeholder={place}
        value={inputValue}
        setInputValue={setInputValue}
        className={cl.OneInput}
      />
      <div className={cl.categoryContainer}>

        {myFilteredCategory.map((e) => {
          return (
            <div
              onClick={() => {
                if(e.category === 'Другое'){
                    setTaskInformation({ ...taskInformation, category: e , subCategory : subCategorys.find(e => e.subCategory === 'Другое')});
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
      <Text className={cl.anotherText}>{text}</Text> */}

      <p className="mt-[31px] ml-[17px] font-sf-pro-display font-light text-[13px] text-[#84898f] uppercase mb-[10px]">КАТЕГОРИИ</p>

        <div className="flex rounded-[10px] bg-[#21303f] flex-col pl-[16px] pr-[16px]">
            {myFilteredCategory.map((category, id) => {
              return (
                <div onClick={categoryClickHandler(category)} className="grid cursor-pointer pt-[10px] grid-cols-[min-content_auto] gap-y-[10px] gap-x-[11px] w-full">
                  <div className="rounded-full border-solid  border-[#384656] border-[1px] w-[20px] h-[20px] self-center flex justify-center items-center">
                    <div className={`w-[80%] h-[80%] bg-blue-600 rounded-full ${choisenCategory?.id === category.id ? "" : "hidden"}`}>

                    </div>
                  </div>
                  <div className="flex flex-col gap-[4px]">
                    <h3 className="font-light  text-[17px] text-white font-sf-pro-text">{category.category}</h3>
                    <p className="font-sf-pro-display font-light  text-[14px] text-[#dbf5ff]">{category.description}</p>
                  </div>
                  <div className={`h-[0.5px] col-start-2 col-end-3 w-[100%] bg-[#384656]  ${id === myFilteredCategory.length-1 ? "opacity-0" : ""}`}></div>
              </div>
              )
            })}
        </div>
      </div>
    );
};

export default ChoiceCategory;
