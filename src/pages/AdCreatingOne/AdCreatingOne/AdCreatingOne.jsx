import { useNavigate } from "react-router-dom";
import React, { memo, useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";

import Cap from "../../../components/UI/Cap/Cap";
import Categories from "../Categories/Categories";
import TaskName from "../TaskName/TaskName";
import DescriptionAndPhoto from "../../../components/UI/DescriptionAndPhoto/DescriptionAndPhoto";
import MakePrivate from "../../../components/UI/MakePrivate/MakePrivate";
import ChoiceCategory from "../ChoiceCategory/ChoiceCategory";
import ChoiceSubCategory from "../ChoiceSubCategory";
import StartOn from "../StartOn/StartOn";
import DatePicker from "react-mobile-datepicker";
import MyDatePicker from "../../ADCreatingTwo/DatePicker/DatePicker";
import cl from "./AdCreatingOne.module.css";
import CatchDate from "../../ADCreatingTwo/CatchDate/CatchDate";
import BackButton from "../../../constants/BackButton";
import '../../ADCreatingTwo/AdCreatingTwo/SecondAddCreating.module.css'
let transform = [{ opacity: 0 }, { opacity: 1 }];

Date.prototype.addHours = function(h) {
  this.setTime(this.getTime() + (h*60*60*1000));
  return this;
}

const AdCreatingOne = ({
  taskInformation,
  setTaskInformation,
  MyInformation,
  className,
  errorName,
  mistakes,
  isDetailsActive
}) => {
  const [isCategoryChoiceOpen, setCatagoryChoiceOpen] = useState(false);

  const [isSubcategoryChoiceOpen, setSubcategoryChoiceOpen] = useState(false);

  const navigate = useNavigate();

  var options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timezone: "UTC",
  };

  function goForward() {
    transform = [{ x: "-100%" }, { x: 0 }];
    navigate("/AdCreatingTwo");
  }

  function goBack() {
    transform = [{ opacity: 0 }, { opacity: 1 }];
    navigate(-1);
  }

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

  

  const [state, setState] = useState({
    time: new Date().addHours(1),
    isOpen: false,
    isPicked: false,
    singleOpen: null,
    startTime: taskInformation.time.end,
    endTime: taskInformation.time.end,
    isSingleOpen: false,
    isStartOpen: false,
    isEndOpen: false,
  });
  useEffect( () => {
     setState({...state , startTime : taskInformation.time.start , endTime : taskInformation.time.end})
  }, [isDetailsActive, taskInformation.time.start ,  taskInformation.time.end ] )  
  function handleClick() {
    setState({ ...state, isOpen: true });
  }
  function handleSelect(time) {
    if (state.isStartOpen) {
      setState({
        ...state,
        time: time,
        isOpen: false,
        isStartOpen: false,
        startTime: time,
      });
      if (taskInformation.time){
        setTaskInformation({ ...taskInformation, time: {...taskInformation.time , start : time} });
      }
      else{
        setTaskInformation({ ...taskInformation, startTime: time });
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
      setTaskInformation({ ...taskInformation, singleTime: time });
    }
    if (state.isEndOpen) {
      setState({
        ...state,
        time: time,
        isOpen: false,
        isEndOpen: false,
        endTime: time,
      });
      if (taskInformation.time){
        setTaskInformation({ ...taskInformation, time: {...taskInformation.time , end : time} });
      }
      else{
        setTaskInformation({ ...taskInformation, endTime: time });
      }
      
    }
  }
  function handleCancel() {
    setState({ ...state, isOpen: false });
  }

  let dateObject = document.querySelectorAll(".datepicker-modal")[0];
  let datePickerObject = document.querySelectorAll(".datepicker")[0];

  if (dateObject && datePickerObject) {
    dateObject.style.display = "block";
    dateObject.style.zIndex = "-1";
    dateObject.style.backgroundColor = "unset";
    dateObject.style.transition = "0.3s";
    datePickerObject.style.transition = "0.3s";
  }
  useState(() => {
    function backHandler(){
      if (state.isOpen){
          setState({...state, isOpen : false})
      }
    }
    BackButton.onClick( )
  } )
  useEffect(() => {
    if (dateObject && datePickerObject) {
      if (state.isOpen) {
        appear();
        document.documentElement.style.overflow = "hidden";
      } else {
        disappear();
        document.documentElement.style.overflow = "visible";
      }
    }
  }, [state.isOpen]);

  function appear() {
    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.marginTop = "400px";
    window.scrollTo({
      top: 400,
      behavior: "auto",
    });

    dateObject.style.zIndex = "100";
    dateObject.style.backgroundColor = "rgba(0, 0, 0, .6)";
    datePickerObject.style.transform = "translateY(0%)";
  }
  function disappear() {
    document.documentElement.style.marginTop = "0px";
    dateObject.style.backgroundColor = "unset";
    dateObject.style.display = "block";
    datePickerObject.style.transform = "translateY(100%)";

    document.documentElement.style.overflow = "visible";

    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }

  return (
    <div
      style={{
        minWidth: document.documentElement.clientWidth.toString() + "px",
      }}
      className={
        className ? [cl.AdCreating, className].join(" ") : cl.AdCreating
      }
    >
      {MyInformation ? (
        ""
      ) : (
        <Cap step={1} className={cl.Cap}>
          {" "}
          <p className={cl.CapText}> Создайте объявление </p>{" "}
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
        />
      )}

      <TaskName
        // style = {mistakes.taskName ? {border : '1px solid red'} : {}}
        title = "Название задания "
        text={MyInformation ? "" : "Например, разработать дизайн"}
        errorValue = {mistakes.taskName || errorName ? true : false}
        taskInformation={taskInformation}
        setTaskInformation={setTaskInformation}
      />
      <DescriptionAndPhoto
        MyInformation={MyInformation}
        taskInformation={taskInformation}
        setTaskInformation={setTaskInformation}
        className={cl.DescriptionAndPhoto}
        textTitle={"Описание"}
        filesTitle={"ИЗОБРАЖЕНИЯ"}
        textPlaceholder={"Дайте подробное тз..."}
        text = {taskInformation.taskDescription}
        setText={(e) => {
          setTaskInformation({...taskInformation , taskDescription : e })
        }}
        photos={taskInformation.photos}
        setPhotos={ (e)  => {  
          if (!e) {
            alert('ошибка фото!!')
          }
          else{
            setTaskInformation(  {...taskInformation , photos : e }  )  
          }
  
          }  }

      />
      {MyInformation ? (
        <>
          <CatchDate
            className={cl.myCatchDate}
            whichOne={'startAndEnd'}
            state={state}
            setState={setState}
            errors={{}}
            
          />
        </>
      ) : (
        ""
      )}

      <DatePicker
        confirmText="Сохранить"
        cancelText="Отмена"
        theme="ios"
        showCaption={true}
        dateConfig={dateConfig}
        value={state.time}
        isOpen={true}
        onSelect={handleSelect}
        onCancel={handleCancel}
        min={new Date(new Date().addHours(1) + 1)}
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
          setTaskInformation={setTaskInformation}
          setSubcategoryChoiceOpen={setSubcategoryChoiceOpen}
          taskInformation={taskInformation}
        ></ChoiceSubCategory>
      </CSSTransition>
    </div>
  );
};

export default AdCreatingOne;
