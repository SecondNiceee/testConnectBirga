import { useNavigate } from "react-router-dom";
import React, { memo, useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";

import Cap from "../../../components/UI/Cap/Cap";
import Categories from "../Categories/Categories";
import TaskName from "../TaskName/TaskName";
import DescriptionAndPhoto from "../DescriptionAndPhoto/DescriptionAndPhoto";
import MakePrivate from "../MakePrivate/MakePrivate";
import ChoiceCategory from "../ChoiceCategory/ChoiceCategory";
import ChoiceSubCategory from "../ChoiceSubCategory";
import StartOn from "../StartOn/StartOn"

import cl from "./AdCreatingOne.module.css";


  let transform = [  {opacity : 0} , {opacity : 1} ]

const AdCreatingOne =   ({ taskInformation , setTaskInformation,  MyInformation, className , errorName }) => {


  const [isCategoryChoiceOpen, setCatagoryChoiceOpen] = useState(false);

  const [isSubcategoryChoiceOpen, setSubcategoryChoiceOpen] = useState(false);

  const navigate = useNavigate()

  function goForward(){
    transform  =  [ {x:'-100%'} , {x : 0} ]
    navigate('/AdCreatingTwo')
  }

  function goBack(){
    transform =  [  {opacity : 0} , {opacity : 1} ]
    navigate(-1)
  }




  return (
    <div
  
    style={{minWidth : document.documentElement.clientWidth.toString() + 'px' }}
      className={
        className ? [cl.AdCreating, className].join(" ") : cl.AdCreating
      }
    >

      {MyInformation ? '' : 
            <Cap step={1} className={cl.Cap}>
            {" "}
            <p className={cl.CapText}> Создайте объявление </p>{" "}
          </Cap>}
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
        errorName={errorName}
        taskInformation={taskInformation}
        setTaskInformation={setTaskInformation}
      
      />
      <DescriptionAndPhoto
        MyInformation={MyInformation}
        taskInformation={taskInformation}
        setTaskInformation={setTaskInformation}
        className={cl.DescriptionAndPhoto}
      />
      {MyInformation ? (
        <StartOn
          className={cl.startOn}
          text="Воскресенье, 03 марта 2024, 00:30"
        />
      ) : (
        ""
      )}
      <MakePrivate
        isPrivate={taskInformation.isPrivate}
        setTaskInformation={setTaskInformation}
        className={[cl.MakePrivate, cl.MakePrivateOne].join(" ")}
        taskInformation={taskInformation}
        text="Сделать приватным"
        enabledText="Задание увидят только исполнители, а после завершения — только вы и выбранный исполнитель."
        noeEnabledText="Задания увидят все, совсем все"
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

export default  AdCreatingOne;
