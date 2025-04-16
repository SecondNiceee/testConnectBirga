import React, { useEffect, useMemo, useState } from "react";
import cl from "./ChoiceCategory.module.css";
import CategoryItem from "../CategoryItem/CategoryItem";
import translation from "../../../../../functions/translate";
import Text from "../../../../../components/Text/Text";
import BackButton from "../../../../../constants/BackButton";
import OneInput from "../../../../../components/UI/OneInput/OneInput";
import MainButton from "../../../../../constants/MainButton";
import { enableColorAndActiveButton } from "../../../../../functions/enableColorAndActiveButton";
import { disableColorAndActiveButton } from "../../../../../functions/disableColorAndActiveButton";

const place = translation("Поиск по категориям")

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

  const [choisenCategory, setChoisenCategory] = useState();

  useEffect( () => {
    function buttonHandler(){
      setTaskInformation({...taskInformation, category : choisenCategory})
      setCatagoryChoiceOpen(false);
    }
    if (choisenCategory){
      enableColorAndActiveButton();
    }
    else{
      disableColorAndActiveButton();
    }
    MainButton.show();
    MainButton.setText("Готово")
    MainButton.onClick(buttonHandler)
    return () => {
      MainButton.hide();
      MainButton.offClick(buttonHandler)
    }
  } , [taskInformation,choisenCategory] )

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

  console.log(myCategorys)

  const myFilteredCategory = useMemo( () => {
    return myCategorys.filter(e =>  translation(e.category).includes(inputValue))
  } , [myCategorys , inputValue] )


  const clickHandler = (category) => () => {
    setChoisenCategory(category);
  }

  const clickAll = () => {
    setTaskInformation({...taskInformation, category : { id: -1, category: "Все" }})
    setCatagoryChoiceOpen(false);
  }

  return (
    <div className={cl.ChoiceCategory} {...props}>

      <p className="mt-[13px] ml-[17px] font-sf-pro-display-400 font-extralight text-[13px] tracking-[0.02em] text-[#84898f] uppercase mb-[9px]">КАТЕГОРИИ</p>

        <div className="flex rounded-[10px] bg-[#21303f] flex-col pt-[13px] pl-[16px] pr-[16px]">
            <p onClick={() => {clickAll()}} className="font-sf-pro-text-400 cursor-pointer tracking-[-0.04em] text-[17px] text-[#2ea6ff]">Выбрать всё</p>
            <div  className={`h-[0.5px] cursor-pointer mt-[11px] col-start-2 col-end-3 w-[100%] bg-[#384656]`}></div>
            {myFilteredCategory.map((category, id) => {
              return (
                <>
                {category.category !== "Все" ? 
                <div onClick={clickHandler(category)} className="grid cursor-pointer pt-[13px] grid-cols-[min-content_auto] gap-y-[10px] gap-x-[11px] w-full">
                  <div className={`rounded-full border-solid border-[1px] w-[21px] h-[21px] self-center flex justify-center items-center ${choisenCategory?.id === category.id ?  "bg-[#2EA6FF] border-[#2EA6FF] " : "border-[#384656]"}`}>
                      <svg className={`${choisenCategory?.id === category.id ? "" : "hidden"}`} width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.19553 10.5012C3.89935 10.5012 3.64759 10.3745 3.44027 10.1209L0.563626 6.60418C0.482176 6.50864 0.42294 6.41493 0.385918 6.32306C0.352598 6.23119 0.335938 6.13565 0.335938 6.03643C0.335938 5.81595 0.409982 5.63405 0.558072 5.49073C0.706162 5.34742 0.893125 5.27576 1.11896 5.27576C1.37442 5.27576 1.58915 5.38417 1.76315 5.60098L4.17331 8.63263L8.87702 1.23539C8.97327 1.0884 9.07323 0.985509 9.1769 0.926714C9.28056 0.864243 9.41014 0.833008 9.56563 0.833008C9.79147 0.833008 9.97658 0.902828 10.121 1.04247C10.2654 1.18211 10.3376 1.36033 10.3376 1.57714C10.3376 1.66534 10.3227 1.75353 10.2931 1.84172C10.2635 1.92992 10.2172 2.02178 10.1543 2.11733L4.95634 10.0989C4.77863 10.3671 4.52503 10.5012 4.19553 10.5012Z" fill="white" stroke="white" stroke-width="0.333387" />
                      </svg>
                  </div>
                  <div className="flex flex-col gap-[3px]">
                    <h3  className="font-light tracking-[-3.6%]  text-[17px] text-white font-sf-pro-text-400 leading-[17px]">{category.category}</h3>
                    <p className="font-sf-pro-display-400 font-light tracking-[1%] leading-[17.7px] text-[14px] text-[#dbf5ff]">{category.description}</p>
                  </div>
                  <div className={`h-[0.5px] col-start-2 col-end-3 w-[100%] bg-[#384656]  ${id === myFilteredCategory.length-1 ? "opacity-0" : ""}`}></div>
              </div>
              :
              <>
              </>
                }
              </>
              )
              
            })}
        </div>
      </div>
  );
};

export default FirstChoiceCategory;
