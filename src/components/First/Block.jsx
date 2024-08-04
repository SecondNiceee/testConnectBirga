import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyButton from "../UI/MyButton/MyButton";
import Pallete from "../UI/Pallete/Pallete";
import ShareIcon from "../UI/ShareIcon/ShareIcon";
import SmallDimond from "../UI/SmallDimond/SmallDimond";
import FalseTie from "../UI/FalseTie/FalseTie";
import { addWatch } from "../../store/watchedAds";
import formatDate from "../../functions/makeDate";

const Block = ({
    className,
    taskName,
    time,
    end = false,
  
    setDetailsActive,
    isButton,
    photos,
    isMyAds,
    deleteFunction,
    myAdsFunc,
    isResponce,
    isWatched,
    index,
    id,
    setSlideActive,
     tonValue,
     task,
     agree = false,
     responseCounter,
     viewsNumber
}) => {

    const dispatch = useDispatch()
    const tonConstant = useSelector(state => state.ton.value)
  
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
                              marginLeft : "auto",
                              marginRight : "auto"
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
  
            {isMyAds || isResponce ? (
              <div className="myAds__top">
                <p className="myAds__top-left">Активно</p>
                <div className="myAds__top-right">
                  <div className="one">
                    <p>{viewsNumber}</p>
                    <svg
                      width="16"
                      height="13"
                      viewBox="0 0 16 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.27394 12.5776C6.31542 12.5776 7.87991 10.1864 7.87991 6.66308C7.87991 3.13343 6.31542 0.754883 4.27394 0.754883C2.23246 0.754883 0.667969 3.13343 0.667969 6.66308C0.667969 10.1864 2.23246 12.5776 4.27394 12.5776ZM12.3953 12.5776C14.4368 12.5776 16.0013 10.1864 16.0013 6.66308C16.0013 3.13343 14.4368 0.754883 12.3953 0.754883C10.3602 0.754883 8.78936 3.13343 8.78936 6.66308C8.78936 10.1864 10.3602 12.5776 12.3953 12.5776ZM2.99563 8.85083C4.06407 8.85083 4.77636 8.1131 4.77636 6.99379C4.77636 5.88719 4.06407 5.13674 2.99563 5.13674C2.55681 5.13674 2.18159 5.26394 1.88904 5.48653C2.14343 3.3115 3.12283 1.89328 4.27394 1.88692C5.63493 1.88056 6.74152 3.81392 6.74152 6.66308C6.74152 9.49317 5.63493 11.4392 4.27394 11.4456C3.25638 11.452 2.37874 10.3517 2.00987 8.59008C2.28334 8.7618 2.61405 8.85083 2.99563 8.85083ZM11.117 8.85083C12.1791 8.85083 12.8977 8.1131 12.8977 6.99379C12.8977 5.88719 12.1791 5.13674 11.117 5.13674C10.6718 5.13674 10.2966 5.26394 9.99771 5.48653C10.2585 3.3115 11.2379 1.89328 12.3953 1.89328C13.75 1.89328 14.8566 3.82664 14.8566 6.66308C14.8566 9.49953 13.75 11.4392 12.3953 11.4392C11.3778 11.4392 10.4938 10.3454 10.1249 8.59008C10.3984 8.7618 10.7354 8.85083 11.117 8.85083ZM2.49321 6.7712C2.27062 6.73304 2.12435 6.46593 2.17523 6.1861C2.23246 5.90627 2.45506 5.70912 2.67129 5.74728C2.90024 5.7918 3.03379 6.05891 2.97655 6.33238C2.92568 6.6122 2.71581 6.80936 2.49321 6.7712ZM10.6146 6.7712C10.3857 6.72668 10.2457 6.46593 10.2966 6.1861C10.3539 5.90627 10.5637 5.70912 10.7863 5.74728C11.0216 5.78544 11.1552 6.05891 11.0979 6.33238C11.0407 6.6122 10.8372 6.80936 10.6146 6.7712Z"
                        fill="#B5CED9"
                      />
                    </svg>
                  </div>
                  <div className="two">
                    <p>{responseCounter}</p>
                    <svg
                      width="10"
                      height="12"
                      viewBox="0 0 10 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.985006 9.80004C0.607778 9.80004 0.333984 10.0799 0.333984 10.4632C0.333984 10.8465 0.607778 11.1264 0.985006 11.1264H9.00413C9.38744 11.1264 9.66732 10.8465 9.66732 10.4632C9.66732 10.0799 9.38744 9.80004 9.00413 9.80004H5.14059C5.28053 9.76962 5.40222 9.6966 5.50565 9.59317L9.38135 5.76005C9.52738 5.61403 9.60039 5.44367 9.60039 5.26722C9.60039 4.88391 9.32051 4.60403 8.94937 4.60403C8.75467 4.60403 8.58431 4.68313 8.46262 4.80482L7.21534 6.03385L5.61517 7.78613L5.67601 6.50842V0.892605C5.67601 0.478872 5.40222 0.205078 5.00065 0.205078C4.59909 0.205078 4.31921 0.478872 4.31921 0.892605V6.50842L4.38614 7.79221L2.78596 6.03385L1.54476 4.80482C1.41699 4.68313 1.24663 4.60403 1.05802 4.60403C0.68079 4.60403 0.406996 4.88391 0.406996 5.26722C0.406996 5.44367 0.480008 5.61403 0.626031 5.76005L4.49565 9.59317C4.59909 9.6966 4.72077 9.76962 4.85463 9.80004H0.985006Z"
                        fill="#B5CED9"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}
  
            <div className="FirstMain__top" style={isMyAds ? 
              {marginTop : "13px" } :
              {}
            }>
              <Pallete />
              <p className= { isWatched ? "watchedTask" : ""}>{taskName}</p>
              <ShareIcon onClick = {() => {
                
                window.Telegram.WebApp.openTelegramLink(
                  "https://t.me/share/url?text=&url=https://t.me/testbirgawebappbot/firstPage?startapp=" + String(id)
                );
              }}  style = {end ? {opacity : 0.5} : {}} className="share__icon" />
            </div>
            <div className="FirstMain__middle">
              {/* <p>{executionPlace}</p> */}
              <p> {"Начать: " + formatDate(time.start)}</p>
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
                {isMyAds ? (
                  <>
  
                  <MyButton
                  style={isButton ? {} : { display: "none" }}
                  onClick={(e) => myAdsFunc(true)}
                >
                  Подробнее
                </MyButton>
  
                  </>
  
                  
                ) : (
                  <>
                  </>
                )}
  
  {!isResponce && !isMyAds ? <FalseTie end = {end}   agree = {agree}  navigate={"advertisement"} id={id} task={task}
  
   className={end ? "tie low-opacity" : "tie"}  style = {isButton ? {} : {marginRight : '4px'}} /> :
                <></>
                  }
  
                {!isMyAds && !isResponce ? 
                                <MyButton
                                style={isButton ? {} : { display: "none" }}
                                onClick={(e) => {setDetailsActive({isOpen : true, id : index})
                                dispatch(addWatch(id))
                }
                              }
                              >
                                Подробнее
                              </MyButton>
                              :
                              <></>
                }
  
                {isResponce ? 
                <>
                                <svg
                    id = "myTrash"
                    onClick={deleteFunction}
                    className="my-trash"
                    width="16"
                    height="19"
                    viewBox="0 0 16 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.47464 18.4487H11.6001C12.7941 18.4487 13.5617 17.7276 13.6237 16.5336L14.1432 5.36859H14.9961C15.3915 5.36859 15.6939 5.05845 15.6939 4.67077C15.6939 4.2831 15.3838 3.98847 14.9961 3.98847H11.5536V2.82544C11.5536 1.63141 10.7937 0.933594 9.49889 0.933594H6.55257C5.25774 0.933594 4.4979 1.63141 4.4979 2.82544V3.98847H1.07086C0.683186 3.98847 0.373047 4.29085 0.373047 4.67077C0.373047 5.0662 0.683186 5.36859 1.07086 5.36859H1.92374L2.44323 16.5336C2.50525 17.7354 3.2651 18.4487 4.47464 18.4487ZM5.9478 2.89522C5.9478 2.4998 6.22692 2.24393 6.65337 2.24393H9.3981C9.82454 2.24393 10.1037 2.4998 10.1037 2.89522V3.98847H5.9478V2.89522ZM4.62971 17.0608C4.20327 17.0608 3.89313 16.7429 3.86987 16.2855L3.35038 5.36859H12.6933L12.1894 16.2855C12.1738 16.7507 11.8715 17.0608 11.4295 17.0608H4.62971ZM5.74621 15.8125C6.07961 15.8125 6.28895 15.6032 6.2812 15.293L6.04859 7.1829C6.04084 6.87276 5.82374 6.67117 5.50585 6.67117C5.1802 6.67117 4.97086 6.88051 4.97861 7.19065L5.21122 15.3008C5.21897 15.6109 5.43607 15.8125 5.74621 15.8125ZM8.03349 15.8125C8.35913 15.8125 8.58398 15.6109 8.58398 15.3008V7.19065C8.58398 6.88051 8.35913 6.67117 8.03349 6.67117C7.70784 6.67117 7.49074 6.88051 7.49074 7.19065V15.3008C7.49074 15.6109 7.70784 15.8125 8.03349 15.8125ZM10.3208 15.8203C10.6309 15.8203 10.848 15.6109 10.8558 15.3008L11.0884 7.19065C11.0961 6.88051 10.8868 6.67892 10.5611 6.67892C10.2432 6.67892 10.0261 6.88051 10.0184 7.19065L9.78577 15.3008C9.77802 15.6032 9.98736 15.8203 10.3208 15.8203Z"
                      fill="#F83D3D"
                    />
                  </svg>
                               <MyButton
                               style={isButton ? {} : { display: "none" }}
                               onClick={(e) => 
                                setDetailsActive(true)}
                             >
                               Изменить
                             </MyButton> 
                </>
                             :
                             <>
                             </>
                }
                
  
  
  
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
  
        {/* <div style={{minHeight : "144px" , minWidth : "343px"}} className="First__block" ></div> */}
      </>
    );
};

export default memo(Block);