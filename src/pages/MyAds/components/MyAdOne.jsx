import React, { useState , memo, useEffect, useMemo} from "react";
import Burger from "../../../components/UI/Burger/Burger";
import MyAdsBlock from "./MyAdsBlock";
import PickerContent from "./PickerContent";
import AdCreatingOne from "../../AdCreatingOne/AdCreatingOne/AdCreatingOne";
import { CSSTransition } from "react-transition-group";
import Top from "./Top";
import BackButton from "../../../constants/BackButton";
import axios from "axios";


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

  


  
  const [index, setIndex] = useState(0);
  const [mistakes, setMistakes] = useState({
    taskName : false,
    timeError : false
  })

  useEffect( () => {



    function checkMistakes(){
      let taskName = false 
      let timeError = false
      console.log('changing Task : ' + changingTask)
      console.log(changingTask)
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
  
        // setMistakes(rezult)
        return (Object.values(rezult).every(value => value === false))
    }
  
    function save() {
          alert('реальный вызов save')
          if (changingTask !== myAdsArray[index]){
            alert('отработка if ')
            if ( checkMistakes() ) {
              alert('ошибок нет')
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
  
  
  
  
  
              setDetailsActive(false)
            }
          }
          else{
            alert('отработка else')
            setDetailsActive(false)
          }
        
    }



    if (isDetailsActive){
      setChangingTask(myAdsArray[index])
    }
    if (isDetailsActive){
        BackButton.show()
        BackButton.onClick(save)
      }
      else{
        BackButton.hide()
        BackButton.offClick(save)
      }
  }, [isDetailsActive] )


  




  
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
