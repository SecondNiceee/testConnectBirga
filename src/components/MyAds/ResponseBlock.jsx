import React, { memo, useMemo } from "react";
import Pallete from "../UI/Pallete/Pallete";
import ShareIcon from "../UI/ShareIcon/ShareIcon";
import SmallDimond from "../UI/SmallDimond/SmallDimond";
import FalseTie from "../UI/FalseTie/FalseTie";
import {  useSelector } from "react-redux";
import MyButton from "../UI/MyButton/MyButton";
import formatDate from "../../functions/makeDate";

const ResponseBlock = ({
  className,
  taskName,
  time,
  tonValue,
  photos,
  isMyAds,
  setSlideActive,
  func,
  buttonText,
  task,
  id,
index ,
isWatched,
category,
...props


}) => {

  const tonConstant = useSelector(state => state.ton.value)

  const watchingValue = useMemo( () => {
    if (isWatched === ""){
        return "Не просмотрено"
    }
    if (isWatched === "watched"){
        return "Просмотрено"
    }
    if (isWatched === "inProcess"){
      return "В работе"
    }
    if (isWatched === "completed"){
      return "Завершено"
    }
  } , [isWatched] )

  const style = useMemo( () => {
      switch (isWatched){
        case "":
          return {color : "#95979E"}
        case "watched":
          return {color : "#2ea5ff"}
        case "chosen":
          return {color : "#30d158"}
        case "completed":
          return {color : "#2ACF58"}
        default : 
          
      }
  } , [isWatched] )


  return (
    <>
      {photos !== undefined ? (
        <div
        {...props}
          className={
            className ? ["First__block", className].join(" ") : "First__block"
          }
        >
          {photos.length ? (
            <div className="first__photos">
              {photos.map((e, i) => {
                return (
                  <img
                    onClick={() => {
                      setSlideActive({
                        isActive : true,
                        index : i,
                        photos : photos
                      })
                    }}
                    key={i}
                    src={URL.createObjectURL(e)}
                    style={
                      photos.length === 1
                        ? {
                            width: "calc(100% - 3.67px)",
                          }
                        : {}
                    }
                    className="first__photo"
                    alt=""
                  />
                );
                // return <img className='first__photo' src = {'https://back-birga.ywa.su/' + e} />
              })}
            </div>
          ) : (
            ""
          )}

          <div style={style} className="status">{watchingValue}</div>

          


          <div className="FirstMain__top" style={isMyAds ? 
            {marginTop : "13px" } :
            {}
          }>
            <Pallete category={category} />
            <p >{taskName}</p>
            <ShareIcon onClick = {() => {
                              window.Telegram.WebApp.openTelegramLink(
                                "https://t.me/share/url?text=&url=https://t.me/ConnectexBot/task?startapp=" + String(id)
                              );
            }} className="share__icon" />
          </div>
          <div className="FirstMain__middle">
            {/* <p>{executionPlace}</p> */}
            <p> {"Дедлайн: " + formatDate(time.end)}</p>
          </div>
          <div className="FirstMain__bottom">
            <div className="FirstMain__bottom-left">
              <div className="FirstMain__price-up">
                <h3>{tonValue} USDT</h3>
                <SmallDimond />
              </div>
              <p>
                ~{" "}
                {Number((tonValue * tonConstant).toFixed(0)).toLocaleString(
                  "ru-RU"
                )}{" "}
                RUB
              </p>
            </div>
            <div className="FirstMain__bottom-right">

            <FalseTie task={task} id={id} navigate={'advertisement'}  />
            <MyButton  onClick = {() => {
              func(index)
            }} >
                {buttonText}
            </MyButton>



            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}


    </>
  );
};

export default memo(ResponseBlock);
