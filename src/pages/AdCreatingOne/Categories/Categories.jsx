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
  const topText = useRef(null);
  const topWhiteText = useRef(null)
  
  const bottomRef = useRef(null);
  const bottomText = useRef(null);
  const bottomWhiteText = useRef(null)


  const topVibrate = useCallback(() => {
    if (topRef.current) {
    topRef.current.style.transition = "ease-in 0.1s ease 0.1s"
    topWhiteText.current.style.transition = "ease-in 0.1s ease 0.1s"
    topText.current.style.transition = "ease-in 0.1s ease 0.1s"
      topWhiteText.current.style.color = "#EBEBEC"
      topRef.current.style.backgroundColor = "#3D4855";
      topText.current.style.color = "#47A2E8"
    }
    setTimeout(() => {
      if (topRef.current) {
        topRef.current.style.transition = "ease-out 0.3s ease 0.3s"
        topWhiteText.current.style.transition = "ease-out 0.3s ease 0.3s"
        topText.current.style.transition = "ease-out 0.3s ease 0.3s"
        topRef.current.style.backgroundColor = "rgb(32, 48, 63)";
        topWhiteText.current.style.color = "white"
        topText.current.style.color = "rgb(46, 165, 255)"
      }
    }, 100);
    // eslint-disable-next-line
  }, []);
  const topClickHandler = useCallback((e) => {

    if (topRef.current) {
        topRef.current.style.transition = "ease-in 0.1s ease 0.1s"
        topWhiteText.current.style.transition = "ease-in 0.1s ease 0.1s"
        topText.current.style.transition = "ease-in 0.1s ease 0.1s"
        topWhiteText.current.style.color = "#EBEBEC" 
        topText.current.style.color = "#47A2E8"
        topRef.current.style.backgroundColor = "#3D4855";
    }
    // eslint-disable-next-line
  }, []);
  const topTouchEnd = useCallback((e) => {
    if (topRef.current) {
        topRef.current.style.transition = "ease-out 0.3s"
        topWhiteText.current.style.transition = "ease-out 0.3s"
        topText.current.style.transition = "ease-out 0.3s"
        topRef.current.style.backgroundColor = "rgb(32, 48, 63)";
        topWhiteText.current.style.color = "white"
        topText.current.style.color = "rgb(46, 165, 255)"
    }
  }, []);

  const bottomVibrate = useCallback(() => {
    if (bottomRef.current) {
        bottomRef.current.style.transition = "ease-in 0.1s ease 0.1s"
    bottomWhiteText.current.style.transition = "ease-in 0.1s ease 0.1s"
    bottomText.current.style.transition = "ease-in 0.1s ease 0.1s"
    bottomWhiteText.current.style.color = "#EBEBEC"
      bottomRef.current.style.backgroundColor = "#3D4855";
      bottomText.current.style.color = "#47A2E8"
    }
    setTimeout(() => {
      if (bottomRef.current) {
        bottomRef.current.style.transition = "ease-out 0.3s ease 0.3s"
        bottomWhiteText.current.style.transition = "ease-out 0.3s ease 0.3s"
        bottomText.current.style.transition = "ease-out 0.3s ease 0.3s"
        bottomRef.current.style.backgroundColor = "rgb(32, 48, 63)";
        bottomWhiteText.current.style.color = "white"
        bottomText.current.style.color = "rgb(46, 165, 255)"
      }
    }, 100);
    // eslint-disable-next-line
  }, []);
  const bottomClickHandler = useCallback((e) => {

    if (bottomRef.current) {
        bottomRef.current.style.transition = "ease-in 0.1s ease 0.1s"
        bottomWhiteText.current.style.transition = "ease-in 0.1s ease 0.1s"
        bottomText.current.style.transition = "ease-in 0.1s ease 0.1s"
        bottomWhiteText.current.style.color = "#EBEBEC" 
        bottomText.current.style.color = "#47A2E8"
        bottomRef.current.style.backgroundColor = "#3D4855";
    }
    // eslint-disable-next-line
  }, []);
  const bottomTouchEnd = useCallback((e) => {
    if (bottomRef.current) {
        bottomRef.current.style.transition = "ease-out 0.3s"
        bottomWhiteText.current.style.transition = "ease-out 0.3s"
        bottomText.current.style.transition = "ease-out 0.3s"
        bottomRef.current.style.backgroundColor = "rgb(32, 48, 63)";
        topWhiteText.current.style.color = "white"
        bottomText.current.style.color = "rgb(46, 165, 255)"
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
        <p ref={topWhiteText} >Категория</p>
        <p ref={topText} className={[cl.Category__link, cl.quest].join(" ")} href="">
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
            <p ref={bottomWhiteText}>Подкатегория</p>
            <p ref={bottomText} className={cl.Category__link} href="">
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
