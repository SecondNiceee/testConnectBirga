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
import { fetchMyOrders, putMyTask } from "../../../store/information";
import { useDispatch, useSelector } from "react-redux";

let changed = false;
// const popup = initPopup();
let changingTaskVar = {};
const MyAdOne = ({
  myAdsArray,
  setTask,
  goForward,
  setDetailsActive,
  setMyAdsArray,
  isDetailsActive,
  setMenuActive,
  changingTask,
  setChangingTask,
}) => {
  const dispatch = useDispatch();
  let putStatus = useSelector((state) => state.information.putTaskStatus);
  let getStatus = useSelector((state) => state.information.myOrderStatus);

  changingTaskVar = changingTask;

  const [index, setIndex] = useState(0);
  const [mistakes, setMistakes] = useState({
    taskName: false,
    timeError: false,
  });

  useEffect(() => {
    if (putStatus === "complete") {
      dispatch(fetchMyOrders());
    }
  }, [putStatus]);


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
              let answer = {
                id: changingTaskVar.id,
                title: changingTaskVar.taskName,
                description: changingTaskVar.taskDescription,
                deadline: 1,
                price: changingTaskVar.tonValue,
                startTime: changingTaskVar.time.start,
                endTime: changingTaskVar.time.end,
              };

              if (changingTask.photos.length !== 0) {
                for (let file of changingTask.photos) {
                  myFormData.append("photos", file);
                }
              }
              putTask(answer);

              // axios.put(
              //   "https://back-birga.ywa.su/advertisement",
              //   answer,
              //   {
              //     headers: {
              //       "Content-Type": "application/json",
              //       "Access-Control-Allow-Origin": "*"
              //     },
              //   }
              // );
            }

            setDetailsActive(false);
          }


        } )
        
    } else {
      setDetailsActive(false);
    }
  }




  function checkMistakes(changingTask) {
    let taskName = false;
    let timeError = false;
    console.log("changing Task : " + changingTask);
    console.log(changingTask); // ?? Почему changing Task здесь равен не истинному значению, а изначальному
    console.log(taskName);
    console.log(timeError);
    if (changingTask.taskName.length < 5) {
      taskName = true;
    }

    if (changingTask.time.end.length > 0) {
      if (changingTask.time.end < changingTask.time.start) {
        timeError = true;
      }
    }
    let rezult = { taskName: taskName, timeError: timeError };

    console.log(taskName);
    console.log(timeError);

    setMistakes(rezult);
    return Object.values(rezult).every((value) => value === false);
  }

  async function putTask(answer) {
    dispatch(putMyTask(answer))
    setDetailsActive(false);
  }



  useEffect(() => {


    if (isDetailsActive && changed === false) {
      changed = true;
      setChangingTask(myAdsArray[index]);
    }
  }, [isDetailsActive, changingTask]);


  useEffect( () => {
    alert('оффклик')
    BackButton.offClick(save);
    BackButton.offClick(save);
    BackButton.offClick(save);
    BackButton.offClick(save);
    BackButton.offClick(save);
    BackButton.offClick(save);
    BackButton.offClick(save);
    BackButton.offClick(save);
    BackButton.offClick(save);
    if (isDetailsActive) {
      alert('онклик')
      BackButton.show();
      BackButton.onClick(save);
    } else {
      changed = false;
      BackButton.hide();
    }
  } , [isDetailsActive])

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
      <Top name={"Мои задания"} setMenuActive={setMenuActive} />
      {/* <button style={{
        position : 'absolute',
        zIndex : '999'
      }} onClick={() => {
        save()
      }}>Save</button> */}

      <MyAdsBlock deals={1} finishedDeals={"70%"} />
      <PickerContent
        myAdsArray={myAdsArray}
        setTask={setTask}
        goForward={goForward}
        setDetailsActive={setDetailsActive}
        setIndex={setIndex}
      />

      <CSSTransition classNames="details" in={isDetailsActive} timeout={0}>
        <AdCreatingOne
          mistakes={mistakes}
          className="AdCreatingMy"
          taskInformation={changingTask}
          setTaskInformation={setChangingTask}
          MyInformation={true}
          isDetailsActive={isDetailsActive}
        />
      </CSSTransition>
    </div>
  );
};

export default memo(MyAdOne);
