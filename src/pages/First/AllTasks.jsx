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
  setSliderActive,
  ordersInformation,
  filterBy,
  setFilterBy
}) => {
  // count += 1
  // console.warn('РЕНДЕР' + count )

  const [page , setPage] = useState(2)
  const elementRef = useRef(null)

  const orderStatus = useSelector((state) => state.information.orderStatus)





  const dispatch = useDispatch();

  

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
      console.log(firtEntry.isIntersecting)
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
        observer.disconnect()
      }
      // eslint-disable-next-line
  } , [ordersInformation ] )

  useEffect( () => {
    dispatch(fetchTasksInformation(1))
      return () => {
        dispatch(changeStatus(null))
  }
  } , [dispatch] )

  console.log(orderStatus)









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

      { (orderStatus === 'complete' || orderStatus === 'all') && tonConstant !== 0 ? (
        <>
          <FirstMain
            // style={isMenuActive ? { background: "rgba(0,0,0,0.5)" } : {}}
            setDetailsActive={setDetailsActive}
            ordersInformation={ordersInformation}
            setSliderActive = {setSliderActive}
          />


        </>
      ) : (
        <FirstLoader />
      )}
      {orderStatus === null ? <></> :
            <div  ref={elementRef} className="block" style={
              {
                position : "relative",
                bottom : "50px",
                width : "30px",
                height : "30px"
              }
            }></div>
      }

    </div>
  );
};

export default memo(AllTasks);
