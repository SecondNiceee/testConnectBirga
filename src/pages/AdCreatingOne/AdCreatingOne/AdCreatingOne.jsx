import React, { memo, useCallback, useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";

import Cap from "../../../components/UI/Cap/Cap";
import Categories from "../Categories/Categories";
import TaskName from "../../../components/UI/TaskName/TaskName";
import DescriptionAndPhoto from "../../../components/UI/DescriptionAndPhoto/DescriptionAndPhoto";
import ChoiceCategory from "../ChoiceCategory/ChoiceCategory";
import ChoiceSubCategory from "../ChoiceSubCategory";
import cl from "./AdCreatingOne.module.css";
import CatchDate from "../../ADCreatingTwo/CatchDate/CatchDate";
import "../../ADCreatingTwo/AdCreatingTwo/SecondAddCreating.module.css";
import MyDatePicker from "../../../components/AdCreating/MyDatePicker/MyDatePicker";
import Text from "../../../components/Text/Text";

// eslint-disable-next-line
Date.prototype.addHours = function (h) {
  this.setTime(this.getTime() + h * 60 * 60 * 1000);
  return this;
};

const monthMap = {
  1: "Янв",
  2: "Фев",
  3: "Март",
  4: "Апр",
  5: "Май",
  6: "Июнь",
  7: "Июль",
  8: "Авг",
  9: "Сен",
  10: "Окт",
  11: "Ноя",
  12: "Дек",
};

const dateConfig = {
  month: {
    format: (value) => monthMap[value.getMonth() + 1],
    caption: "Мес",
    step: 1,
  },
  date: {
    format: "DD",
    caption: "День",
    step: 1,
  },
  hour: {
    format: "hh",
    caption: "Час",
    step: 1,
  },
};

const min = new Date(new Date().addHours(1) + 1);

const AdCreatingOne = ({
  taskInformation,
  setTaskInformation,
  MyInformation,
  className,
  errorName,
  mistakes,
  isDetailsActive,
  categorys,
  subCategorys,
  isCategoryChoiceOpen,
  setCatagoryChoiceOpen,
  isSubcategoryChoiceOpen,
  setSubcategoryChoiceOpen,
  ...props
}) => {
  const [state, setState] = useState({
    time: new Date().addHours(1),
    isOpen: false,
    isPicked: false,
    singleOpen: null,
    startTime: taskInformation.time ? taskInformation.time.end : new Date(),
    endTime: taskInformation.time ? taskInformation.time.end : new Date(),
    isSingleOpen: false,
    isStartOpen: false,
    isEndOpen: false,
  });

  useEffect(() => {
    setState((value) => ({
      ...value,
      startTime: taskInformation.time.start,
      endTime: taskInformation.time.end,
    }));
  }, [isDetailsActive, taskInformation.time.start, taskInformation.time.end]);
  
  const handleSelect = useCallback(
    (time) => {
      if (state.isStartOpen) {
        setState((value) => ({
          ...value,
          time: time,
          isOpen: false,
          isStartOpen: false,
          startTime: time,
        }));
        if (taskInformation.time) {
          setTaskInformation({...taskInformation, time : {...taskInformation.time, start : time}})
        } else {
          setTaskInformation((value) => ({ ...value, startTime: time }));
        }
      }
      if (state.isSingleOpen) {
        setState({
          ...state,
          time: time,
          isOpen: false,
          isSingleOpen: false,
          singleTime: time,
        });
        setTaskInformation((value) => ({ ...value, singleTime: time }));
      }
      if (state.isEndOpen) {
        setState({
          ...state,
          time: time,
          isOpen: false,
          isEndOpen: false,
          endTime: time,
        });
        if (taskInformation.time) {
          setTaskInformation({...taskInformation, time : {...taskInformation.time, end : time}})
        } else {
          setTaskInformation((value) => ({ ...value, endTime: time }));
        }
      }
    },
    [setTaskInformation, state, taskInformation.time, taskInformation]
  );

  const handleCancel = useCallback(() => {
    setState((value) => ({ ...value, isOpen: false }));
  }, [setState]);

  let dateObject = document.querySelectorAll(".datepicker-modal")[0];
  let datePickerObject = document.querySelectorAll(".datepicker")[0];

  if (dateObject && datePickerObject) {
    dateObject.style.display = "block";
    dateObject.style.zIndex = "-1";
    dateObject.style.backgroundColor = "unset";
    dateObject.style.transition = "0.3s";
    datePickerObject.style.transition = "0.3s";
  }

  // useEffect( () => {
  //   document.documentElement.style.overflowY = "auto"
  //   return () => {
  //     document.documentElement.style.overflowY = "hidden"
  //   }
  // } , [] )

  useEffect(() => {
    function appear() {
      dateObject.style.zIndex = "100";
      dateObject.style.backgroundColor = "rgba(0, 0, 0, .6)";
      datePickerObject.style.transform = "translateY(0%)";
    }
    function disappear() {
      dateObject.style.backgroundColor = "unset";
      dateObject.style.display = "block";
      datePickerObject.style.transform = "translateY(100%)";

    }

    if (dateObject && datePickerObject) {
      if (state.isOpen) {
        appear();
      } else {
        disappear();
      }
    }
  }, [state.isOpen, dateObject, datePickerObject]);

  return (
    <div
      {...props}
      className={
        className ? [cl.AdCreating, className].join(" ") : cl.AdCreating
      }
    >
      {MyInformation ? (
        ""
      ) : (
        <Cap step={1} className={cl.Cap}>
          {" "}
          <Text className={cl.CapText}> Создайте объявление </Text>{" "}
        </Cap>
      )}
      {MyInformation ? (
        ""
      ) : (
        <Categories
          className={cl.Categories}
          taskInformation={taskInformation}
          setCatagoryChoiceOpen={setCatagoryChoiceOpen}
          setSubcategoryChoiceOpen={setSubcategoryChoiceOpen}
          categorys={categorys}
          subCategorys={subCategorys}
        />
      )}

      <TaskName
        // style = {mistakes.taskName ? {border : '1px solid red'} : {}}
        title="Название задания"
        underText={MyInformation ? "" : "Например, разработать дизайн"}
        errorValue={mistakes.taskName || errorName ? true : false}
        text={taskInformation.taskName}
        placeholder={"Введите название задания"}
        setText={(e) => {
          setTaskInformation({ ...taskInformation, taskName: e });
        }}
      />

      <DescriptionAndPhoto
        MyInformation={MyInformation}
        taskInformation={taskInformation}
        setTaskInformation={setTaskInformation}
        className={cl.DescriptionAndPhoto}
        textTitle={"Описание"}
        filesTitle={"ИЗОБРАЖЕНИЯ"}
        textPlaceholder={"Дайте подробное тз..."}
        text={taskInformation.taskDescription}
        setText={(e) => {
          setTaskInformation({ ...taskInformation, taskDescription: e });
        }}
        photos={taskInformation.photos}
        photosNames={taskInformation.photosNames}
        setPhotos={(e) => {
          if (!e) {
            window.Telegram.WebApp.showAlert("ошибка фото!!");
          } else {
            setTaskInformation( (value) =>  ({...value, photos: e }));
          }
        }}
      />

      {MyInformation ? (
        <>
          <CatchDate
            className={cl.myCatchDate}
            whichOne={"startAndEnd"}
            state={state}
            setState={setState}
            errors={{}}
            isMyInformation={true}
          />
        </>
      ) : (
        ""
      )}

      <MyDatePicker
        confirmText="Сохранить"
        cancelText="Отмена"
        theme="ios"
        showCaption={true}
        dateConfig={dateConfig}
        value={state.time}
        isOpen={true}
        onSelect={handleSelect}
        onCancel={handleCancel}
        min={min}
      />

      <CSSTransition
        classNames={"modal"}
        in={isCategoryChoiceOpen}
        timeout={0}
        mountOnEnter
        unmountOnExit
      >
        <ChoiceCategory
          
          taskInformation={taskInformation}
          setTaskInformation={setTaskInformation}
          setCatagoryChoiceOpen={setCatagoryChoiceOpen}
          categorys={categorys}
          subCategorys={subCategorys}
        />
      </CSSTransition>

      <CSSTransition
        classNames={"modal-two"}
        in={isSubcategoryChoiceOpen}
        timeout={0}
        unmountOnExit
        mountOnEnter
      >
        <ChoiceSubCategory
          subCategorysPar={subCategorys}
          setTaskInformation={setTaskInformation}
          setSubcategoryChoiceOpen={setSubcategoryChoiceOpen}
          taskInformation={taskInformation}
        ></ChoiceSubCategory>
      </CSSTransition>
    </div>
  );
};

export default memo(AdCreatingOne);
