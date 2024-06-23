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
let renderConunter = 0
let changed = false;
// const popup = initPopup();
let detailsVar;;
let photosCopy = []
let filesArrayVar;
const MyAdOne = ({
  myAdsArray,
  setMenuActive,
  setSecondPage,
  details,
  setDetails
}) => {
  console.log(renderConunter)
  renderConunter += 1



  function setDetailsActive( value ){
    setDetails({...details , isActive : value})
  }

  function setChangingTask( value ){
    setDetails({...details , task : value})
  }



  


  const dispatch = useDispatch();

  let putStatus = useSelector((state) => state.information.putTaskStatus);

  detailsVar = details; // переприсваивание для работы телеграма

  const [mistakes, setMistakes] = useState({
    taskName: false,
    timeError: false,
  }); // контролер ошибок
  const [filesValues , setFilesValues] = useState({
    addedFiles : [],
    removedFiles : []
  } ) // массивы для пута (удаленное и добавленные)


  filesArrayVar = filesValues;


  // useEffect(  () => {

  //   let addedFilesLocal = []
  //   if (detailsVar.task.photos.length > photosCopy.length ){

  //     for (let photo of detailsVar.task.photos){
  //       if (!(photosCopy.includes(photo)) && photo.name.includes('nick')){
  //         addedFilesLocal.push(photo)
  //       }
  //     }
  //     setFilesValues({...filesValues , addedFiles : [...filesValues.addedFiles, ...addedFilesLocal]})
  //   }
  //   else{
  //     for (let photo of photosCopy){
  //       if (!(detailsVar.task.photos.includes(photo))){
  //         if (photo.name.includes('nick')){
  //           setFilesValues({...filesValues, addedFiles : filesValues.addedFiles.filter(
  //             file => file.name !== photo.name
  //           )})
  //         }
  //         else{
  //           setFilesValues({...filesValues , removedFiles : [...filesValues.removedFiles , photo.name]})
  //         }
  //       }
  //     }
  //   }
  //   photosCopy = detailsVar.task.photos
  // } , [details.task.photos] )   // логика пута




  useEffect(() => {
    if (putStatus === "error") {
      alert('ничего не сохранилось')
    }
  }, [putStatus]); // проверка на то, что все работает


  const save = () =>  {
    if (detailsVar.task !== myAdsArray[details.index]) {
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
            if (checkMistakes(detailsVar.task)) {
              let myFormData = new FormData();
              myFormData.append('title' , detailsVar.task.taskName)
              myFormData.append('description' , detailsVar.task.taskDescription)
              myFormData.append("deadline" , 1)
              myFormData.append("price" , detailsVar.task.tonValue )
              myFormData.append("startTime" , detailsVar.task.time.start)
              myFormData.append("endTime" , detailsVar.task.time.end)

              let removedArr = []
              let addedArr = []
              console.log(detailsVar)
              for (let fileName of detailsVar.task.filesNames ){
                  if (!detailsVar.task.photos.find(e => e.name === fileName)){
                    removedArr.push(fileName)
                  }
              }
              for (let file of detailsVar.task.photos){
                if (file.name.includes('nick')){
                  addedArr.push(file)
                }
              }


                for (let i = 0; i <  removedArr; i++){
                  myFormData.append(`deleteFiles[${i}]` , removedArr[i])
                }
                for (let i = 0; i < addedArr ; i++){
                  myFormData.append(`addFiles[${i}]` , addedArr[i] )
                }

              dispatch(putMyTask([myFormData, detailsVar.task.id , detailsVar.task]))

              
              setFilesValues({
                addedFiles : [],
                removedFiles : []
              })
              
              setDetails( {...details,
                isActive : false,
              } )

              filesArrayVar = []
            }
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




  // useEffect(() => {


  //   if (details.isActive && changed === false) {
  //     changed = true;
  //     setChangingTask(myAdsArray[index]);
  //   }
  // }, [details.isActive]); // логика внесения changingTask

  useEffect( () => {
    
    if (details.isActive) {
      BackButton.show();
      BackButton.onClick(save);
    } else {
      changed = false;
    }
    return () => {
      BackButton.offClick(save);
    }
  } , [details.isActive]) // логика кнопок


  return (
    <div className="my-ad-one">
      <Top name={"Мои задания"} setMenuActive={setMenuActive} />
      <button style={{
        position : 'absolute',
        zIndex : '999'
      }} onClick={() => {
        let myFormData = new FormData();
        myFormData.append('title' , detailsVar.task.taskName)
        myFormData.append('description' , detailsVar.task.taskDescription)
        myFormData.append("deadline" , 1)
        myFormData.append("price" , detailsVar.task.tonValue )
        myFormData.append("startTime" , detailsVar.task.time.start)
        myFormData.append("endTime" , detailsVar.task.time.end)
        console.log(detailsVar.task)
          // for (let i = 0; i <  filesArrayVar.removedFiles.length; i++){
          //   myFormData.append(`deleteFiles[${i}]` , filesArrayVar.removedFiles[i])
          // }
          // for (let i = 0; i < filesArrayVar.addedFiles.length ; i++){
  
          //   myFormData.append(`addFiles[${i}]` , filesArrayVar.addedFiles[i])
          // }

        dispatch(putMyTask([myFormData, detailsVar.task.id , detailsVar.task]))



        }

      }>Save</button>

      <MyAdsBlock deals={1} finishedDeals={"70%"} />
      <PickerContent
        myAdsArray={myAdsArray}
        setDetails = {setDetails}
        setSecondPage = {setSecondPage}
        setDetailsActive={setDetailsActive}
      />
      

      <CSSTransition classNames="details" in={details.isActive} timeout={300}
      mountOnEnter unmountOnExit>
        <AdCreatingOne
          mistakes={mistakes}
          className="AdCreatingMy"
          taskInformation={detailsVar.task}
          setTaskInformation={setChangingTask}
          MyInformation={true}
          isDetailsActive={details.isActive}
          setAddedFiles={(e) => {
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
