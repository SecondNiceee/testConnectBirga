import React, { useCallback, useRef } from "react";
import cl from "./Categories.module.css";

const Categories = ({
  className,
  taskInformation,
  setCatagoryChoiceOpen,
  setSubcategoryChoiceOpen,
  categorys,
  subCategorys,
  categoryOnly,
}) => {
  function format(arg) {
    if (arg) {
      let str = arg.split(" ");
      let rezult = "";
      for (let word of str) {
        if (rezult.length < 15) {
          rezult += word + " ";
        } else {
          rezult = rezult.slice(0, rezult.length - 1);
          if (rezult[rezult.length - 1] === ",") {
            rezult = rezult.slice(0, rezult.length - 1);
          }
          rezult += "..";
          break;
        }
      }

      return rezult;
    }
    return "";
  }

  const topRef = useRef(null);
  const bottomRef = useRef(null);
  const topVibrate = useCallback(() => {
    if (topRef.current) {
      topRef.current.style.backgroundColor = "#3D4855";
    }
    setTimeout(() => {
      if (topRef.current) {
        topRef.current.style.backgroundColor = "rgb(32, 48, 63)";
      }
    }, 100);
    // eslint-disable-next-line
  }, []);
  const topClickHandler = useCallback((e) => {
    if (topRef.current) {
      topRef.current.style.backgroundColor = "#3D4855";
    }
    // eslint-disable-next-line
  }, []);
  const topTouchEnd = useCallback((e) => {
    if (topRef.current) {
      topRef.current.style.backgroundColor = "rgb(32, 48, 63)";
    }
  }, []);

  const bottomVibrate = useCallback(() => {
    if (bottomRef.current) {
      bottomRef.current.style.backgroundColor = "#3D4855";
    }
    setTimeout(() => {
      if (bottomRef.current) {
        bottomRef.current.style.backgroundColor = "rgb(32, 48, 63)";
      }
    }, 100);
    // eslint-disable-next-line
  }, []);
  const bottomClickHandler = useCallback((e) => {
    if (bottomRef.current) {
      bottomRef.current.style.backgroundColor = "#3D4855";
    }
    // eslint-disable-next-line
  }, []);
  const bottomTouchEnd = useCallback((e) => {
    if (bottomRef.current) {
      bottomRef.current.style.backgroundColor = "rgb(32, 48, 63)";
    }
  }, []);

  return (
    <div
      className={
        className ? [cl.Categories, className].join(" ") : cl.Categories
      }
    >
      <div
        ref={topRef}
        onTouchStart={topClickHandler}
        onTouchEnd={topTouchEnd}
        className={cl.topBlock}
      ></div>
      <div
        ref={bottomRef}
        onTouchEnd={bottomTouchEnd}
        onTouchStart={bottomClickHandler}
        onClick={() => {
          setSubcategoryChoiceOpen(true);
          bottomVibrate();
        }}
        className={cl.bottomBlock}
      ></div>

      <div
    
        onTouchEnd={topTouchEnd}
        onTouchStart={topClickHandler}
        onClick={(e) => {
          topVibrate();
          setCatagoryChoiceOpen(true);
        }}
        style={{
          zIndex: 200,
        }}
        className={cl.Categories__block}
      >
        <p>Категория</p>
        <p className={[cl.Category__link, cl.quest].join(" ")} href="">
          {taskInformation.category.category
            ? taskInformation.category.category
            : ""}
        </p>
      </div>
      {categoryOnly ? (
        <></>
      ) : (
        <>
          <hr className={cl.line} />

          <div
            onTouchEnd={bottomTouchEnd}
            onTouchStart={bottomClickHandler}
            onClick={() => {
              setSubcategoryChoiceOpen(true);
              bottomVibrate();
            }}
            style={{
              zIndex: 200,
            }}
            className={cl.Categories__block}
          >
            <p>Подкатегория</p>
            <p className={cl.Category__link} href="">
              {taskInformation.subCategory.subCategory
                ? format(taskInformation.subCategory.subCategory)
                : ""}
              {/* {taskInformation.subCategory=== 'Выбрать' ? '' : '.'} */}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Categories;
