import React, { useState , memo, useEffect, useMemo} from "react";
import Burger from "../../../components/UI/Burger/Burger";
import MyAdsBlock from "./MyAdsBlock";
import PickerContent from "./PickerContent";
import AdCreatingOne from "../../AdCreatingOne/AdCreatingOne/AdCreatingOne";
import { CSSTransition } from "react-transition-group";
import Top from "./Top";
import BackButton from "../../../constants/BackButton";
import axios from "axios";
import { initPopup } from '@tma.js/sdk';

              // let myFormData = new FormData();
              // myFormData.append("id", changingTask.id);
              // myFormData.append("title", changingTask.taskName);
              // myFormData.append("description", changingTask.taskDescription);
              // myFormData.append("deadline", 1);
              // myFormData.append("price", changingTask.tonValue);
              // myFormData.append("startTime", changingTask.time.start);
              // myFormData.append("endTime", changingTask.time.end);
              // if (changingTask.photos.length !== 0) {
              //   for (let file of changingTask.photos) {
              //     myFormData.append("photos", file);
              //   }
              // }
              // axios.post(
              //   "https://back-birga.ywa.su/advertisement",
              //   myFormData,
              //   {
              //     headers: {
              //       "Content-Type": "multipart/form-data",
              //       "Access-Control-Allow-Origin": "*"
              //     },
              //   }
              // );
let changed = false;
const popup = initPopup();
let changingTaskVar = {}
const MyAdOne = ({
  myAdsArray,
  setTask,
  goForward,
  setDetailsActive,
  setMyAdsArray,
  isDetailsActive,
  setMenuActive, 
  changingTask,
  setChangingTask
}) => {
  

  changingTaskVar = changingTask

  


  console.log('общий changing Task : ')
  console.log(changingTask)
  const [index, setIndex] = useState(0);
  const [mistakes, setMistakes] = useState({
    taskName : false,
    timeError : false
  })

  useEffect( () => {



    function checkMistakes(changingTask){
      let taskName = false 
      let timeError = false
      console.log('changing Task : ' + changingTask)
      console.log(changingTask) // ?? Почему changing Task здесь равен не истинному значению, а изначальному
      console.log(taskName)
      console.log(timeError)
    
        if (changingTask.taskName.length < 5){
           taskName = true
        }
  
        if (changingTask.time.end.length > 0) {
          if (changingTask.time.end < changingTask.time.start){
            timeError = true
          }
        }
        let rezult = {taskName : taskName, timeError : timeError}
  
        console.log(taskName)
        console.log(timeError)
  
        setMistakes(rezult)
        return (Object.values(rezult).every(value => value === false))
    }
  
    function save() {
          if (changingTaskVar !== myAdsArray[index]){

            popup
            .open({
              title: 'Сохранить?',
              message: 'Сохранить изменения перед выходом?',
              buttons: [{ id: 'save', type: 'default', text: 'Да' },
              { id: 'delete', type: 'destructive', text: 'Нет' }
              ],
            })
            .then(buttonId => {
              if (buttonId === 'delete' || buttonId === null){
                setDetailsActive(false)
              }
              if (buttonId === 'save'){
                if ( checkMistakes(changingTaskVar) ) {

                  let myFormData = new FormData();
                  let answer = {
                    id : changingTask.id,
                    title : changingTask.taskName,
                    description : changingTask.taskDescription,
                    deadline : 1,
                    price : changingTask.tonValue,
                    startTime : changingTask.time.start,
                    endTime : changingTask.time.end
                  }
                  console.log(myFormData)
                  if (changingTask.photos.length !== 0) {
                    for (let file of changingTask.photos) {
                      myFormData.append("photos", file);
                    }
                  }
                  axios.put(
                    "https://back-birga.ywa.su/advertisement",
                    answer,
                    {
                      headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*"
                      },
                    }
                  );

                  // popup.close()

                }

                setDetailsActive(false)


              }
            });
          }
          else{
            setDetailsActive(false)
          }
        
    }



    if (isDetailsActive && changed === false){
      changed = true
      setChangingTask(myAdsArray[index])
    }
    if (isDetailsActive){
        BackButton.show()
        BackButton.onClick(save)
      }
      else{
        changed = false
        BackButton.hide()
        BackButton.offClick(save)
      }
  }, [isDetailsActive, changingTask] )


  




  
    function setMyArray(par) {
        console.log(par);
        setMyAdsArray(
          [...myAdsArray].map((e, i) => {
            if (i === index) {
              return par;
            }
            return e;
          })
        );
        console.log(myAdsArray);
      }
  return (
    <div className="my-ad-one">
      <Top name={'Мои задания'} setMenuActive={setMenuActive}/>
      {/* <button style={{
        position : 'absolute',
        zIndex : '999'
      }} onClick={() => {
        save()
      }}>Save</button> */}
      <MyAdsBlock
        deals={1}
        finishedDeals={"70%"}
      />
      <PickerContent
        myAdsArray={myAdsArray}
        setTask={setTask}
        goForward={goForward}
        setDetailsActive={setDetailsActive}
        setIndex={setIndex}
      />

      <CSSTransition classNames="details" in={isDetailsActive} timeout={0} >
        <AdCreatingOne
          mistakes = {mistakes}
          className="AdCreatingMy"
          taskInformation={changingTask}
          setTaskInformation={setChangingTask}
          MyInformation={true}
        
        />
      </CSSTransition>
    </div>
  );
};

export default memo(MyAdOne);
