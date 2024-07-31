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
import { fetchResponseByAdvertisement, fetchResponses } from "../../../store/responses";

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

    dispatch(fetchResponseByAdvertisement([task.id, task , 1]))
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

  const [filterBy, setFilterBy] = useState("all");

  const filteredArray = useMemo(() => {
    console.log(filterBy);
    if (responces !== null) {
      console.log(responces)
      if (filterBy === "all"){
        return responces
      }
      if (filterBy === "withCompletedTasks"){
        return [...responces.filter(e => e.user.completedTasks > 0)]
      }
      if (filterBy === "withInformation"){
        return [...responces.filter(e => e.user.about.length > 10)]
      }
    }
    else{
      return [];
    }
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


  const getMore = useCallback( (page, setPage) => {
    dispatch(fetchResponseByAdvertisement([task.id , task , page]));
    setPage(page + 1);
  } , [dispatch, task, task.id] )


 

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
          getMore = {getMore}
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
