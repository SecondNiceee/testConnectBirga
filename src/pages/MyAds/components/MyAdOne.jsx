import React, { useState, memo, useEffect, useCallback} from "react";

import MyAdsBlock from "./MyAdsBlock";
import PickerContent from "./PickerContent";
import AdCreatingOne from "../../AdCreatingOne/AdCreatingOne/AdCreatingOne";
import { CSSTransition } from "react-transition-group";
import Top from "../../../components/UI/Top/Top";
import BackButton from "../../../constants/BackButton";

// import { initPopup } from "@tma.js/sdk";
import {  putMyTask } from "../../../store/information";
import { useDispatch, useSelector } from "react-redux";
import sortFiles from "../../../functions/sortFiles";
let renderConunter = 0
// const popup = initPopup();
let detailsVar;
const MyAdOne = ({
  myAdsArray,
  setMenuActive,
  setSecondPage,
  details,
  setDetails,
  secondPage
}) => {
  console.log(renderConunter)
  renderConunter += 1




  const setDetailsActive = useCallback( (value) => {
    setDetails( e =>  ({...e , isActive : value}))
  } , [ setDetails] )

  console.log(details)
  console.log('hi')

  // function setChangingTask( value ){
  //   console.log('Вызов этой функции')
  //   console.log(value)
  //   setDetails({...details , task : value})
  // }



  


  const dispatch = useDispatch();

  let putStatus = useSelector((state) => state.information.putTaskStatus);

  detailsVar = details; // переприсваивание для работы телеграма

  const [mistakes, setMistakes] = useState({
    taskName: false,
    timeError: false,
  }); // контролер ошибок

  





  useEffect(() => {
    if (putStatus === "error") {
      alert('ничего не сохранилось')
    }
  }, [putStatus]); // проверка на то, что все работает


  const save = useCallback( () => {
    if (detailsVar.task !== myAdsArray[secondPage.index]) {
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
              for (let fileName of detailsVar.task.photosName ){
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

              
              setDetails( {...details,
                isActive : false,
              } )

            }
          }


        } )
        
    } else {
      setDetailsActive(false);
    }
  }, [details , dispatch , myAdsArray , setDetails , setDetailsActive  ] ) // функция сохранения , а также модалка телеграма




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
    } 
    return () => {
      BackButton.offClick(save);
    }
  } , [details.isActive,save]) // логика кнопок


  return (
    <div className="my-ad-one">
      <Top name={"Мои задания"} setMenuActive={setMenuActive} />
      <button style={{
        position : 'absolute',
        zIndex : '999'
      }} onClick={() => {
        if (checkMistakes(detailsVar.task)) {
          let myFormData = new FormData();
          myFormData.append('title' , detailsVar.task.taskName)
          myFormData.append('description' , detailsVar.task.taskDescription)
          myFormData.append("deadline" , 1)
          myFormData.append("price" , detailsVar.task.tonValue )
          myFormData.append("startTime" , detailsVar.task.time.start)
          myFormData.append("endTime" , detailsVar.task.time.end)

          let files = sortFiles(detailsVar.task.photosNames ,  detailsVar.task.photos)

          // let removedArr = []
          // let addedArr = []
          // console.log(detailsVar)
          // for (let fileName of detailsVar.task.photosNames ){
          //     if (!detailsVar.task.photos.find(e => e.name === fileName)){
          //       removedArr.push(fileName)
          //     }
          // }
          // for (let file of detailsVar.task.photos){
          //   console.log('я был тут!')
          //   if (file.name.includes('nick')){
          //     addedArr.push(file)
          //   }
          // }


            for (let i = 0; i <  files.removedArr.length; i++){
              myFormData.append(`deleteFiles[${i}]` , files.removedArr[i])
            }
            for (let i = 0; i < files.addedArr.length ; i++){
              myFormData.append(`addFiles[${i}]` , files.addedArr[i] )
            }
          console.log(files.addedArr)

          dispatch(putMyTask([myFormData, detailsVar.task.id , detailsVar.task]))

          
          setDetails( {...details,
            isActive : false,
          } )

        }

        }
        

      }>Save</button>

      <MyAdsBlock deals={1} finishedDeals={"0%"} />
      <PickerContent 
      dispatch={dispatch}
        myAdsArray={myAdsArray}
        setDetails = {setDetails}
        setSecondPage = {setSecondPage}
        setDetailsActive={setDetailsActive}
      />
      


    </div>
  );
};

export default memo(MyAdOne);
