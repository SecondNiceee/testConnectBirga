import React, { memo, useCallback, useEffect } from "react";
import cl from "./ShowMyResponse.module.css";
import ResponseBlock from "../ResponseBlock";
import MyReaction from "../MyReaction";
import Customer from "../Customer/Customer";
import formatDate from "../../../functions/makeDate";
import { useDispatch } from "react-redux";
import MyLoader from "../../UI/MyLoader/MyLoader";
import MainButton from "../../../constants/MainButton";
import axios from "axios";
import { changeMenuActive } from "../../../store/menuSlice";
const menu = document.documentElement.querySelector(".FirstMenu")
const ShowMyResponse = ({
  response = { advertisement: { user: {} } , id : 0 , user : {'fuck' : 'fuck'} },
  openDetails,
  index,
  deleteFunction,
  setLastAds,
  openAboutReaction,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    function click(){
      window.Telegram.WebApp.showPopup(
        {
          title: "Выбрать?",
          message: "Вы выполнили это задание?",
          buttons: [
            { id: "save", type: "default", text: "Да" },
            { id: "delete", type: "destructive", text: "Нет" },
          ],
        },
        (buttonId) => {
          if (buttonId === "save") {
            clickHandler()
          } 
          if (buttonId === "delete" || buttonId === null){
            console.log("Он отказался")
          }
          
        }
      );
    }
    async function clickHandler() {
      try {
        
        await axios.get("https://back-birga.ywa.su/bot/notification", {
          params: {
            executorId: String(response.user.id),
            consumerId: String(response.advertisement.user.id),
            responseId: String(response.id),
            chatId: String(response.advertisement.user.id),
            advertisementId: String(response.advertisement.id),
          },
        });
        alert("chatId :  " + response.advertisement.user.id)
        
        
        window.Telegram.WebApp.showAlert("Мы выслали подтверждение заказчику.\nПожалуйста, не нажимайте эту кнопку много раз.\nПодтверждение точно было выслано. ")
      } catch (e) {
        window.Telegram.WebApp.showAlert("Извините, подверждение не удалось отправить заказчику. Обратитесь в поддержку.");
        window.Telegram.WebApp.showAlert(JSON.stringify(e))
        console.log(e);
      }
    }
    
    if (response.isWatched === "inProcess") {
      menu.style.paddingBottom = "3px"
      menu.style.display = "none"
      menu.style.transform = "translateY(-100%)"
      menu.style.paddingBottom = "3px"
      setTimeout( () => {
        menu.style.transform = "translateY(0%)"
        menu.style.display = "flex"
      } , 200 )
      MainButton.show();
      MainButton.setText("ВЫПОЛНИЛ");
      MainButton.onClick(click);
    }
    return () => {
      MainButton.hide();
      menu.style.paddingBottom = "27px"
      MainButton.offClick(click);
    };
  }, [
    response.advertisement.id,
    response.advertisement.user.id,
    response.advertisement.user.chatId,
    response.id,
    response.isWatched,
    response.user.id,
  ]);

  const setMenuActive = useCallback(
    (arg) => {
      dispatch(changeMenuActive(arg));
    },
    [dispatch]
  );


  const onImageClick = useCallback( () => {
    openAboutReaction({
      isActive : true , 
      responce : {user : response.advertisement.user, createNumber : response.advertisement.createNumber}
    })
  } , [openAboutReaction, response.advertisement.user, response.advertisement.createNumber] )

  return (
    <>
      {response.user.fuck ? (
        <div className={cl.wrapper}>

            <MyLoader style={{ width: "100vw", height: "100%" }} />
        </div>
      ) : (
        <div className={cl.wrapper}>
          <ResponseBlock
            isWatched={response.isWatched}
            index={index}
            func={openDetails}
            className={cl.response}
            buttonText={"Подробнее"}
            {...response.advertisement}
            task={response.advertisement}
          />
          <MyReaction
            openAboutReactionFunc={openAboutReaction}
            setLastAds={setLastAds}
            deleteFunction={deleteFunction}
            responce={response}
          />
          <Customer
            onImageClick={onImageClick}
            fl={response.advertisement.user.fl}
            photo={response.advertisement.user.photo}
            link={response.advertisement.user.link}
          />
          <p className={cl.dateObject}>
            Создано {formatDate(new Date(response.advertisement.creationTime))}
          </p>
        </div>
      )}
    </>
  );
};

export default memo(ShowMyResponse);
