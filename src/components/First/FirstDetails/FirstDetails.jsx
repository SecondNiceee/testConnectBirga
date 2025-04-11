import React, { forwardRef, memo, useEffect } from "react";
import TaskDetailsContainer from "./TaskDetailsContainer";
import TimeAndWatches from "./TimeAndWatches";
import { useDispatch } from "react-redux";
import { addWatch } from "../../../store/information";
import FirstLoader from "../../../loaders/FirstLoader";

const FirstDetails = forwardRef(
  (
    {
      orderInformation,
      className,
      setProfile,
      end = false,
      breakRef,
      isDetailsActive,
      setPhotoIndex,
      setPhotos,
      setSliderOpened,
      ...props
    },
    ref
  ) => {
    const disatch = useDispatch();

    useEffect(() => {
      if (!end && orderInformation) {
        disatch(addWatch(orderInformation));
      }
    }, [disatch, end, orderInformation]);

    return (
      <>
        {orderInformation ? (
          <div
            ref={ref}
            {...props}
            className={
              className ? ["TaskDetails", className].join(" ") : "TaskDetails"
            }
          >
            <TaskDetailsContainer
              setPhotoIndex={setPhotoIndex}
              setPhotos={setPhotos}
              setSliderOpened={setSliderOpened}
              setProfile={setProfile}
              end={end}
              orderInformation={orderInformation}
            />
            {end ? (
              <></>
            ) : (
              <TimeAndWatches
                responses={
                  orderInformation.responces
                    ? orderInformation.responces.length
                    : null
                }
                time={orderInformation.creationTime}
                watches={orderInformation.viewsNumber}
              />
            )}
          </div>
        ) : (
          <>
            <FirstLoader
              style={{
                position: "absolute",
                height: "100vh",
                left: "150vw",
                transform: "translateX(-50%)",
              }}
            />
          </>
        )}
      </>
    );
  }
);

export default memo(FirstDetails);
