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



  const orderStatus = useSelector((state) => state.information.orderStatus)





  

  // const orderStatus = useSelector((state) => state.information.orderStatus);



  console.log(orderStatus)









  const userInfo = useSelector((state) => state.telegramUserInfo);


  const tonConstant = useSelector((state) => state.ton.value);

  console.log(ordersInformation)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTasksInformation(1));
    return () => {
      dispatch(changeStatus(null));
    };
  }, [dispatch]);

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
            orderStatus = {orderStatus}
            setDetailsActive={setDetailsActive}
            ordersInformation={ordersInformation}
            setSliderActive = {setSliderActive}
          />


        </>
      ) : (
        <FirstLoader />
      )}

    </div>
  );
};

export default memo(AllTasks);
