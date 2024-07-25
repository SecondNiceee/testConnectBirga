import React, { lazy, memo, Suspense, useCallback, useEffect, useRef, useState } from 'react';

import Block from "./Block"
import MyLoader from '../../../components/UI/MyLoader/MyLoader';
import SuspenseBlock from '../../../components/MyAds/SuspenseBlock';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyOrders } from '../../../store/information';

const AdsContainer = ({myAdsArray, setSecondPage, setSliderAcitve, deleteFunction}) => {


    const [page , setPage] = useState(2)
    const orderStatus = useSelector(state => state.information.myOrderStatus)
    const elementRef = useRef(null)
    const dispatch = useDispatch()

    const getMore = useCallback(async () => {
      console.log(page);
      dispatch(fetchMyOrders(page));
      setPage(page + 1);
    }, [page, setPage, dispatch]);

    const onIntersaction = useCallback(
      (entries) => {
        const firtEntry = entries[0];

        if (firtEntry.isIntersecting && orderStatus !== "all") {
          getMore();
        }
      },
      [orderStatus, getMore]
    );


    useEffect(() => {
      const observer = new IntersectionObserver(onIntersaction);
      if (observer && elementRef.current) {
        observer.observe(elementRef.current);
      }
      return () => {
        observer.disconnect();
      };
      // eslint-disable-next-line
    }, [myAdsArray]);



    return (
        <div className="AdsContainer">
          {myAdsArray.map((e, i) => {
            return (
                <SuspenseBlock key={i} e={e} i={i} setSecondPage={setSecondPage} setSliderAcitve={setSliderAcitve} />

            );
          })}
          {orderStatus !== "all" &&  <MyLoader ref={elementRef}  style = {{ height : "90px" , marginLeft : "-16px"}} />}

        </div>
    );
};

export default memo(AdsContainer);  