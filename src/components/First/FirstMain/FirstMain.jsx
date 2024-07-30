import React, { forwardRef, memo, useCallback, useEffect, useRef, useState } from "react";
import FirstBlock from "./FirstBlock";
import { useDispatch, useSelector } from "react-redux";
import MyLoader from "../../UI/MyLoader/MyLoader";
import { changeStatus, fetchTasksInformation } from "../../../store/information";

const FirstMain = forwardRef(
  (
    {
      ordersInformation,
      setDetailsActive,
      setSliderActive,
      orderStatus,
      ...props
    },
    ref
  ) => {

    const dispatch = useDispatch()
    const watchedArr = useSelector((state) => state.watchedAds.watchedAds);


    const [page , setPage] = useState(2)
    const elementRef = useRef(null)

    const getMore = useCallback(async () => {
      console.log(page);
      dispatch(fetchTasksInformation(page));
      setPage(page + 1);
    }, [page, setPage, dispatch]);

    const onIntersaction = useCallback(
      (entries) => {
        console.warn("вызов меня");
        const firtEntry = entries[0];
        console.log(orderStatus);
        console.log(firtEntry.isIntersecting);
        if (firtEntry.isIntersecting && orderStatus !== "all") {
          console.warn(orderStatus);
          getMore();
        }
      },
      [orderStatus, getMore]
    );
    console.log(ordersInformation.length);
    useEffect(() => {
      const observer = new IntersectionObserver(onIntersaction);
      console.log(observer, elementRef.current);
      if (observer && elementRef.current) {
        observer.observe(elementRef.current);
        console.log("я тут");
      }
      return () => {
        observer.disconnect();
      };
      // eslint-disable-next-line
    }, [ordersInformation]);



    return (
      <div {...props} className="FirstMain">
        {ordersInformation.length === 0 ? (
          <h1 className="EmptyText"> Нет таких предложений </h1>
        ) : (
          ordersInformation.map((e, i) => {
            return (
              <FirstBlock
                setSlideActive={setSliderActive}
                index={i}
                isWatched={watchedArr.includes(e.id) ? true : false}
                key={i}
                setDetailsActive={setDetailsActive}
                task={e}
                {...e}
                isButton={true}
              />
            );
          })
        )}



          
          

    
        

        

        {orderStatus !== "all" && (
          <MyLoader
            ref={elementRef}
            className="block"
            style={{
              bottom: "50px",
              transform: "translateX(-16px)",
              width: "100vw",
              height: "300px",
            }}
          />
        )}
      </div>
    );
  }
);

export default memo(FirstMain);
