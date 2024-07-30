import React, { useCallback, useEffect, useMemo, useState } from "react";

import FirstBlock from "../../../components/First/FirstMain/FirstBlock";
import { memo } from "react";
import Top from "../../../components/UI/Top/Top";
import axios from "axios";
import { deleteAd } from "../../../store/information";
import { useDispatch, useSelector } from "react-redux";
import makeNewFile from "../../../functions/newMakeFile";
import AllReactions from "./AllReactions";
import Block from "../../../components/First/Block";
import { fetchResponseByAdvertisement } from "../../../store/responses";

const AboutOne = ({
  task,
  setMenuActive,
  setOpen,
  setSecondPage,
  setDetails,
  setSliderAcitve,
  openAboutReactionFunc,
}) => {
  const responces = useSelector( state => state.responses.responsesByA )
  console.log("aboutOne");
  const dispatch = useDispatch();
  useEffect(() => {

    dispatch(fetchResponseByAdvertisement([task.id, task]))
    // eslint-disable-next-line
  }, []);

  const deleteFunction = useCallback(
    (e) => {
      window.Telegram.WebApp.showPopup(
        {
          title: "Удалить?",
          message: "Вы хотите удалить это задание?",
          buttons: [
            { id: "save", type: "default", text: "Да" },
            { id: "delete", type: "destructive", text: "Нет" },
          ],
        },
        (buttonId) => {
          if (buttonId === "delete" || buttonId === null) {
          }
          if (buttonId === "save") {
            dispatch(deleteAd(e.id));
            setSecondPage((value) => ({ ...value, isActive: false }));
          }
        }
      );
    },
    [dispatch, setSecondPage]
  );

  const [filterBy, setFilterBy] = useState("activity");

  const filteredArray = useMemo(() => {
    console.log(filterBy);
    if (responces !== null) {
      if (filterBy === "activity") {
        return responces.sort(
          (a, b) => {
            if (a.isWatched === "completed") return -1
            if (b.isWatched === "completed") return 1
            return new Date(b.createdAt) - new Date(a.createdAt)}
        );
      }
      if (filterBy === "stage") {
        return responces.sort(
          (a, b) => {
            if (a.isWatched === "completed") return -1
            if (b.isWatched === "completed") return 1
            return Number(b.user.stage) - Number(a.user.stage)}
        );
      }
    }
    return null;
  }, [responces, filterBy]);

  const deleteCallback = useCallback(() => {
    deleteFunction(task);
    // eslint-disable-next-line
  }, []);

  const setDetailsCallback = useCallback(() => {
    console.log(task);
    setDetails({
      isActive: true,
      task: task,
    });
    // eslint-disable-next-line
  }, []);

 

  return (
    <>


    <div className="aboutOne" style={{}}>
      <Top name={"Отклики"} setMenuActive={setMenuActive} />

      {task ? (
        <Block
          setSlideActive={setSliderAcitve}
          deleteFunction={deleteCallback}
          setDetailsActive={setDetailsCallback}
          isResponce={task.status !== "inProcess" }
          isButton={task.status !== "inProcess" }
          className={"FirstAdsBlock"}
        
          {...task}
        />
      ) : (
        <></>
      )}


        <AllReactions
          filteredArray={filteredArray}
          setFilterBy={setFilterBy}
          openAboutReactionFunc={openAboutReactionFunc}
          setSliderAcitve={setSliderAcitve}
          setOpen={setOpen}
        />
      

    </div>
    
    </>
  );
};

export default memo(AboutOne);
