import React, { useEffect, useMemo, useState } from "react";

import BackButton from "../../../../../constants/BackButton";
import MainButton from "../../../../../constants/MainButton";
import translation from "../../../../../functions/translate";
import useBlockInputs from "../../../../../hooks/useBlockInputs";
import { softVibration } from "../../../../../functions/softVibration";
import cl from "../ChoiceCategory/ChoiceCategory.module.css";
import { enableColorAndActiveButton } from "../../../../../functions/enableColorAndActiveButton";
import { disableColorAndActiveButton } from "../../../../../functions/disableColorAndActiveButton";
const menu = document.documentElement.querySelector(".FirstMenu");
const place = translation("Поиск по подкатегориям");
const ChoiceSubCategory = ({
  taskInformation,
  setSubcategoryChoiceOpen,
  setTaskInformation,
  subCategorysPar,
  ...props
}) => {
  useEffect(() => {
    document.documentElement.style.overflowY = "hidden";
    return () => {
      document.documentElement.style.overflowY = "auto";
    };
  }, []);

  useBlockInputs();

  const [choisenSubCategory, setChoisenSubCategory] = useState();

  useEffect(() => {
    function buttonHander() {
      setTaskInformation({ ...taskInformation, subCategory: choisenSubCategory });
      setSubcategoryChoiceOpen(false);
    }
    if (choisenSubCategory){
      enableColorAndActiveButton();
    }
    else{
      disableColorAndActiveButton();
    }
    MainButton.setText("Готово");
    MainButton.onClick(buttonHander);
    MainButton.onClick(buttonHander);
    return () => {
      MainButton.offClick(buttonHander);
      enableColorAndActiveButton();
    };
  }, [choisenSubCategory]);

  useEffect(() => {
    function closeFunction() {
      setSubcategoryChoiceOpen(false);
    }
    BackButton.show();
    BackButton.onClick(closeFunction);
    return () => {
      BackButton.offClick(closeFunction);
    };
    // eslint-disable-next-line
  }, []);

  const subCategorys = useMemo(() => {
    let subCategorysCopy = [];
    if (taskInformation.category.category !== "Другое") {
      subCategorysCopy = [...subCategorysPar].filter(
        (e) =>
          e.category.id === taskInformation.category.id &&
          e.subCategory !== "Другое"
      );
      subCategorysCopy.push(
        subCategorysPar.find(
          (e) =>
            taskInformation.category.id === e.category.id &&
            e.subCategory === "Другое"
        )
      );
    } else {
      subCategorysCopy.push(
        subCategorysPar.find(
          (e) =>
            taskInformation.category.id === e.category.id &&
            e.subCategory === "Другое"
        )
      );
    }
    return subCategorysCopy;
  }, [subCategorysPar, taskInformation]);

  function closeSebCategory() {
    setSubcategoryChoiceOpen(false);
  }

  useEffect(() => {
    BackButton.onClick(closeSebCategory);
    return () => {
      BackButton.offClick(closeSebCategory);
    };
  });

  const subSubcategoryClickHandler = (subCategory) => () => {
    setChoisenSubCategory(subCategory);
    softVibration();
  };

  return (
    // <div className="subCategory__container" {...props}>
    //   <OneInput
    //     placeholder={place}
    //     inputValue={inputValue}
    //     setInputValue={setInputValue}
    //     className='subCategory__oneInput'
    //   />
    //   <div className="sub__block" style={{
    //     paddingBottom : "20px"
    //   }}>
    //         <div className="sub__wrapper">
    //                 {filteredSubCategorys.map((e, id) => {
    //                     return (
    //                         <div key={id}  className="SubBlock" onClick={() => {

    //                                 setTaskInformation( {...taskInformation , subCategory : e})
    //                                 setSubcategoryChoiceOpen(false)}} >

    //                                 <Text>{e.subCategory}</Text>
    //                                 <img className='arrowRight' src={rightArrow} alt="" />
    //                         </div>
    //                     )
    //                 })}
    //         </div>
    //   </div>
    // </div>

    <div className={cl.ChoiceCategory} {...props}>
      <p className="mt-[31px] ml-[17px] font-sf-pro-display font-light text-[13px] text-[#84898f] uppercase mb-[10px]">
        ПОДКАТЕГОРИИ
      </p>

      <div className="flex rounded-[10px] bg-[#21303f] flex-col pl-[16px] pr-[16px]">
        {subCategorys.map((subCategory, id) => {
          return (
            <div
              onClick={subSubcategoryClickHandler(subCategory)}
              className="grid cursor-pointer pt-[10px] grid-cols-[min-content_auto] gap-y-[10px] gap-x-[11px] w-full"
            >
              <div className="rounded-full border-solid  border-[#384656] border-[1px] w-[20px] h-[20px] self-center flex justify-center items-center">
                <div
                  className={`w-[80%] h-[80%] bg-blue-600 rounded-full ${
                    choisenSubCategory?.id === subCategory.id ? "" : "hidden"
                  }`}
                ></div>
              </div>
              <div className="flex flex-col gap-[4px]">
                <h3 className="font-light  text-[17px] text-white font-sf-pro-text">
                  {subCategory.subCategory}
                </h3>
                <p className="font-sf-pro-display font-light  text-[14px] text-[#dbf5ff]">
                  {subCategory.description}
                </p>
              </div>
              <div
                className={`h-[0.5px] col-start-2 col-end-3 w-[100%] bg-[#384656]  ${
                  id === subCategorys.length - 1 ? "opacity-0" : ""
                }`}
              ></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChoiceSubCategory;
