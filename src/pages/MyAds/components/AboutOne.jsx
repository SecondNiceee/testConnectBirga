import React, { useCallback, useEffect, useMemo, useState } from "react";

import FirstBlock from "../../../components/First/FirstMain/FirstBlock";
import { memo } from "react";
import Top from "../../../components/UI/Top/Top";
import ReactionBlock from "./ReactionBlock";
import axios from "axios";
import MyLoader from "../../../components/UI/MyLoader/MyLoader";
import { deleteAd } from "../../../store/information";
import { useDispatch } from "react-redux";
import makeNewFile from "../../../functions/newMakeFile";

const AboutOne = ({
  task,
  setMenuActive,
  setOpen,
  setSecondPage,
  setDetails,
  setSliderAcitve,
  openAboutReactionFunc,
}) => {
  const [responces, setResponces] = useState(null);
  console.log("aboutOne");
  const dispatch = useDispatch();
  useEffect(() => {
    async function getIt(id) {
      let im = await axios.get(
        "https://back-birga.ywa.su/response/findByAdvertisement",
        {
          params: {
            advertisementId: id,
          },
        }
      );
      let responces = im.data;
      for (let i = 0; i < responces.length; i++) {
        let photos = [];

        if (responces[i].photos) {
          photos = await makeNewFile(responces[i].folder, responces[i].photos);
        }

        responces[i].photos = photos;

        try {
          let imTwo = await axios.get(
            "https://back-birga.ywa.su/advertisement/findCount",
            {
              params: {
                userId: responces[i].user.id,
              },
            }
          );
          responces[i].createNumber = imTwo.data;
        } catch (e) {
          alert(e);
        }
      }

      return responces;
    }

    getIt(task.id).then((resp) => {
      setResponces(resp);
    });
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
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      }
      if (filterBy === "stage") {
        return responces.sort(
          (a, b) => Number(b.user.stage) - Number(a.user.stage)
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
    <div className="aboutOne" style={{}}>
      <Top name={"Отклики"} setMenuActive={setMenuActive} />

      {task ? (
        <FirstBlock
          setSlideActive={setSliderAcitve}
          deleteFunction={deleteCallback}
          setDetailsActive={setDetailsCallback}
          isResponce={true}
          isButton={true}
          className={"FirstAdsBlock"}
          {...task}
        />
      ) : (
        <></>
      )}

      {responces === null ? (
        <MyLoader
          style={{
            height: "calc(100vh - 456px)",
            position: "fixed",
            left: 0,
          }}
        />
      ) : (
        <ReactionBlock
          setFilterBy={setFilterBy}
          openAboutReactionFunc={openAboutReactionFunc}
          setSliderActive={setSliderAcitve}
          responces={filteredArray}
          setOpen={setOpen}
        />
      )}
    </div>
  );
};

export default memo(AboutOne);
