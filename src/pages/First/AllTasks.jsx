import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import FirstMain from "../../components/First/FirstMain/FirstMain";
import FirstTop from "../../components/First/FirstMain/FirstTop";
import FirstLoader from "../../loaders/FirstLoader";
import { useFilteredArr } from "../../hooks/useFilteredArr";
import { useDispatch, useSelector } from "react-redux";
import { changeStatus, fetchTasksInformation } from "../../store/information";
// let count = 0
const AllTasks = ({
  setDetailsActive,
  setMenuActive,
  setSliderActive
}) => {
  // count += 1
  // console.warn('РЕНДЕР' + count )

  const [page , setPage] = useState(1)
  const [hasMore , setHasMore] = useState(true)
  const elementRef = useRef(null)

  const orderStatus = useSelector((state) => state.information.orderStatus)





  const dispatch = useDispatch();

  


  const ordersInformation = useSelector(
    (state) => state.information.orderInformations
  );
  // const orderStatus = useSelector((state) => state.information.orderStatus);

  const  getMore = useCallback( async () => {
      console.log(page)
      dispatch(fetchTasksInformation(page))
      setPage(page + 1)
  }, [page, setPage , dispatch] )

  const onIntersaction = useCallback( (entries) => {
      console.warn('вызов меня')
      const firtEntry = entries[0]
      console.log(orderStatus)
      if (firtEntry.isIntersecting && orderStatus !== 'all'){
        console.warn(orderStatus)
        getMore()
      } 
  }, [orderStatus, getMore] )
  console.log(ordersInformation.length)
  useEffect( () => {    
      const observer = new IntersectionObserver(onIntersaction)
      console.log(observer, elementRef.current)
      if (observer && elementRef.current ){
        observer.observe(elementRef.current)
        console.log('я тут')
    
      }
      return () => {
        // dispatch(changeStatus(null))
        observer.disconnect()
      }
  } , [ordersInformation] )

  useEffect( () => {
      return () => {
        dispatch(changeStatus(null))
  }
  } , [] )

  console.log(orderStatus)




  const [filterBy, setFilterBy] = useState("");

  const filteredArr = useFilteredArr(ordersInformation, filterBy);
  const userInfo = useSelector((state) => state.telegramUserInfo);


  const tonConstant = useSelector((state) => state.ton.value);

  console.log(ordersInformation)

  return (
    <div className="AllTasks">
      <FirstTop
        filteredBy={filterBy}
        setMenuActive={setMenuActive}
        setFilterBy={setFilterBy}
        userInfo={userInfo}
      />

      {orderStatus === 'complete' || orderStatus === 'all' && tonConstant !== 0 ? (
        <>
          <FirstMain
            // style={isMenuActive ? { background: "rgba(0,0,0,0.5)" } : {}}
            setDetailsActive={setDetailsActive}
            ordersInformation={filteredArr}
            setSliderActive = {setSliderActive}
          />


        </>
      ) : (
        <FirstLoader />
      )}
      
      <div ref={elementRef} className="block" style={
        {
          bottom : "30px",
          width : "30px",
          height : "30px"
        }
      }></div>
    </div>
  );
};

export default memo(AllTasks);
