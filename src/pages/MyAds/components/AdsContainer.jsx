import React, { lazy, memo, Suspense, useCallback, useEffect, useRef, useState } from 'react';

import Block from "./Block"
import MyLoader from '../../../components/UI/MyLoader/MyLoader';

const AdsContainer = ({myAdsArray, setSecondPage, setSliderAcitve, deleteFunction}) => {


    // const [page , setPage] = useState(2)
    // const elementRef = useRef(null)

    // const getMore = useCallback(async () => {
    //   console.log(page);
    //   dispatch(fetchTasksInformation(page));
    //   setPage(page + 1);
    // }, [page, setPage, dispatch]);

    // const onIntersaction = useCallback(
    //   (entries) => {
    //     const firtEntry = entries[0];
    //     console.log(orderStatus);
    //     console.log(firtEntry.isIntersecting);
    //     if (firtEntry.isIntersecting && orderStatus !== "all") {
    //       console.warn(orderStatus);
    //       getMore();
    //     }
    //   },
    //   [orderStatus, getMore]
    // );
    // console.log(ordersInformation.length);


    // useEffect(() => {
    //   const observer = new IntersectionObserver(onIntersaction);
    //   console.log(observer, elementRef.current);
    //   if (observer && elementRef.current) {
    //     observer.observe(elementRef.current);
    //   }
    //   return () => {
    //     observer.disconnect();
    //   };
    //   // eslint-disable-next-line
    // }, [ordersInformation]);



    return (
        <div className="AdsContainer">
          {myAdsArray.map((e, i) => {
            return (
                <Block key={i} e={e} i={i} setSecondPage={setSecondPage} setSliderAcitve={setSliderAcitve} />

            );
          })}
          {/* <MyLoader  style = {{ height : "90px" , marginLeft : "-16px"}} /> */}
        </div>
    );
};

export default memo(AdsContainer);  