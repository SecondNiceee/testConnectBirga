import React, { memo, useMemo } from "react";
import Pallete from "../UI/Pallete/Pallete";
import ShareIcon from "../UI/ShareIcon/ShareIcon";
import SmallDimond from "../UI/SmallDimond/SmallDimond";
import FalseTie from "../UI/FalseTie/FalseTie";
import { useDispatch, useSelector } from "react-redux";
import MyButton from "../UI/MyButton/MyButton";

var options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timezone: "UTC",
  };
let counter = 0
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
tonConstant ,
isWatched = false,


}) => {
  console.log("render" + counter)
  counter += 1

  const watchingValue = useMemo( () => {
    if (isWatched){
        return "Просмотрено"
    }
    if (!isWatched){
        return "Не просмотрено"
    }
  } , [isWatched] )

  return (
    <>
      {photos !== undefined ? (
        <div
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

          <div className="status">{watchingValue}</div>

          


          <div className="FirstMain__top" style={isMyAds ? 
            {marginTop : "13px" } :
            {}
          }>
            <Pallete />
            <p className= { isWatched ? "watchedTask" : ""}>{taskName}</p>
            <ShareIcon className="share__icon" />
          </div>
          <div className="FirstMain__middle">
            {/* <p>{executionPlace}</p> */}
            <p> {"Начать: " + time.start.toLocaleString("ru", options)}</p>
          </div>
          <div className="FirstMain__bottom">
            <div className="FirstMain__bottom-left">
              <div className="FirstMain__price-up">
                <h3>{tonValue} TON</h3>
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
            <MyButton  onClick = {func} >
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
