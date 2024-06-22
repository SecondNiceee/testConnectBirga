import React, { useState, memo, useEffect, useMemo, useCallback } from "react";
import Burger from "../../../components/UI/Burger/Burger";
import MyAdsBlock from "./MyAdsBlock";
import PickerContent from "./PickerContent";
import AdCreatingOne from "../../AdCreatingOne/AdCreatingOne/AdCreatingOne";
import { CSSTransition } from "react-transition-group";
import Top from "./Top";
import BackButton from "../../../constants/BackButton";
import axios from "axios";
// import { initPopup } from "@tma.js/sdk";
import { fetchMyOrders, putMyAds, putMyTask } from "../../../store/information";
import { useDispatch, useSelector } from "react-redux";

let changed = false;
// const popup = initPopup();
let changingTaskVar = {};
let photosCopy = []
let filesArrayVar;
const MyAdOne = ({
  myAdsArray,
  setTask,
  setDetailsActive,
  isDetailsActive,
  setMenuActive,
  changingTask,
  setChangingTask,
  setSecondPage
}) => {


  const dispatch = useDispatch();

  let putStatus = useSelector((state) => state.information.putTaskStatus);

  changingTaskVar = changingTask; // переприсваивание для работы телеграма

  const [index, setIndex] = useState(0);  // index для определения taskDetails


  const [mistakes, setMistakes] = useState({
    taskName: false,
    timeError: false,
  }); // контролер ошибок
  const [filesValues , setFilesValues] = useState({
    addedFiles : [],
    removedFiles : []
  } ) // массивы для пута (удаленное и добавленные)


  filesArrayVar = filesValues;

  console.log(filesValues)

  useEffect(  () => {
    console.log('я сработал')
    let addedFilesLocal = []
    console.warn(changingTaskVar.photos)
    console.warn(photosCopy)
    if (changingTaskVar.photos.length > photosCopy.length ){
      console.log('я попал сюда')
      for (let photo of changingTaskVar.photos){
        if (!(photosCopy.includes(photo)) && photo.name.includes('nick')){
          addedFilesLocal.push(photo)
        }
      }
      setFilesValues({...filesValues , addedFiles : [...filesValues.addedFiles, ...addedFilesLocal]})
    }
    else{
      for (let photo of photosCopy){
        if (!(changingTaskVar.photos.includes(photo))){
          if (photo.name.includes('nick')){
            setFilesValues({...filesValues, addedFiles : filesValues.addedFiles.filter(
              file => file.name !== photo.name
            )})
          }
          else{
            setFilesValues({...filesValues , removedFiles : [...filesValues.removedFiles , photo.name]})
          }
        }
      }
    }
    photosCopy = changingTaskVar.photos
  } , [changingTask.photos] )   // логика пута




  useEffect(() => {
    if (putStatus === "error") {
      alert('ничего не сохранилось')
    }
  }, [putStatus]); // проверка на то, что все работает


  const save = () =>  {
    if (changingTaskVar !== myAdsArray[index]) {
      window.Telegram.WebApp
        .showPopup({
          title: "Сохранить?",
          message: "Сохранить изменения перед выходом?",
          buttons: [
            { id: "save", type: "default", text: "Да" },
            { id: "delete", type: "destructive", text: "Нет" },
          ],
        } , (buttonId) => {

          if (buttonId === "delete" || buttonId === null) {
            setDetailsActive(false);
          }
          if (buttonId === "save") {
            if (checkMistakes(changingTaskVar)) {
              let myFormData = new FormData();
              myFormData.append('title' , changingTaskVar.taskName)
              myFormData.append('description' , changingTaskVar.taskDescription)
              myFormData.append("deadline" , 1)
              myFormData.append("price" , changingTaskVar.tonValue )
              myFormData.append("startTime" , changingTaskVar.time.start)
              myFormData.append("endTime" , changingTaskVar.time.end)

                for (let i = 0; i <  filesArrayVar.removedFiles.length; i++){
                  myFormData.append(`deleteFiles[${i}]` , filesArrayVar.removedFiles[i])
                }
                for (let i = 0; i < filesArrayVar.addedFiles.length ; i++){
                  myFormData.append(`addFiles` , changingTask.photos[i] )
                }

              dispatch(putMyTask([myFormData, changingTaskVar.id , changingTaskVar]))

              
              setFilesValues({
                addedFiles : [],
                removedFiles : []
              })
              filesArrayVar = []
            }

            setDetailsActive(false);
          }


        } )
        
    } else {
      setDetailsActive(false);
    }
  }  // функция сохранения , а также модалка телеграма




  function checkMistakes(changingTask) {
    let taskName = false;
    let timeError = false;
    if (changingTask.taskName.length < 5) {
      taskName = true;
    }

    if (changingTask.time.end.length > 0) {
      if (changingTask.time.end < changingTask.time.start) {
        timeError = true;
      }
    }
    let rezult = { taskName: taskName, timeError: timeError };


    setMistakes(rezult);
    return Object.values(rezult).every((value) => value === false);
  } // логика провероки ошибок




  useEffect(() => {


    if (isDetailsActive && changed === false) {
      changed = true;
      setChangingTask(myAdsArray[index]);
    }
  }, [isDetailsActive]); // логика внесения changingTask

  useEffect( () => {
    
    if (isDetailsActive) {
      BackButton.show();
      BackButton.onClick(save);
    } else {
      changed = false;
    }
    return () => {
      BackButton.offClick(save);
    }
  } , [isDetailsActive]) // логика кнопок


  return (
    <div className="my-ad-one">
      <Top name={"Мои задания"} setMenuActive={setMenuActive} />
      <button style={{
        position : 'absolute',
        zIndex : '999'
      }} onClick={() => {
        let myFormData = new FormData();
        myFormData.append('title' , changingTaskVar.taskName)
        myFormData.append('description' , changingTaskVar.taskDescription)
        myFormData.append("deadline" , 1)
        myFormData.append("price" , changingTaskVar.tonValue )
        myFormData.append("startTime" , changingTaskVar.time.start)
        myFormData.append("endTime" , changingTaskVar.time.end)

          for (let i = 0; i <  filesArrayVar.removedFiles.length; i++){
            myFormData.append(`deleteFiles[${i}]` , filesArrayVar.removedFiles[i])
          }
          for (let i = 0; i < filesArrayVar.addedFiles.length ; i++){
            console.log(filesArrayVar.addedFiles[i])
            myFormData.append(`addFiles[${i}]` , filesArrayVar.addedFiles[i] )
          }

        dispatch(putMyTask([myFormData, changingTaskVar.id , changingTaskVar]))

        
        // setFilesValues({
        //   addedFiles : [],
        //   removedFiles : []
        // })
        // filesArrayVar = []

        }

      }>Save</button>

      <MyAdsBlock deals={1} finishedDeals={"70%"} />
      <PickerContent
        myAdsArray={myAdsArray}
        setTask={setTask}
        setSecondPage = {setSecondPage}
        setDetailsActive={setDetailsActive}
        setIndex={setIndex}
      />

      <CSSTransition classNames="details" in={isDetailsActive} timeout={300}
      mountOnEnter unmountOnExit>
        <AdCreatingOne
          mistakes={mistakes}
          className="AdCreatingMy"
          taskInformation={changingTask}
          setTaskInformation={setChangingTask}
          MyInformation={true}
          isDetailsActive={isDetailsActive}
          setAddedFiles={(e) => {
            console.log(e)
            setChangingTask(value => ({...value, addedFiles : e}))
          }}
          setRemovedFiles={(e) => {
            setChangingTask(value => ({...value , removedFiles : e}))
          }}
        />
      </CSSTransition>
    </div>
  );
};

export default memo(MyAdOne);
